import RepositoryInterface from "../../../../repository/domain/RepositoryInterface";
import AbstractCarrito from "../../Carrito/AbstractCarrito";
import { ICarritoCompleto, ITotalesCarrito } from "../../Carrito/interfaces/carritointerfaces";
import AbstractItemCarrito from "../../iItemCarrito/AbstractItemCarrito";
import { IItemCarritoResumen } from "../../iItemCarrito/Interfaces/ItemCarritoInterfaces";

/**
 * ICarritoRepository extends the RepositoryInterface,
 * defining the methods for managing shopping cart data operations.
 */
export interface ICarritoRepository extends RepositoryInterface {
  
  /**
   * Finds the shopping cart associated with a specific user ID.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @returns {Promise<AbstractCarrito>} - A promise that resolves to the user's shopping cart.
   */
  findByUsuarioId(usuarioId: number): Promise<AbstractCarrito>;

  /**
   * Adds an item to the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to add.
   * @param {number} cantidad - The quantity of the product to add.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  addItem(usuarioId: number, productoId: number, cantidad: number): Promise<void>;

  /**
   * Removes an item from the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to remove.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  removeItem(usuarioId: number, productoId: number): Promise<void>;

  /**
   * Increases the quantity of an item in the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to increase.
   * @returns {Promise<number>} - A promise that resolves to the new quantity of the product.
   */
  increaseItemQuantity(usuarioId: number, productoId: number): Promise<number>;

  /**
   * Decreases the quantity of an item in the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to decrease.
   * @returns {Promise<number>} - A promise that resolves to the new quantity of the product.
   */
  decreaseItemQuantity(usuarioId: number, productoId: number): Promise<number>;

  /**
   * Retrieves all items in the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @returns {Promise<AbstractItemCarrito[]>} - A promise that resolves to an array of cart items.
   */
  getItems(usuarioId: number): Promise<AbstractItemCarrito[]>;

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
   * Retrieves the complete shopping cart for the user.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @returns {Promise<ICarritoCompleto>} - A promise that resolves to the complete cart object.
   */
  verMiCarritoCompleto(usuarioId: number): Promise<ICarritoCompleto>;

  /**
   * Retrieves a summary of the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @returns {Promise<IItemCarritoResumen[]>} - A promise that resolves to an array of cart item summaries.
   */
  VerMiCarritoResumen(usuarioId: number): Promise<IItemCarritoResumen[]>;
}