import { Pool } from "mysql2/promise"; // Ensure to import Pool
import MySQLDatabase from "../Singelton/MySQLDatabase"; // Ensure to import the database class
import { ICarritoQueries } from "../../Domain/ICarritoQueries";
import { RepositorioError } from "../../../ModuloCarrito/Domain/error/CarritoError";

/**
 * MySQLCarritoQueries implements the ICarritoQueries interface,
 * providing methods for interacting with the MySQL database for shopping cart operations.
 */
export class MySQLCarritoQueries implements ICarritoQueries {
  
  private readonly pool: Pool; // MySQL connection pool

  /**
   * Initializes the MySQLCarritoQueries with a connection pool.
   */
  constructor() {
    this.pool = MySQLDatabase.getPool(); // Get the connection pool from MySQLDatabase
  }

  /**
   * Executes a stored procedure with the given parameters.
   * 
   * @param {string} procedure - The name of the stored procedure to execute.
   * @param {any[]} params - The parameters to pass to the stored procedure.
   * @returns {Promise<any>} - A promise that resolves to the result of the stored procedure.
   */
  async executeStoredProcedure(procedure: string, params: any[]): Promise<any> {
    try {
      const [result]: any = await this.pool.execute(procedure, params);
      return Array.isArray(result) ? result[0] : result; // Return the result
    } catch {
      throw new RepositorioError(`Error al ejecutar el procedimiento: ${procedure}`); // Throw error if execution fails
    }
  }

  /**
   * Calculates the total amounts for the user's shopping cart.
   * 
   * @param {number} idUsuario - The ID of the user whose cart totals are to be calculated.
   * @returns {Promise<any>} - A promise that resolves to the total amounts.
   */
  async calcularTotalesCarrito(idUsuario: number): Promise<any> {
    const rows = await this.executeStoredProcedure(
      'CALL CalcularTotalesCarrito(?);',
      [idUsuario]
    );
    return rows; // Return the calculated totals
  }

  /**
   * Retrieves the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user whose cart is to be retrieved.
   * @returns {Promise<any[]>} - A promise that resolves to an array of items in the cart.
   */
  async verMiCarrito(usuarioId: number): Promise<any[]> {
    const rows = await this.executeStoredProcedure(
      'CALL VerMiCarrito(?);',
      [usuarioId]
    );
    return rows; // Return the cart items
  }

  /**
   * Adds a product to the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to add.
   * @param {number} cantidad - The quantity of the product to add.
   * @returns {Promise<void>} - A promise that resolves when the product is added.
   */
  async agregarProductoAlCarrito(usuarioId: number, productoId: number, cantidad: number): Promise<void> {
    await this.executeStoredProcedure(
      'CALL AgregarProductoAlCarrito(?, ?, ?);',
      [usuarioId, productoId, cantidad]
    );
  }

  /**
   * Removes a product from the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to remove.
   * @returns {Promise<void>} - A promise that resolves when the product is removed.
   */
  async eliminarProductoDelCarrito(usuarioId: number, productoId: number): Promise<void> {
    await this.executeStoredProcedure(
      'CALL EliminarProductoDelCarrito(?, ?);',
      [usuarioId, productoId]
    );
  }

  /**
   * Increases the quantity of a product in the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to increase.
   * @returns {Promise<number>} - A promise that resolves to the new quantity of the product.
   */
  async aumentarCantidadProducto(usuarioId: number, productoId: number): Promise<number> {
    const [rows]: any = await this.pool.execute(
      'SELECT AumentarCantidadProductoCarrito(?, ?) AS cantidad;',
      [usuarioId, productoId]
    );

    // Verify that rows is an array
    if (!Array.isArray(rows) || rows.length === 0) {
      throw new Error("No se encontraron resultados para aumentar la cantidad."); // Throw error if no results found
    }

    return rows[0].cantidad; // Return the new quantity
  }

  /**
   * Decreases the quantity of a product in the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to decrease.
   * @returns {Promise<number>} - A promise that resolves to the new quantity of the product.
   */
  async disminuirCantidadProducto(usuarioId: number, productoId: number): Promise<number> {
    const [rows]: any = await this.pool.execute(
      'SELECT DisminuirCantidadProductoCarrito(?, ?) AS cantidad;',
      [usuarioId, productoId]
    );

    console.log("rows:", rows); // Check the content of rows

    // Verify that rows is an array and has at least one element
    if (!Array.isArray(rows) || rows.length === 0) {
      throw new Error("No se encontraron resultados para disminuir la cantidad."); // Throw error if no results found
    }

    return rows[0].cantidad; // Return the new quantity
  }

  /**
   * Retrieves the complete shopping cart for the user.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @returns {Promise<any>} - A promise that resolves to the complete cart details.
   */
  async verCarritoCompleto(usuarioId: number): Promise<any> {
    const rows = await this.executeStoredProcedure(
      'CALL VerMiCarritoCompleto(?);',
      [usuarioId]
    );
    return rows; // Return the complete cart details
  }

  /**
   * Retrieves the cart ID for the specified user.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @returns {Promise<number>} - A promise that resolves to the cart ID.
   */
  async obtenerIdCarrito(usuarioId: number): Promise<number> {
    const [carritoRows] = await this.pool.execute(
      'SELECT idCarrito FROM carrito WHERE usuario_id = ?',
      [usuarioId]
    ) as [any[], any]; // Ensure the type is correct
  
    if (carritoRows.length === 0) {
      throw new RepositorioError(`No se encontró carrito para el usuario: ${usuarioId}`); // Throw error if no cart found
    }
  
    return carritoRows[0].idCarrito; // Return the cart ID
  }
  
  /**
   * Creates a new shopping cart for the specified user.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @returns {Promise<void>} - A promise that resolves when the cart is created.
   */
  async crearNuevoCarrito(usuarioId: number): Promise<void> {
    await this.pool.execute(
      'INSERT INTO carrito (usuario_id, totalCarrito) VALUES (?, 0)',
      [usuarioId]
    );
  }

  /**
   * Retrieves the products in the specified shopping cart.
   * 
   * @param {number} carritoId - The ID of the cart.
   * @returns {Promise<any[]>} - A promise that resolves to an array of products in the cart.
   */
  async verProductosEnCarrito(carritoId: number): Promise<any[]> {
    const [rows]: any = await this.pool.execute(
      `SELECT cp.idCarrito, cp.idProducto, cp.cantidad, 
              p.nombreProducto, p.descripcionProducto, p.precioProducto, 
              p.stockProducto, p.imgProducto, p.categoria_id, p.marcaProducto,
              c.nombreCategoria
       FROM carrito_Productos cp
       JOIN productos p ON cp.idProducto = p.idProducto
       LEFT JOIN categoria c ON p.categoria_id = c.idCategoria
       WHERE cp.idCarrito = ?`,
      [carritoId]
    );

    console.log("rows:", rows); // Check the content of rows
    return rows; // Return the products in the cart
  }

  /**
   * Calculates the total amounts for the complete shopping cart of the user.
   * 
   * @param {number} idUsuario - The ID of the user whose complete cart totals are to be calculated.
   * @returns {Promise<any>} - A promise that resolves to the total amounts for the complete cart.
   */
  async calcularTotalesCarritoCompleto(idUsuario: number): Promise<any> {
    const rows = await this.executeStoredProcedure(
      'CALL CalcularTotalesCarritoCompleto(?);',
      [idUsuario]
    );
    return rows; // Return the calculated totals for the complete cart
  }
}