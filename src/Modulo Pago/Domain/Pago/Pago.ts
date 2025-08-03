import AbstractPago from "./AbstractPago";
import { IRespuestaPago, PagoInterface } from "./interfaces/PagoInterfaces";

/**
 * Pago represents a payment object, extending the AbstractPago class
 * and providing specific implementations for payment-related operations.
 */
export default class Pago extends AbstractPago {
  
  /**
   * Constructor for Pago.
   * 
   * @param {PagoInterface} pagoInterface - An object containing payment details.
   */
  constructor(pagoInterface: PagoInterface) {
    super(pagoInterface);
  }

  /**
   * Checks if the payment object is a null object.
   * 
   * @returns {boolean} - Always returns false for Pago.
   */
  public isNull(): boolean {
    return false;
  }

  /**
   * Transforms the Pago object into a payment response message.
   * 
   * @returns {IRespuestaPago} - An object containing a message about the payment status.
   */
  public override toInfomessege(): IRespuestaPago {
    return {
      mensaje: `Pago registrado con éxito: ID ${this.getIdPago()}, Monto $${this.getTotalCarrito()}, Estado: ${this.getEstadoPago() === 1 ? 'Completado' : 'Pendiente'}`,
    };
  }

  /**
   * Converts the Pago object to a string representation.
   * 
   * @returns {string} - A string detailing the payment information.
   */
  public toString(): string {
    return `Pago { 
      ID: ${this.getIdPago()}, 
      Total: $${this.getTotalPago()}, 
      Estado: ${this.getEstadoPago() === 1 ? 'Completado' : 'Pendiente'}, 
      Total Carrito: $${this.getTotalCarrito()}, 
      Hora: ${this.getHoraCarrito().toISOString()} 
    }`;
  }
}