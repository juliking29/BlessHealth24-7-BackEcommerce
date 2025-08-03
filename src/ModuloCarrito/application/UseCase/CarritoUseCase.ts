import { ICarritoCompleto, ITotalesCarrito } from "../../Domain/Carrito/interfaces/carritointerfaces";
import { IItemCarritoResumen } from "../../Domain/iItemCarrito/Interfaces/ItemCarritoInterfaces";
import CarritoServiceInterface from "../../Domain/interfaces/CarritoServiceInterface";
import CarritoUseCasePort from "../../Domain/Port/Driver/CarritoUseCasePort";
import NullCarrito from "../../Domain/Carrito/NullCarrito";
import NullItemCarrito from "../../Domain/iItemCarrito/NullItemCarrito";
import { 
  CarritoNoEncontradoError, 
  ItemCarritoNoEncontradoError, 
  OperacionCarritoError, 
  ProductoNoEncontradoError, 
  StockInsuficienteError 
} from "../../Domain/error/CarritoError";

/**
 * CarritoUseCase implements the CarritoUseCasePort,
 * providing methods for managing shopping cart operations.
 */
export class CarritoUseCase implements CarritoUseCasePort {
  
  constructor(
    private readonly carritoService: CarritoServiceInterface
  ) {}

  // 🛍 View cart
  /**
   * Retrieves a summary of the user's shopping cart by user ID.
   * 
   * @param {number} idUsuario - The ID of the user.
   * @returns {Promise<IItemCarritoResumen[]>} - A promise that resolves to an array of cart item summaries.
   */
  async verMiCarritoId(idUsuario: number): Promise<IItemCarritoResumen[]> {
    try {
      const carrito = await this.carritoService.verMiCarritoId(idUsuario);
      if (!carrito || carrito.length === 0) {
        return [new NullItemCarrito().toResumen()]; // Return a null item summary if the cart is empty.
      }
      return carrito;
    } catch (error) {
      return [new NullItemCarrito().toResumen()]; // Return a null item summary in case of an error.
    }
  }

  /**
   * Retrieves the complete shopping cart for the user by user ID.
   * 
   * @param {number} idUsuario - The ID of the user.
   * @returns {Promise<ICarritoCompleto>} - A promise that resolves to the complete cart object.
   */
  async verMiCarritoCompleto(idUsuario: number): Promise<ICarritoCompleto> {
    try {
      const carrito = await this.carritoService.verMiCarritoCompleto(idUsuario);
      if (!carrito) {
        return new NullCarrito().toCompleto(); // Return a null cart if not found.
      }
      return carrito;
    } catch (error) {
      return new NullCarrito().toCompleto(); // Return a null cart in case of an error.
    }
  }

  // 🧮 Calculate totals
  /**
   * Calculates the totals for the user's shopping cart.
   * 
   * @param {number} idUsuario - The ID of the user.
   * @returns {Promise<ITotalesCarrito>} - A promise that resolves to the totals object for the cart.
   */
  async calcularTotalesCarrito(idUsuario: number): Promise<ITotalesCarrito> {
    try {
      const totales = await this.carritoService.calcularTotalesCarrito(idUsuario);
      return totales || new NullCarrito().toTotales(); // Return totals or a null total object.
    } catch (error) {
      return new NullCarrito().toTotales(); // Return a null total object in case of an error.
    }
  }

  /**
   * Calculates the totals for the complete shopping cart.
   * 
   * @param {number} idUsuario - The ID of the user.
   * @returns {Promise<ITotalesCarrito>} - A promise that resolves to the totals object for the complete cart.
   */
  async calcularTotalesCarritoCompleto(idUsuario: number): Promise<ITotalesCarrito> {
    try {
      const totales = await this.carritoService.calcularTotalesCarritoCompleto(idUsuario);
      return totales || new NullCarrito().toTotales(); // Return totals or a null total object.
    } catch (error) {
      return new NullCarrito().toTotales(); // Return a null total object in case of an error.
    }
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
    try {
      // Basic validation for quantity (optional)
      if (cantidad <= 0) {
        throw new OperacionCarritoError("La cantidad debe ser mayor que cero");
      }
      
      await this.carritoService.agregarProductoAlCarrito(usuarioId, productoId, cantidad);
      // No return value as the return type is void
    } catch (error) {
      // Reuse domain errors
      if (error instanceof ProductoNoEncontradoError) {
        throw error; // Already has the appropriate message
      }
      
      if (error instanceof StockInsuficienteError) {
        throw error; // Already has the appropriate message
      }
      
      if (error instanceof CarritoNoEncontradoError) {
        throw error; // Already has the appropriate message
      }
      
      if (error instanceof OperacionCarritoError) {
        throw error; // Already has the appropriate message
      }
      
      if (error instanceof ItemCarritoNoEncontradoError) {
        throw new OperacionCarritoError("El producto que intentas eliminar no está en el carrito.");
      }
      
      // If it's another type of error, convert it to an operation error
      throw new OperacionCarritoError(
        error instanceof Error ? 
        `Error al agregar el producto al carrito: ${error.message}` : 
        "Error desconocido al agregar el producto al carrito"
      );
    }
  }

  /**
   * Removes a product from the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to remove.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async eliminarProductoDelCarrito(usuarioId: number, productoId: number): Promise<void> {
    try {
      await this.carritoService.eliminarProductoDelCarrito(usuarioId, productoId);
      // No return value as the return type is void
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
      
      // Reuse domain errors
      if (error instanceof ItemCarritoNoEncontradoError) {
        throw error; // Already has the appropriate message
      }
      
      if (error instanceof ProductoNoEncontradoError) {
        throw error; // Already has the appropriate message
      }
      
      if (error instanceof CarritoNoEncontradoError) {
        throw error; // Already has the appropriate message
      }
      
      // If it's another type of error, convert it to an operation error
      throw new OperacionCarritoError(
        error instanceof Error ? 
        `Error al eliminar el producto: ${error.message}` : 
        "Error desconocido al eliminar el producto del carrito"
      );
    }
  }

  // ➕ Increase product quantity
  /**
   * Increases the quantity of a product in the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to increase.
   * @returns {Promise<number>} - A promise that resolves to the new quantity of the product.
   */
  async aumentarCantidadProducto(usuarioId: number, productoId: number): Promise<number> {
    try {
      const nuevaCantidad = await this.carritoService.aumentarCantidadProducto(usuarioId, productoId);
      return nuevaCantidad;
    } catch (error) {
      console.error("Error al aumentar cantidad:", error);
      
      // Reuse domain errors
      if (error instanceof ProductoNoEncontradoError) {
        throw error; // Already has the appropriate message
      }
      
      if (error instanceof ItemCarritoNoEncontradoError) {
        throw error; // Already has the appropriate message
      }
      
      if (error instanceof StockInsuficienteError) {
        throw error; // Already has the appropriate message
      }
      
      if (error instanceof CarritoNoEncontradoError) {
        throw error; // Already has the appropriate message
      }
      
      // If it's another type of error, convert it to an operation error
      throw new OperacionCarritoError(
        error instanceof Error ? 
        `Error al aumentar la cantidad: ${error.message}` : 
        "Error desconocido al aumentar la cantidad del producto"
      );
    }
  }

  // ➖ Decrease product quantity
  /**
   * Decreases the quantity of a product in the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to decrease.
   * @returns {Promise<number>} - A promise that resolves to the new quantity of the product.
   */
  async disminuirCantidadProducto(usuarioId: number, productoId: number): Promise<number> {
    try {
      const nuevaCantidad = await this.carritoService.disminuirCantidadProducto(usuarioId, productoId);
      return nuevaCantidad;
    } catch (error) {
      console.error("Error al disminuir cantidad:", error);
      
      // Reuse domain errors
      if (error instanceof ItemCarritoNoEncontradoError) {
        throw error; // Already has the appropriate message
      }
      
      if (error instanceof ProductoNoEncontradoError) {
        throw error; // Already has the appropriate message
      }
      
      if (error instanceof CarritoNoEncontradoError) {
        throw error; // Already has the appropriate message
      }
      
      // If it's another type of error, convert it to an operation error
      throw new OperacionCarritoError(
        error instanceof Error ? 
        `Error al disminuir la cantidad: ${error.message}` : 
        "Error desconocido al disminuir la cantidad del producto"
      );
    }
  }
}