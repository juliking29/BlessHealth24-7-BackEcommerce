import { Pool } from "mysql2/promise"; // Ensure to import Pool
import MySQLDatabase from "../Singelton/MySQLDatabase"; // Ensure to import the database class
import { IFavoritoQueries } from "../../Domain/IFavoritoQueries";

/**
 * MySQLFavoritoQueries implements the IFavoritoQueries interface,
 * providing methods for interacting with the MySQL database for favorite product operations.
 */
export class MySQLFavoritoQueries implements IFavoritoQueries {
  
  private readonly pool: Pool; // MySQL connection pool

  /**
   * Initializes the MySQLFavoritoQueries with a connection pool.
   */
  constructor() {
    this.pool = MySQLDatabase.getPool(); // Get the connection pool from MySQLDatabase
  }

  /**
   * Retrieves the list of favorite products for a specific user.
   * 
   * @param {number} usuarioID - The ID of the user whose favorites are to be retrieved.
   * @returns {Promise<any[]>} - A promise that resolves to an array of favorite products.
   */
  async obtenerFavoritos(usuarioID: number): Promise<any[]> {
    const [rows]: any = await this.pool.execute("CALL VerMisFavoritos(?)", [usuarioID]);
    console.log('Resultado de la consulta VerMisFavoritos:', rows); // Log the result of the query
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : []; // Return the favorites or an empty array
  }

  /**
   * Adds a product to the user's favorites.
   * 
   * @param {number} usuarioID - The ID of the user.
   * @param {number} productoID - The ID of the product to add to favorites.
   * @returns {Promise<void>} - A promise that resolves when the product is added.
   */
  async agregarAFavoritos(usuarioID: number, productoID: number): Promise<void> {
    await this.pool.execute("CALL AgregarAFavoritosfinal(?, ?)", [usuarioID, productoID]);
  }

  /**
   * Removes a product from the user's favorites.
   * 
   * @param {number} usuarioID - The ID of the user.
   * @param {number} productoID - The ID of the product to remove from favorites.
   * @returns {Promise<void>} - A promise that resolves when the product is removed.
   */
  async quitarDeFavoritos(usuarioID: number, productoID: number): Promise<void> {
    await this.pool.execute("CALL QuitarDeFavoritosfinal(?, ?)", [usuarioID, productoID]);
  }

  /**
   * Counts the number of favorite products for a specific user.
   * 
   * @param {number} usuarioID - The ID of the user whose favorites are to be counted.
   * @returns {Promise<number>} - A promise that resolves to the count of favorite products.
   */
  async contarFavoritos(usuarioID: number): Promise<number> {
    const [rows]: any = await this.pool.execute(
      `SELECT COUNT(f.producto_id) AS cantidad_productos_favoritos
       FROM favoritos f
       WHERE f.usuario_id = ?`,
      [usuarioID]
    );
    return Array.isArray(rows) && rows.length > 0 ? rows[0].cantidad_productos_favoritos : 0; // Return the count or 0
  }
}