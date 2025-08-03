import NullItemFavorito from "../../Domain/ItemFavorito/NullItemFavorito";
import { IFavoritoRepository } from "../../Domain/Port/Driven/IFavoritoRepository";
import { IItemFavoritoResumen } from "../../Domain/ItemFavorito/interfaces/ItemFavoritoInterface";
import { IFavoritoQueries } from "../../../Mysql/Domain/IFavoritoQueries";
import { IFavoritos } from "../../Domain/Favorito/interfaces/FavoritoInterface";

/**
 * MySQLFavoritoRepository implements the IFavoritoRepository interface,
 * providing methods for managing favorite items in a MySQL database.
 */
export class MySQLFavoritoRepository implements IFavoritoRepository {
  
  /**
   * Constructor for MySQLFavoritoRepository.
   * 
   * @param {IFavoritoQueries} queries - An instance of the favorite queries for database operations.
   */
  constructor(private readonly queries: IFavoritoQueries) {}

  /**
   * Obtains the list of favorite products for a specified user.
   * 
   * @param {number} usuarioID - The ID of the user whose favorite products are to be retrieved.
   * @returns {Promise<IItemFavoritoResumen[]>} - A promise that resolves to an array of favorite item summaries.
   */
  public async obtenerProductos(usuarioID: number): Promise<IItemFavoritoResumen[]> {
    try {
      const favoritos: IFavoritos[] = await this.queries.obtenerFavoritos(usuarioID);
  
      if (!favoritos || favoritos.length === 0) {
        return [new NullItemFavorito().toResumen()]; // Return a null favorite item if none found.
      }
  
      return favoritos.map((favorito: IFavoritos) => {
        const itemFavoritoResumen: IItemFavoritoResumen = {
          idProducto: favorito.idProducto,
          nombreProducto: favorito.nombreProducto,
          tallaProducto: favorito.tallaProducto || '',
          precioProducto: favorito.precioProducto.toString(),
          stockProducto: favorito.stockProducto || 0,
          imgProducto: favorito.imgProducto,
          nombreCategoria: favorito.nombreCategoria || '',
        };
  
        return itemFavoritoResumen; // Return the mapped favorite item summary.
      });
    } catch (error) {
      return [new NullItemFavorito().toResumen()]; // Return a null favorite item in case of an error.
    }
  }

  /**
   * Adds a product to the user's favorites.
   * 
   * @param {number} usuarioID - The ID of the user to whom the product will be added.
   * @param {number} productoID - The ID of the product to be added to favorites.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  public async agregarProducto(usuarioID: number, productoID: number): Promise<void> {
    try {
      await this.queries.agregarAFavoritos(usuarioID, productoID);
    } catch (error) {
      console.error("Error al agregar producto a favoritos:", error);
      throw error; // Rethrow the error for further handling.
    }
  }

  /**
   * Removes a product from the user's favorites.
   * 
   * @param {number} usuarioID - The ID of the user from whose favorites the product will be removed.
   * @param {number} productoID - The ID of the product to be removed from favorites.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  public async eliminarProducto(usuarioID: number, productoID: number): Promise<void> {
    try {
      await this.queries.quitarDeFavoritos(usuarioID, productoID);
    } catch (error) {
      console.error("Error al eliminar producto de favoritos:", error);
      throw error; // Rethrow the error for further handling.
    }
  }

  /**
   * Counts the number of favorite products for a specified user.
   * 
   * @param {number} usuarioID - The ID of the user whose favorites are to be counted.
   * @returns {Promise<number>} - A promise that resolves to the count of favorite products.
   */
  public async contarProductos(usuarioID: number): Promise<number> {
    try {
      return await this.queries.contarFavoritos(usuarioID);
    } catch (error) {
      console.error("Error al contar productos en favoritos:", error);
      throw error; // Rethrow the error for further handling.
    }
  }
}