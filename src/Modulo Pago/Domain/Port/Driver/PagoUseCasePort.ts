import { IRespuestaPago, IPagoInfo } from "../../Pago/interfaces/PagoInterfaces";

/**
 * PagoUseCasePort defines the methods for managing payment operations
 * in the use case layer of the application.
 */
export default interface PagoUseCasePort {
  
  /**
   * Retrieves payment information by payment ID.
   * 
   * @param {number} idPago - The ID of the payment to retrieve.
   * @returns {Promise<IPagoInfo[]>} - A promise that resolves to an array of payment information.
   */
  verPagoPorId(idPago: number): Promise<IPagoInfo[]>;

  /**
   * Processes a payment for a specific user.
   * 
   * @param {number} idusuario - The ID of the user making the payment.
   * @returns {Promise<IRespuestaPago>} - A promise that resolves to a response object containing payment status.
   */
  procesarPago(idusuario: number): Promise<IRespuestaPago>;
}