import RepositoryInterface from "../../../../repository/domain/RepositoryInterface";
import { IRespuestaPago, IPagoInfo } from "../../Pago/interfaces/PagoInterfaces";

/**
 * IPagoRepository extends the RepositoryInterface,
 * defining methods for managing payment data operations.
 */
export interface IPagoRepository extends RepositoryInterface {
  
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