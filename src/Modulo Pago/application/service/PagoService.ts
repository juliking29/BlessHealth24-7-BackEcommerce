import PagoServiceInterface from "../../Domain/interfaces/PagoServiceInterface";
import { IPagoInfo, IRespuestaPago } from "../../Domain/Pago/interfaces/PagoInterfaces";
import { IPagoRepository } from "../../Domain/Port/Driven/IUsuarioRepository";

/**
 * PagoService implements the PagoServiceInterface,
 * providing methods for managing payment operations in the service layer.
 */
export default class PagoService implements PagoServiceInterface {
  
  constructor(private readonly pagoRepository: IPagoRepository) {}

  /**
   * Retrieves payment information by payment ID.
   * 
   * @param {number} idPago - The ID of the payment to retrieve.
   * @returns {Promise<IPagoInfo[]>} - A promise that resolves to an array of payment information.
   */
  async verPagoPorId(idPago: number): Promise<IPagoInfo[]> {
    return await this.pagoRepository.verPagoPorId(idPago); // Retrieve payment information from the repository.
  }

  /**
   * Processes a payment for a specific user.
   * 
   * @param {number} usuarioId - The ID of the user making the payment.
   * @returns {Promise<IRespuestaPago>} - A promise that resolves to a response object containing payment status.
   */
  async procesarPago(usuarioId: number): Promise<IRespuestaPago> {
    return await this.pagoRepository.procesarPago(usuarioId); // Process the payment through the repository.
  }
}