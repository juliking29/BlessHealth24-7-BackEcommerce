import { IItemFavoritoResumen } from "../../Domain/ItemFavorito/interfaces/ItemFavoritoInterface";
import { IFavoritoRepository } from "../../Domain/Port/Driven/IFavoritoRepository";
import FavoritoServiceInterface from "../../Domain/interfaces/FavoritoServiceInterface";

/**
 * FavoritoService implements the FavoritoServiceInterface,
 * providing methods for managing favorite items by interacting
 * with the favorite repository.
 */
export default class FavoritoService implements FavoritoServiceInterface {
  
  /**
   * Constructor for FavoritoService.
   * 
   * @param {IFavoritoRepository} favoritoRepository - An instance of the favorite repository for data access.
   */
  constructor(private readonly favoritoRepository: IFavoritoRepository) {}

  /**
   * obtenerFavoritos
   * 
   * Retrieves the list of favorite items for a specified user.
   * 
   * @param {number} idUsuario - The ID of the user whose favorites are to be retrieved.
   * @returns {Promise<IItemFavoritoResumen[]>} - A promise that resolves to an array of favorite item summaries.
   */
  async obtenerFavoritos(idUsuario: number): Promise<IItemFavoritoResumen[]> {
    return await this.favoritoRepository.obtenerProductos(idUsuario);
  }

  /**
   * agregarAFavoritos
   * 
   * Adds a product to the user's favorites.
   * 
   * @param {number} usuarioID - The ID of the user to whom the product will be added.
   * @param {number} productoID - The ID of the product to be added to favorites.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async agregarAFavoritos(usuarioID: number, productoID: number): Promise<void> {
    await this.favoritoRepository.agregarProducto(usuarioID, productoID);
  }

  /**
   * quitarProductoDeFavoritos
   * 
   * Removes a product from the user's favorites.
   * 
   * @param {number} usuarioID - The ID of the user from whose favorites the product will be removed.
   * @param {number} productoID - The ID of the product to be removed from favorites.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async quitarProductoDeFavoritos(usuarioID: number, productoID: number): Promise<void> {
    await this.favoritoRepository.eliminarProducto(usuarioID, productoID);
  }

  /**
   * contarFavoritos
   * 
   * Counts the number of favorite items for a specified user.
   * 
   * @param {number} usuarioID - The ID of the user whose favorites are to be counted.
   * @returns {Promise<{ idUsuario: number; cantidad: number }>} - A promise that resolves to an object containing the user ID and the count of favorites.
   */
  async contarFavoritos(usuarioID: number): Promise<{ idUsuario: number; cantidad: number }> {
    const cantidad = await this.favoritoRepository.contarProductos(usuarioID);
    return {
      idUsuario: usuarioID,
      cantidad: cantidad,
    };
  }
}