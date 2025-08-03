import PagoServiceInterface from "../../Domain/interfaces/PagoServiceInterface";
import { IPagoInfo, IRespuestaPago } from "../../Domain/Pago/interfaces/PagoInterfaces";
import NullPago from "../../Domain/Pago/NullPago";
import PagoUseCasePort from "../../Domain/Port/Driver/PagoUseCasePort";

/**
 * PagoUseCase implements the PagoUseCasePort,
 * providing methods for managing payment operations in the application.
 */
export default class PagoUseCase implements PagoUseCasePort {
  
  constructor(private readonly pagoService: PagoServiceInterface) {}

  /**
   * Retrieves payment information by payment ID.
   * 
   * @param {number} idPago - The ID of the payment to retrieve.
   * @returns {Promise<IPagoInfo[]>} - A promise that resolves to an array of payment information.
   */
  public async verPagoPorId(idPago: number): Promise<IPagoInfo[]> {
    if (!idPago || idPago <= 0) {
      return [new NullPago().toInfo()]; // Return null payment info if ID is invalid.
    }

    const pago = await this.pagoService.verPagoPorId(idPago);
    if (!pago || pago.length === 0) {
      return [new NullPago().toInfo()]; // Return null payment info if no payment found.
    }

    return pago; // Return the retrieved payment information.
  }

  /**
   * Processes a payment for a specific user.
   * 
   * @param {number} idusuario - The ID of the user making the payment.
   * @returns {Promise<IRespuestaPago>} - A promise that resolves to a response object containing payment status.
   */
  public async procesarPago(idusuario: number): Promise<IRespuestaPago> {
    if (!idusuario) {
      return new NullPago().toInfomessege(); // Return null payment message if user ID is invalid.
    }

    return await this.pagoService.procesarPago(idusuario); // Process the payment and return the response.
  }
}