import { MySQLPagoQueries } from '../../../Mysql/infrastructura/Queries/MySQLPagoQueries';
import { IPagoInfo, IRespuestaPago } from '../../Domain/Pago/interfaces/PagoInterfaces';
import NullPago from '../../Domain/Pago/NullPago';
import PagoServiceInterface from '../../Domain/interfaces/PagoServiceInterface';
import Pago from '../../Domain/Pago/Pago';

/**
 * MySQLPagoRepository implements the PagoServiceInterface,
 * providing methods for managing payment data operations in a MySQL database.
 */
export class MySQLPagoRepository implements PagoServiceInterface {
  
  constructor(private readonly pagoQueries: MySQLPagoQueries) {}

  /**
   * Retrieves payment information by payment ID.
   * 
   * @param {number} idnumber - The ID of the payment to retrieve.
   * @returns {Promise<IPagoInfo[]>} - A promise that resolves to an array of payment information.
   */
  async verPagoPorId(idnumber: number): Promise<IPagoInfo[]> {
    const rows = await this.pagoQueries.findByUsuarioId(idnumber);
    if (!rows || rows.length === 0) {
      return [new NullPago().toInfo()]; // Return null payment info if no payment found.
    }
    return rows.map((row) => new Pago(row).toInfo()); // Map rows to Pago objects and return their info.
  }
  
  /**
   * Processes a payment for a specific user.
   * 
   * @param {number} idUsuario - The ID of the user making the payment.
   * @returns {Promise<IRespuestaPago>} - A promise that resolves to a response object containing payment status.
   */
  async procesarPago(idUsuario: number): Promise<IRespuestaPago> {
    try {
      if (!Number.isInteger(idUsuario)) {
        return new NullPago().toInfomessege(); // Return null payment message if user ID is invalid.
      }
      const result = await this.pagoQueries.insertPago(idUsuario);
      const mensaje = result?.mensaje; 
      if (mensaje) {
        return {
          mensaje,
        } as IRespuestaPago; // Return the response message if payment processing is successful.
      }
      return new NullPago().toInfomessege(); // Return null payment message if no message is found.
  
    } catch (error) {
      return new NullPago().toInfomessege(); // Return null payment message in case of an error.
    }
  }
}