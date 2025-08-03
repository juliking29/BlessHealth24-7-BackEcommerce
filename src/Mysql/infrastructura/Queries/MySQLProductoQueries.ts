import { Pool } from "mysql2/promise"; // Ensure to import Pool
import MySQLDatabase from "../Singelton/MySQLDatabase"; // Ensure to import the database class
import { IProductoQueries } from "../../Domain/IProductoQueries";
import IProductoData from "../../../ModuloProductos/Domain/interfaces/IProductoData";

/**
 * MySQLProductoQueries implements the IProductoQueries interface,
 * providing methods for interacting with the MySQL database for product operations.
 */
export class MySQLProductoQueries implements IProductoQueries {
  
  private readonly pool: Pool; // MySQL connection pool

  /**
   * Initializes the MySQLProductoQueries with a connection pool.
   */
  constructor() {
    this.pool = MySQLDatabase.getPool(); // Get the connection pool from MySQLDatabase
  }

  /**
   * Finds products within a specified price range.
   * 
   * @param {number} min - The minimum price of the products to find.
   * @param {number} max - The maximum price of the products to find.
   * @returns {Promise<any[]>} - A promise that resolves to an array of products within the price range.
   */
  async findByPriceRange(min: number, max: number): Promise<any[]> {
    const [result]: any = await this.pool.query(
      "CALL FiltrarProductosPorPrecio(?, ?)", 
      [min, max]
    );
    return Array.isArray(result) && result.length > 0 && Array.isArray(result[0]) ? result[0] : []; // Return the filtered products
  }

  /**
   * Finds a product by its ID.
   * 
   * @param {number} id - The ID of the product to find.
   * @returns {Promise<any[]>} - A promise that resolves to an array containing the product data if found.
   */
  async findById(id: number): Promise<any[]> {
    const [rows] = await this.pool.execute<any[]>( 
      `SELECT 
          p.idProducto,
          p.nombreProducto,
          p.descripcionProducto,
          p.precioProducto,
          p.imgProducto,
          p.stockProducto,
          CASE 
              WHEN p.descuento_id = 1 THEN 'No tiene promoción'
              WHEN p.descuento_id IS NOT NULL THEN 'Tiene promoción'
              ELSE 'No tiene promoción'
          END AS promocion
      FROM productos p
      LEFT JOIN descuentos d ON p.descuento_id = d.idDescuento
      WHERE p.idProducto = ?;`, 
      [id]
    );
    return rows; // Return the found product data
  }
  

  /**
   * Finds a product by its name.
   * 
   * @param {string} nombre - The name of the product to find.
   * @returns {Promise<any[]>} - A promise that resolves to an array containing the product data if found.
   */
  async findByName(nombreProducto: string): Promise<any[]> {
    const [rows] = await this.pool.execute<any[]>( 
      `SELECT 
          p.idProducto,
          p.nombreProducto,
          p.descripcionProducto,
          p.precioProducto,
          p.imgProducto,
          p.stockProducto,
          CASE 
              WHEN p.descuento_id = 1 THEN 'No tiene promoción'
              WHEN p.descuento_id IS NOT NULL THEN 'Tiene promoción'
              ELSE 'No tiene promoción'
          END AS promocion
      FROM productos p
      WHERE p.nombreProducto = ? 
      LIMIT 1;`, 
      [nombreProducto]
    );
    return rows; // Return the found product data
  }
  
  /**
   * Searches for products based on a search term.
   * 
   * @param {string} termino - The search term to use for finding products.
   * @returns {Promise<any[]>} - A promise that resolves to an array of products matching the search term.
   */
  async search(termino: string): Promise<any[]> {
    const [rows]: any = await this.pool.execute("CALL BuscarProductosFinal(?)", [termino]);
    return rows[0]; // Return the search results
  }

  /**
   * Retrieves a showcase of products.
   * 
   * @returns {Promise<IProductoData[]>} - A promise that resolves to an array of products for the showcase.
   */
  async getShowcase(): Promise<IProductoData[]> {
    const [rows]: any = await this.pool.execute(
      `SELECT p.idProducto, p.nombreProducto, p.tallaProducto, p.precioProducto,
              p.stockProducto, p.imgProducto AS imagenProducto, c.nombreCategoria AS categoriaNombre,
              CASE WHEN p.descuento_id = 1 THEN 'No' ELSE 'Sí' END AS enPromocion
       FROM productos p
       LEFT JOIN categoria c ON p.categoria_id = c.idCategoria
       WHERE p.estadoProducto = TRUE
       ORDER BY p.idProducto ASC;` // Cambié el orden a idProducto para que sea más lógico
    );
  
    return rows; // Return the showcase products
  }
  
  /**
   * Retrieves a subset (first 12) of products for the showcase.
   * 
   * @returns {Promise<IProductoData[]>} - A promise that resolves to an array of the first 12 products.
   */
  async getShowcase1(): Promise<IProductoData[]> {
    const [rows]: any = await this.pool.execute(
      `SELECT p.idProducto, p.nombreProducto, p.tallaProducto, p.precioProducto,
              p.stockProducto, p.imgProducto AS imagenProducto, c.nombreCategoria AS categoriaNombre,
              CASE WHEN p.descuento_id = 1 THEN 'No' ELSE 'Sí' END AS enPromocion
       FROM productos p
       LEFT JOIN categoria c ON p.categoria_id = c.idCategoria
       WHERE p.estadoProducto = TRUE
       ORDER BY p.idProducto ASC
       LIMIT 12 OFFSET 0;`
    );
    return rows; // Return the first 12 products
  }
  
  /**
   * Retrieves the next 12 products for the showcase, starting from index 12.
   * 
   * @returns {Promise<IProductoData[]>} - A promise that resolves to an array of the next 12 products.
   */
  async getShowcase2(): Promise<IProductoData[]> {
    const [rows]: any = await this.pool.execute(
      `SELECT p.idProducto, p.nombreProducto, p.tallaProducto, p.precioProducto,
              p.stockProducto, p.imgProducto AS imagenProducto, c.nombreCategoria AS categoriaNombre,
              CASE WHEN p.descuento_id = 1 THEN 'No' ELSE 'Sí' END AS enPromocion
       FROM productos p
       LEFT JOIN categoria c ON p.categoria_id = c.idCategoria
       WHERE p.estadoProducto = TRUE
       ORDER BY p.idProducto ASC
       LIMIT 12 OFFSET 12;`
    );
    return rows; // Return the next 12 products
  }
  
  /**
   * Retrieves the third set of 12 products for the showcase, starting from index 24.
   * 
   * @returns {Promise<IProductoData[]>} - A promise that resolves to an array of the third set of 12 products.
   */
  async getShowcase3(): Promise<IProductoData[]> {
    const [rows]: any = await this.pool.execute(
      `SELECT p.idProducto, p.nombreProducto, p.tallaProducto, p.precioProducto,
              p.stockProducto, p.imgProducto AS imagenProducto, c.nombreCategoria AS categoriaNombre,
              CASE WHEN p.descuento_id = 1 THEN 'No' ELSE 'Sí' END AS enPromocion
       FROM productos p
       LEFT JOIN categoria c ON p.categoria_id = c.idCategoria
       WHERE p.estadoProducto = TRUE
       ORDER BY p.idProducto ASC
       LIMIT 12 OFFSET 24;`
    );
    return rows; // Return the third set of 12 products
  }
  
  
}
