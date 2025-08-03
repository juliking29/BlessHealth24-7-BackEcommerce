/**
 * IFavoritoQueries defines the methods for interacting with the favorites
 * functionality in the application, including operations for managing
 * user favorites.
 */
export interface IFavoritoQueries {
  
  /**
   * Retrieves the list of favorite items for a specific user.
   * 
   * @param {number} usuarioID - The ID of the user whose favorites are to be retrieved.
   * @returns {Promise<any[]>} - A promise that resolves to an array of favorite items.
   */
  obtenerFavoritos(usuarioID: number): Promise<any[]>;

  /**
   * Adds a product to the user's favorites.
   * 
   * @param {number} usuarioID - The ID of the user.
   * @param {number} productoID - The ID of the product to add to favorites.
   * @returns {Promise<void>} - A promise that resolves when the product is added.
   */
  agregarAFavoritos(usuarioID: number, productoID: number): Promise<void>;

  /**
   * Removes a product from the user's favorites.
   * 
   * @param {number} usuarioID - The ID of the user.
   * @param {number} productoID - The ID of the product to remove from favorites.
   * @returns {Promise<void>} - A promise that resolves when the product is removed.
   */
  quitarDeFavoritos(usuarioID: number, productoID: number): Promise<void>;

  /**
   * Counts the number of favorite items for a specific user.
   * 
   * @param {number} usuarioID - The ID of the user whose favorites are to be counted.
   * @returns {Promise<number>} - A promise that resolves to the count of favorite items.
   */
  contarFavoritos(usuarioID: number): Promise<number>;
}