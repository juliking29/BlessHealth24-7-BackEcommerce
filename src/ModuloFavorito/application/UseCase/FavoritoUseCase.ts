import { IItemFavoritoResumen } from "../../Domain/ItemFavorito/interfaces/ItemFavoritoInterface";
import NullItemFavorito from "../../Domain/ItemFavorito/NullItemFavorito";
import FavoritoUseCasePort from "../../Domain/Port/Driver/FavoritoUseCasePort";
import FavoritoServiceInterface from "../../Domain/interfaces/FavoritoServiceInterface"; // Using the interface

/**
 * FavoritoUseCase implements the FavoritoUseCasePort interface,
 * providing use case methods for managing favorite items.
 * It interacts with the FavoritoService to perform actions related to user favorites.
 */
export default class FavoritoUseCase implements FavoritoUseCasePort {
  
  /**
   * Constructor for FavoritoUseCase.
   * 
   * @param {FavoritoServiceInterface} favoritoService - An instance of the favorite service for business logic.
   */
  constructor(private readonly favoritoService: FavoritoServiceInterface) {}

  /**
   * obtenerFavoritos
   * 
   * Retrieves the list of favorite items for a specified user.
   * If no favorites are found, returns a NullItemFavorito object in summary format.
   * 
   * @param {number} idUsuario - The ID of the user whose favorites are to be retrieved.
   * @returns {Promise<IItemFavoritoResumen[]>} - A promise that resolves to an array of favorite item summaries.
   */
  public async obtenerFavoritos(idUsuario: number): Promise<IItemFavoritoResumen[]> {
    const favoritos = await this.favoritoService.obtenerFavoritos(idUsuario);
    
    if (favoritos.length === 0) {
      return [new NullItemFavorito().toResumen()]; // Return a null favorite item if none found.
    }
    
    return favoritos; // Return the list of favorite items.
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
  public async agregarAFavoritos(usuarioID: number, productoID: number): Promise<void> {
    await this.favoritoService.agregarAFavoritos(usuarioID, productoID);
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
  public async quitarProductoDeFavoritos(usuarioID: number, productoID: number): Promise<void> {
    await this.favoritoService.quitarProductoDeFavoritos(usuarioID, productoID);
  }

  /**
   * contarFavoritos
   * 
   * Counts the number of favorite items for a specified user.
   * 
   * @param {number} usuarioID - The ID of the user whose favorites are to be counted.
   * @returns {Promise<{ idUsuario: number; cantidad: number }>} - A promise that resolves to an object containing the user ID and the count of favorites.
   */
  public async contarFavoritos(usuarioID: number): Promise<{ idUsuario: number; cantidad: number }> {
    return await this.favoritoService.contarFavoritos(usuarioID);
  }
}