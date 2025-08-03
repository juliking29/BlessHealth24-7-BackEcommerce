import RepositoryInterface from "../../../../repository/domain/RepositoryInterface";
import { IItemFavoritoResumen } from "../../ItemFavorito/interfaces/ItemFavoritoInterface";

/**
 * IFavoritoRepository extends the RepositoryInterface,
 * defining methods for managing favorite items in the data layer.
 * 
 * @extends RepositoryInterface
 */
export interface IFavoritoRepository extends RepositoryInterface {
  
  /**
   * agregarProducto
   * 
   * Adds a product to the user's favorites.
   * 
   * @param {number} usuarioId - The ID of the user to whom the product will be added.
   * @param {number} productoId - The ID of the product to be added to favorites.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  agregarProducto(usuarioId: number, productoId: number): Promise<void>;
  
  /**
   * eliminarProducto
   * 
   * Removes a product from the user's favorites.
   * 
   * @param {number} usuarioId - The ID of the user from whose favorites the product will be removed.
   * @param {number} productoId - The ID of the product to be removed from favorites.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  eliminarProducto(usuarioId: number, productoId: number): Promise<void>;
  
  /**
   * obtenerProductos
   * 
   * Retrieves the list of favorite products for a specified user.
   * 
   * @param {number} usuarioId - The ID of the user whose favorite products are to be retrieved.
   * @returns {Promise<IItemFavoritoResumen[]>} - A promise that resolves to an array of favorite item summaries.
   */
  obtenerProductos(usuarioId: number): Promise<IItemFavoritoResumen[]>;

  /**
   * contarProductos
   * 
   * Counts the number of favorite products for a specified user.
   * 
   * @param {number} usuarioId - The ID of the user whose favorite products are to be counted.
   * @returns {Promise<number>} - A promise that resolves to the count of favorite products.
   */
  contarProductos(usuarioId: number): Promise<number>; 
}