import { ICarritoCompleto, ITotalesCarrito } from "../Carrito/interfaces/carritointerfaces";
import { IItemCarritoResumen } from "../iItemCarrito/Interfaces/ItemCarritoInterfaces";

/**
 * CarritoServiceInterface defines the methods for managing shopping cart operations
 * in the service layer of the application.
 */
export default interface CarritoServiceInterface {
  
  /**
   * Adds a product to the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to add.
   * @param {number} cantidad - The quantity of the product to add.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  agregarProductoAlCarrito(usuarioId: number, productoId: number, cantidad: number): Promise<void>;

  /**
   * Retrieves a summary of the user's shopping cart by user ID.
   * 
   * @param {number} idUsuario - The ID of the user.
   * @returns {Promise<IItemCarritoResumen[]>} - A promise that resolves to an array of cart item summaries.
   */
  verMiCarritoId(idUsuario: number): Promise<IItemCarritoResumen[]>;

  /**
   * Retrieves the complete shopping cart for the user by user ID.
   * 
   * @param {number} idUsuario - The ID of the user.
   * @returns {Promise<ICarritoCompleto>} - A promise that resolves to the complete cart object.
   */
  verMiCarritoCompleto(idUsuario: number): Promise<ICarritoCompleto>;

  /**
   * Calculates the totals for the user's shopping cart.
   * 
   * @param {number} idUsuario - The ID of the user.
   * @returns {Promise<ITotalesCarrito>} - A promise that resolves to the totals object for the cart.
   */
  calcularTotalesCarrito(idUsuario: number): Promise<ITotalesCarrito>;

  /**
   * Calculates the totals for the complete shopping cart.
   * 
   * @param {number} idUsuario - The ID of the user.
   * @returns {Promise<ITotalesCarrito>} - A promise that resolves to the totals object for the complete cart.
   */
  calcularTotalesCarritoCompleto(idUsuario: number): Promise<ITotalesCarrito>;

  /**
   * Removes a product from the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to remove.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  eliminarProductoDelCarrito(usuarioId: number, productoId: number): Promise<void>;

  /**
   * Increases the quantity of a product in the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to increase.
   * @returns {Promise<number>} - A promise that resolves to the new quantity of the product.
   */
  aumentarCantidadProducto(usuarioId: number, productoId: number): Promise<number>;

  /**
   * Decreases the quantity of a product in the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to decrease.
   * @returns {Promise<number>} - A promise that resolves to the new quantity of the product.
   */
  disminuirCantidadProducto(usuarioId: number, productoId: number): Promise<number>;
}