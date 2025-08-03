import { IItemFavoritoResumen } from "../ItemFavorito/interfaces/ItemFavoritoInterface";

/**
 * FavoritoServiceInterface defines the methods for managing favorite items
 * in the service layer of the application. It provides an abstraction for
 * operations related to user favorites.
 */
export default interface FavoritoServiceInterface {
  
  /**
   * obtenerFavoritos
   * 
   * Retrieves the list of favorite items for a specified user.
   * 
   * @param {number} idUsuario - The ID of the user whose favorites are to be retrieved.
   * @returns {Promise<IItemFavoritoResumen[]>} - A promise that resolves to an array of favorite item summaries.
   */
  obtenerFavoritos(idUsuario: number): Promise<IItemFavoritoResumen[]>;

  /**
   * agregarAFavoritos
   * 
   * Adds a product to the user's favorites.
   * 
   * @param {number} usuarioId - The ID of the user to whom the product will be added.
   * @param {number} productoId - The ID of the product to be added to favorites.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  agregarAFavoritos(usuarioId: number, productoId: number): Promise<void>;

  /**
   * quitarProductoDeFavoritos
   * 
   * Removes a product from the user's favorites.
   * 
   * @param {number} usuarioId - The ID of the user from whose favorites the product will be removed.
   * @param {number} productoId - The ID of the product to be removed from favorites.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  quitarProductoDeFavoritos(usuarioId: number, productoId: number): Promise<void>;

  /**
   * contarFavoritos
   * 
   * Counts the number of favorite items for a specified user.
   * 
   * @param {number} usuarioId - The ID of the user whose favorites are to be counted.
   * @returns {Promise<{ idUsuario: number; cantidad: number }>} - A promise that resolves to an object containing the user ID and the count of favorites.
   */
  contarFavoritos(usuarioId: number): Promise<{ idUsuario: number; cantidad: number }>; 
}