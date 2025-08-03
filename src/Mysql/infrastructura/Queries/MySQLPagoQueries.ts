import { IPagoQueries } from '../../Domain/IPagoQueries';
import { Pool } from "mysql2/promise";
import MySQLDatabase from "../Singelton/MySQLDatabase"; 

/**
 * MySQLPagoQueries implements the IPagoQueries interface,
 * providing methods for interacting with the MySQL database for payment operations.
 */
export class MySQLPagoQueries implements IPagoQueries {
  
  private readonly pool: Pool; // MySQL connection pool

  /**
   * Initializes the MySQLPagoQueries with a connection pool.
   */
  constructor() {
    this.pool = MySQLDatabase.getPool(); // Get the connection pool from MySQLDatabase
  }

  /**
   * Finds payment records associated with a specific user ID.
   * 
   * @param {number} usuarioId - The ID of the user whose payment records are to be retrieved.
   * @returns {Promise<any[]>} - A promise that resolves to an array of payment records.
   */
  async findByUsuarioId(usuarioId: number): Promise<any[]> {
    console.log(`Buscando pagos para usuario con ID: ${usuarioId}`); // Log for debugging
    
    const [rows]: any = await this.pool.execute(
      `SELECT * 
       FROM pago p
       JOIN carrito c ON p.carrito_id = c.idCarrito
       WHERE c.usuario_id = ?;`,
      [usuarioId]
    );

    console.log(`Resultado de pagos para usuario con ID ${usuarioId}:`, rows); // Log to see the result
    return rows; // Return the payment records
  }
  
  /**
   * Inserts a new payment record for a specific user.
   * 
   * @param {number} idUsuario - The ID of the user making the payment.
   * @returns {Promise<any>} - A promise that resolves to the result of the payment insertion.
   */
  async insertPago(idUsuario: number): Promise<any> {
    console.log(`Insertando pago para usuario con ID: ${idUsuario}`); // Log for debugging
  
    if (!Number.isInteger(idUsuario)) {
      throw new Error(`idUsuario debe ser un número entero. Valor recibido: ${idUsuario}`); // Validate user ID
    }
  
    // Execute the stored procedure
    const [result]: any = await this.pool.execute(
      `CALL ProcesarPago(?)`,
      [idUsuario]
    );
  
    console.log(`Resultado de inserción para usuario con ID ${idUsuario}:`, result);
  
    // If the procedure returns a message, use it directly
    const mensaje = result?.[0]?.[0]?.Resultado;
  
    if (mensaje) {
      return {
        mensaje, // Return the message directly
      };
    }
  
    // If no message, check affectedRows as a fallback
    if (result?.[1]?.affectedRows > 0) {
      return {
        mensaje: "Pago procesado correctamente",
        pago: result[1]
      };
    }
  
    // If no result, throw a controlled error
    throw new Error("No se pudo procesar el pago.");
  }
}