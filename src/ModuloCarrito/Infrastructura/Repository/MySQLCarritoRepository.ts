import { ICarritoQueries } from './../../../Mysql/Domain/ICarritoQueries';
import { ICarritoRepository } from '../../Domain/Port/Driven/ICarritoRepository';
import AbstractCarrito from '../../Domain/Carrito/AbstractCarrito';
import Carrito from "../../Domain/Carrito/Carrito";
import NullCarrito from "../../Domain/Carrito/NullCarrito";
import AbstractItemCarrito from '../../Domain/iItemCarrito/ItemCarrito';
import ItemCarrito from '../../Domain/iItemCarrito/ItemCarrito';
import { ICarritoCompleto, ITotalesCarrito } from '../../Domain/Carrito/interfaces/carritointerfaces';
import { IItemCarritoResumen, ItemCarritoInterface } from '../../Domain/iItemCarrito/Interfaces/ItemCarritoInterfaces';
import { 
  CarritoError, 
  ItemCarritoNoEncontradoError, 
  OperacionCarritoError, 
  ProductoNoEncontradoError, 
  RepositorioError 
} from '../../Domain/error/CarritoError';
import { IProductoRepository } from '../../../ModuloProductos/Domain/Port/Driven/IProductoRepository';
import NullItemCarrito from '../../Domain/iItemCarrito/NullItemCarrito';
import { ICarritoItem } from '../../Domain/interfaces/ICarritoItem';

/**
 * MySQLCarritoRepository implements the ICarritoRepository interface,
 * providing methods for managing shopping cart data operations in a MySQL database.
 */
export class MySQLCarritoRepository implements ICarritoRepository {
  
  constructor(
    private readonly queriesCarrito: ICarritoQueries,
    private readonly productoRepository: IProductoRepository,
  ) {}

  /**
   * Retrieves all items in the user's shopping cart by cart ID.
   * 
   * @param {number} carritoId - The ID of the shopping cart.
   * @returns {Promise<AbstractItemCarrito[]>} - A promise that resolves to an array of cart items.
   */
  async getItems(carritoId: number): Promise<AbstractItemCarrito[]> {
    try {
      const rows: any = await this.queriesCarrito.verProductosEnCarrito(carritoId);

      // Verify that rows is an array
      if (!Array.isArray(rows)) {
        return [];
      }

      return Promise.all(rows.map(async (item) => {
        try {
          const producto = await this.productoRepository.findById(item.idProducto);
          
          if (!producto) {
            throw new ProductoNoEncontradoError(item.idProducto);
          }
          
          return new ItemCarrito({
            idItemCarrito: carritoId,
            usuarioId: item.usuarioId, 
            producto: producto,
            cantidad: item.cantidad,
          });
        } catch (error) {
          console.error(`Error al procesar item ${item.idProducto}:`, error);
          throw new RepositorioError(`Error al obtener información del producto ${item.idProducto}`, 
            error instanceof Error ? error : new Error(String(error)));
        }
      }));
    } catch (error: any) {
      return [];
    }
  }

  /**
   * Processes the result of the totals calculation from the database.
   * 
   * @param {any} rows - The rows returned from the database query.
   * @param {number} _idUsuario - The ID of the user.
   * @returns {ITotalesCarrito} - The totals object for the cart.
   */
  private processTotalesResult(rows: any, _idUsuario: number): ITotalesCarrito {
    if (!rows || rows.length === 0) {
      return new NullCarrito().toTotales();
    }
    
    // Validate database data
    const subtotal = parseFloat(rows[0].Subtotal || '0');
    const cantidadArticulos = parseInt(rows[0].CantidadTotalArticulos || '0', 10);
    const totalConIVA = parseFloat(rows[0].TotalConIVA || '0');
    
    // Ensure values are valid numbers
    const validSubtotal = isNaN(subtotal) ? 0 : subtotal;
    const validCantidad = isNaN(cantidadArticulos) ? 0 : cantidadArticulos;
    const validTotalIVA = isNaN(totalConIVA) ? 0 : totalConIVA;
    
    // Calculate shipping message
    let mensajeEnvio = '';
    const minimoEnvioGratis = 45;
    
    if (validSubtotal >= minimoEnvioGratis) {
      mensajeEnvio = 'Envío gratis';
    } else {
      const falta = (minimoEnvioGratis - validSubtotal).toFixed(2);
      mensajeEnvio = `Te faltan ${falta}€ para obtener envío gratis`;
    }
    
    // Return totals formatted
    return {
      Subtotal: `${validSubtotal.toFixed(2)}`,
      CantidadTotalArticulos: validCantidad,
      TotalConIVA: `${validTotalIVA.toFixed(2)}`,
      MensajeEnvio: mensajeEnvio
    };
  }

  /**
   * Calculates the totals for the user's shopping cart.
   * 
   * @param {number} idUsuario - The ID of the user.
   * @returns {Promise<ITotalesCarrito>} - A promise that resolves to the totals object for the cart.
   */
  async calcularTotalesCarrito(idUsuario: number): Promise<ITotalesCarrito> {
    try {
      const rows = await this.queriesCarrito.calcularTotalesCarrito(idUsuario);
      return this.processTotalesResult(rows, idUsuario);
    } catch (error: any) {
      return new NullCarrito().toTotales();
    }
  }

 

  /**
   * Finds the shopping cart associated with a specific user ID.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @returns {Promise<AbstractCarrito>} - A promise that resolves to the user's shopping cart.
   */
  async findByUsuarioId(usuarioId: number): Promise<AbstractCarrito> {
    try {
      // Get the cart ID associated with the user
      const carritoId = await this.queriesCarrito.obtenerIdCarrito(usuarioId);

      // Check if a cart was found
      if (!carritoId) {
        // Create a new cart if none was found
        const result = await this.queriesCarrito.crearNuevoCarrito(usuarioId);
        const insertResult = result as any;
        const nuevoCarritoId = insertResult.insertId; // Get the ID of the new cart

        // Get the items of the new cart (you can adjust this according to your logic)
        const items = await this.getItems(nuevoCarritoId);

        return new Carrito({
          idCarrito: nuevoCarritoId,
          usuarioId: usuarioId,
          items: items as ItemCarrito[],
        });
      } else {
        // If a cart was found, get the items
        const items = await this.getItems(carritoId);

        return new Carrito({
          idCarrito: carritoId,
          usuarioId: usuarioId,
          items: items as ItemCarrito[],
        });
      }
    } catch (error: any) {
      return new NullCarrito(); // Return a null cart in case of an error.
    }
  }

  /**
   * Adds an item to the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to add.
   * @param {number} cantidad - The quantity of the product to add.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async addItem(usuarioId: number, productoId: number, cantidad: number): Promise<void> {
    try {
      await this.queriesCarrito.agregarProductoAlCarrito(usuarioId, productoId, cantidad);
    } catch (error: any) {
      // If it's a domain error, propagate it
      if (error instanceof CarritoError) {
        throw error;
      }
      
      // If it's another type of error, transform it
      throw new OperacionCarritoError(`No se pudo agregar el producto al carrito: ${error.message}`);
    }
  }

  /**
   * Removes a product from the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to remove.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async removeItem(usuarioId: number, productoId: number): Promise<void> {
    try {
      await this.queriesCarrito.eliminarProductoDelCarrito(usuarioId, productoId);
    } catch (error: any) {
      console.error('Error al eliminar item del carrito:', error);
      
      // If it's a domain error, propagate it
      if (error instanceof CarritoError) {
        throw error;
      }
      
      // If it's another type of error, transform it
      throw new OperacionCarritoError(`No se pudo eliminar el producto del carrito: ${error.message}`);
    }
  }

  /**
   * Increases the quantity of a product in the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to increase.
   * @returns {Promise<number>} - A promise that resolves to the new quantity of the product.
   */
  async increaseItemQuantity(usuarioId: number, productoId: number): Promise<number> {
    try {
      const cantidad = await this.queriesCarrito.aumentarCantidadProducto(usuarioId, productoId);
      // Verify if the quantity is valid
      if (cantidad === 0 || cantidad === null) {
        throw new ItemCarritoNoEncontradoError(productoId);
      }
      
      return cantidad;
    } catch (error: any) {
      console.error('Error al aumentar cantidad de producto:', error);
      
      // If it's a domain error, propagate it
      if (error instanceof CarritoError) {
        throw error;
      }
      
      // If it's another type of error, transform it
      throw new OperacionCarritoError(`No se pudo aumentar la cantidad del producto: ${error.message}`);
    }
  }

  /**
   * Decreases the quantity of a product in the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to decrease.
   * @returns {Promise<number>} - A promise that resolves to the new quantity of the product.
   */
  async decreaseItemQuantity(usuarioId: number, productoId: number): Promise<number> {
    try {
      const cantidad = await this.queriesCarrito.disminuirCantidadProducto(usuarioId, productoId);
      
      if (cantidad === 0) {
        console.error(`Error: La cantidad del producto ${productoId} ha llegado a 0.`);
        throw new ItemCarritoNoEncontradoError(productoId);
      }

      console.log('Cantidad disminuida:', cantidad);
      return cantidad;
    } catch (error: any) {
      console.error('Error al disminuir cantidad de producto:', error);
      
      // If it's a domain error, propagate it
      if (error instanceof CarritoError) {
        throw error;
      }
      
      // If it's another type of error, transform it
      throw new OperacionCarritoError(`No se pudo disminuir la cantidad del producto: ${error.message}`);
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
      const rows = await this.queriesCarrito.calcularTotalesCarritoCompleto(idUsuario);
      if (!rows || rows.length === 0) {
        return new NullCarrito().toTotales();
      }
      
      // Validate database data
      const subtotal = parseFloat(rows[0].Subtotal);
      const cantidadArticulos = parseInt(rows[0].CantidadTotalArticulos);
      const totalConIVA = parseFloat(rows[0].TotalConIVA);
      
      // Ensure values are valid numbers
      const validSubtotal = isNaN(subtotal) ? 0 : subtotal;
      const validCantidad = isNaN(cantidadArticulos) ? 0 : cantidadArticulos;
      const validTotalIVA = isNaN(totalConIVA) ? 0 : totalConIVA;
      
      // Shipping message for complete cart
      const mensajeEnvio = validSubtotal >= 45 ? 'Envío gratis' : '(Envio No Incluido)';
      
      return {
        Subtotal: `${validSubtotal.toFixed(2)}`,
        CantidadTotalArticulos: validCantidad,
        TotalConIVA: `${validTotalIVA.toFixed(2)}`,
        MensajeEnvio: mensajeEnvio
      };
    } catch (error: any) {
      // If it's a domain error, propagate it
      if (error instanceof CarritoError) {
        throw error;
      }
      
      // If it's another type of error, return a default value
      return new NullCarrito().toTotales();
    }
  }
   /**
   * Retrieves a summary of the user's shopping cart by user ID.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @returns {Promise<IItemCarritoResumen[]>} - A promise that resolves to an array of cart item summaries.
   */
   async VerMiCarritoResumen(usuarioId: number): Promise<IItemCarritoResumen[]> {
    try {
      const rows: ICarritoItem[] = await this.queriesCarrito.verMiCarrito(usuarioId);
      
      if (!rows || rows.length === 0) {
        return [new NullItemCarrito().toResumen()]; // Return a null item summary if the cart is empty.
      }
      
      return rows.map((item: ICarritoItem) => {
        const producto = {
          getId: () => item.idProducto,
          getNombre: () => item.nombreProducto,
          getTallaNombre: () => item.tallaProducto,
          getMarcaNombre: () => item.marca || 'N/A',
          getPrecio: () => parseFloat(item.precioProducto),
          getStock: () => item.cantidad || 0, 
          getImagen: () => item.imgProducto || 'default.jpg', 
        };
        
        // Create an object that complies with the ItemCarritoInterface
        const itemData: ItemCarritoInterface = {
          idItemCarrito: item.idItemCarrito || 0,
          usuarioId: usuarioId,
          producto: producto,
          cantidad: item.cantidad
        };
        
        // Create an instance of ItemCarrito and use its toResumen() method
        const itemCarrito = new ItemCarrito(itemData);
        return itemCarrito.toResumen();
      });
    } catch (error: any) {
      return [new NullItemCarrito().toResumen()]; // Return a null item summary in case of an error.
    }
  }

  /**
   * Retrieves the complete shopping cart for the user.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @returns {Promise<ICarritoCompleto>} - A promise that resolves to the complete cart object.
   */
  async verMiCarritoCompleto(usuarioId: number): Promise<ICarritoCompleto> {
    try {
      const rows = await this.queriesCarrito.verCarritoCompleto(usuarioId);
      
      if (!rows || rows.length === 0) {
        return new NullCarrito().toCompleto(); // Return a null cart if not found.
      }
      
      return rows as ICarritoCompleto;
    } catch (error: any) {
      return new NullCarrito().toCompleto(); // Return a null cart in case of an error.
    }
  }
}