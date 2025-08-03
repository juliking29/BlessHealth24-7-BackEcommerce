/**
 * IPagoQueries defines the methods for interacting with payment-related operations
 * in the application, including retrieving and inserting payment records.
 */
export interface IPagoQueries {
  
  /**
   * Finds payment records associated with a specific user ID.
   * 
   * @param {number} usuarioId - The ID of the user whose payment records are to be retrieved.
   * @returns {Promise<any[]>} - A promise that resolves to an array of payment records.
   */
  findByUsuarioId(usuarioId: number): Promise<any[]>;  

  /**
   * Inserts a new payment record for a specific user.
   * 
   * @param {any} usuario_id - The ID of the user associated with the payment.
   * @returns {Promise<any>} - A promise that resolves when the payment record is inserted.
   */
  insertPago(usuario_id: any): Promise<any>;
}