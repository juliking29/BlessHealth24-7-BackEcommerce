import CarritoServiceInterface from "../../Domain/interfaces/CarritoServiceInterface";
import { ICarritoRepository } from "../../Domain/Port/Driven/ICarritoRepository";
import { IItemCarritoResumen } from "../../Domain/iItemCarrito/Interfaces/ItemCarritoInterfaces";
import { ICarritoCompleto, ITotalesCarrito } from "../../Domain/Carrito/interfaces/carritointerfaces";
import { IProductoRepository } from "../../../ModuloProductos/Domain/Port/Driven/IProductoRepository";

/**
 * CarritoService implements the CarritoServiceInterface,
 * providing methods for managing shopping cart operations.
 */
export class CarritoService implements CarritoServiceInterface {
  
  constructor(
    private readonly productoRepository: IProductoRepository,
    private readonly carritoRepository: ICarritoRepository
  ) {}

  /**
   * Validates basic parameters for user and product IDs, and quantity.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product.
   * @param {number} [cantidad] - The quantity of the product (optional).
   * @throws Will throw an error if any parameter is invalid.
   */
  private validarParametrosBasicos(usuarioId: number, productoId: number, cantidad?: number): void {
    if (!usuarioId || usuarioId <= 0) throw new Error("El ID del usuario no es válido.");
    if (!productoId || productoId <= 0) throw new Error("El ID del producto no es válido.");
    if (cantidad !== undefined && (!cantidad || cantidad <= 0)) throw new Error("La cantidad debe ser mayor a 0.");
  }

  /**
   * Adds a product to the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to add.
   * @param {number} cantidad - The quantity of the product to add.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async agregarProductoAlCarrito(usuarioId: number, productoId: number, cantidad: number): Promise<void> {
    this.validarParametrosBasicos(usuarioId, productoId, cantidad);

    const producto = await this.productoRepository.findById(productoId);
    if (!producto) throw new Error("El producto no existe.");
    if (producto.stockProducto <= 0) throw new Error("El producto no está disponible.");
    if (producto.stockProducto < cantidad) throw new Error("No hay suficiente stock disponible.");

    await this.carritoRepository.addItem(usuarioId, productoId, cantidad);
  }

  /**
   * Retrieves a summary of the user's shopping cart by user ID.
   * 
   * @param {number} idUsuario - The ID of the user.
   * @returns {Promise<IItemCarritoResumen[]>} - A promise that resolves to an array of cart item summaries.
   */
  async verMiCarritoId(idUsuario: number): Promise<IItemCarritoResumen[]> {
    return await this.carritoRepository.VerMiCarritoResumen(idUsuario);
  }

  /**
   * Retrieves the complete shopping cart for the user by user ID.
   * 
   * @param {number} idUsuario - The ID of the user.
   * @returns {Promise<ICarritoCompleto>} - A promise that resolves to the complete cart object.
   */
  async verMiCarritoCompleto(idUsuario: number): Promise<ICarritoCompleto> {
    return await this.carritoRepository.verMiCarritoCompleto(idUsuario);
  }

  /**
   * Calculates the totals for the user's shopping cart.
   * 
   * @param {number} idUsuario - The ID of the user.
   * @returns {Promise<ITotalesCarrito>} - A promise that resolves to the totals object for the cart.
   */
  async calcularTotalesCarrito(idUsuario: number): Promise<ITotalesCarrito> {
    return await this.carritoRepository.calcularTotalesCarrito(idUsuario);
  }

  /**
   * Calculates the totals for the complete shopping cart.
   * 
   * @param {number} idUsuario - The ID of the user.
   * @returns {Promise<ITotalesCarrito>} - A promise that resolves to the totals object for the complete cart.
   */
  async calcularTotalesCarritoCompleto(idUsuario: number): Promise<ITotalesCarrito> {
    return await this.carritoRepository.calcularTotalesCarritoCompleto(idUsuario);
  }

  /**
   * Removes a product from the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to remove.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async eliminarProductoDelCarrito(usuarioId: number, productoId: number): Promise<void> {
    this.validarParametrosBasicos(usuarioId, productoId);
    await this.carritoRepository.removeItem(usuarioId, productoId);
  }

  /**
   * Increases the quantity of a product in the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to increase.
   * @returns {Promise<number>} - A promise that resolves to the new quantity of the product.
   */
  async aumentarCantidadProducto(usuarioId: number, productoId: number): Promise<number> {
    this.validarParametrosBasicos(usuarioId, productoId);

    const producto = await this.productoRepository.findById(productoId);
    if (!producto) throw new Error("El producto no existe.");

    const carrito = await this.carritoRepository.findByUsuarioId(usuarioId);
    const item = carrito.getItems().find(item => {
        try {
            return item.getProductoId() === productoId;
        } catch (error) {
            console.error("Error al obtener ID del producto para item:", error);
            return false;
        }
    });
    console.log(item)
   
    
    return await this.carritoRepository.increaseItemQuantity(usuarioId, productoId);
  }

  /**
   * Decreases the quantity of a product in the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to decrease.
   * @returns {Promise<number>} - A promise that resolves to the new quantity of the product.
   */
  async disminuirCantidadProducto(usuarioId: number, productoId: number): Promise<number> {
    try {
        this.validarParametrosBasicos(usuarioId, productoId);
        
        const carrito = await this.carritoRepository.findByUsuarioId(usuarioId);
        const item = carrito.getItems().find(item => {
            const itemProductoId = item.getProductoId ? item.getProductoId() : 
                                (item.getProducto() && typeof item.getProducto().getId === 'function' ? 
                                item.getProducto().getId() : undefined);
            return itemProductoId === productoId;
        });
        
           console.log(item)
            return await this.carritoRepository.decreaseItemQuantity(usuarioId, productoId);
        
    } catch (error) {
        console.error("Error al disminuir cantidad:", error);
        return 0;
    }
  }
}