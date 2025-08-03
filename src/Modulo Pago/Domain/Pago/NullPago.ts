import NullCarrito from '../../../ModuloCarrito/Domain/Carrito/NullCarrito';
import NullUsuario from '../../../ModuloUsuario/Domain/Usuario/NullUsuario';
import AbstractPago from './AbstractPago';
import { IRespuestaPago, IPagoInfo } from './interfaces/PagoInterfaces';

/**
 * NullPago represents a null object for payment,
 * implementing the Null Object pattern to avoid null references.
 */
export default class NullPago extends AbstractPago {
  
  /**
   * Constructor for NullPago.
   * Initializes the payment with default null values.
   */
  constructor() {
    super({
      idPago: 0,
      totalPago: "0", 
      carrito: new NullCarrito(),
      estadoPago: 0,
      estadoCarrito: 0, 
      usuario: new NullUsuario(),
      totalCarrito: "0",
      horaCarrito: new Date(0).toISOString(),
    });
  }

  /**
   * Checks if the payment object is a null object.
   * 
   * @returns {boolean} - Always returns true for NullPago.
   */
  public isNull(): boolean {
    return true;
  }

  /**
   * Converts the NullPago object to a string representation.
   * 
   * @returns {string} - The string "NullPago".
   */
  public override toString(): string {
    return 'NullPago';
  }

  // Override setters to do nothing
  public override setIdPago(_idPago: number): void {
    // Do nothing
  }

  // Override business methods
  public override esPagoCompletado(): boolean {
    return false; // Always returns false for NullPago
  }

  public override esPagoPendiente(): boolean {
    return false; // Always returns false for NullPago
  }

  // Override transformation method
  public override toInfo(): IPagoInfo {
    return {
      idPago: 0,
      totalPago: "0",
      estadoPago: 0,
      estadoCarrito: 0,
      totalCarrito: "0",
      horaCarrito: this.horaCarrito.toISOString(),
    };
  }

  /**
   * Transforms the NullPago object into a payment response message.
   * 
   * @returns {IRespuestaPago} - An object containing a message indicating no payment information was found.
   */
  public override toInfomessege(): IRespuestaPago {
    return {
      mensaje: 'No se encontró información del pago.',
    };
  }
}