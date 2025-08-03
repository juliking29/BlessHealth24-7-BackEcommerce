import AbstractCarrito from "../../../ModuloCarrito/Domain/Carrito/AbstractCarrito";
import AbstractUsuario from "../../../ModuloUsuario/Domain/Usuario/AbstractUsuario";
import { IPagoInfo, IRespuestaPago, PagoInterface } from "./interfaces/PagoInterfaces";

/**
 * AbstractPago serves as a base class for payment-related operations,
 * encapsulating common properties and methods for payment handling.
 */
export default abstract class AbstractPago {
  
  protected idPago: number; // Unique identifier for the payment
  protected totalPago: string; // Total amount paid
  protected carrito: AbstractCarrito; // The shopping cart associated with the payment
  protected estadoPago: number; // Status of the payment

  protected estadoCarrito: number; // Status of the shopping cart
  protected usuario: AbstractUsuario; // The user associated with the payment
  protected totalCarrito: string; // Total amount of the shopping cart
  protected horaCarrito: Date; // Time when the cart was created or last updated

  /**
   * Constructor for AbstractPago.
   * 
   * @param {PagoInterface} pagoInterface - An object containing payment details.
   */
  constructor(pagoInterface: PagoInterface) {
    this.idPago = pagoInterface.idPago;
    this.totalPago = pagoInterface.totalPago;
    this.carrito = pagoInterface.carrito;
    this.estadoPago = pagoInterface.estadoPago;

    this.estadoCarrito = pagoInterface.estadoCarrito;
    this.usuario = pagoInterface.usuario;
    this.totalCarrito = pagoInterface.totalCarrito || "0";
    this.horaCarrito = pagoInterface.horaCarrito ? new Date(pagoInterface.horaCarrito) : new Date();
  }

  // Abstract methods
  public abstract toString(): string; // Converts the payment information to a string representation
  public abstract isNull(): boolean; // Checks if the payment object is null

  // Validations
  protected validateId(id: number): boolean {
    return typeof id === "number" && id > 0; // Validates the payment ID
  }

  protected validateTotalPago(totalPago: string): boolean {
    return typeof totalPago === "string" && parseFloat(totalPago) >= 0; // Validates the total payment amount
  }

  protected validateEstadoPago(estado: number): boolean {
    return typeof estado === "number" && (estado === 0 || estado === 1); // Validates the payment status
  }

  // Getters
  public getIdPago(): number {
    return this.idPago; // Returns the payment ID
  }

  public getTotalPago(): string {
    return this.totalPago; // Returns the total payment amount
  }

  public getEstadoPago(): number {
    return this.estadoPago; // Returns the payment status
  }

  public getEstadoCarrito(): number {
    return this.estadoCarrito; // Returns the shopping cart status
  }

  public getTotalCarrito(): string {
    return this.totalCarrito; // Returns the total amount of the shopping cart
  }

  public getHoraCarrito(): Date {
    return this.horaCarrito; // Returns the time of the cart
  }

  // Setters with validation
  public setIdPago(idPago: number): void {
    if (this.validateId(idPago)) this.idPago = idPago; // Sets the payment ID if valid
  }

  public setTotalPago(totalPago: string): void {
    if (this.validateTotalPago(totalPago)) this.totalPago = totalPago; // Sets the total payment amount if valid
  }

  public setEstadoPago(estadoPago: number): void {
    if (this.validateEstadoPago(estadoPago)) this.estadoPago = estadoPago; // Sets the payment status if valid
  }

  public setEstadoCarrito(estadoCarrito: number): void {
    if (this.validateEstadoPago(estadoCarrito)) this.estadoCarrito = estadoCarrito; // Sets the cart status if valid
  }

  public setTotalCarrito(totalCarrito: string): void {
    if (this.validateTotalPago(totalCarrito)) this.totalCarrito = totalCarrito; // Sets the total cart amount if valid
  }

  // Business methods
  public esPagoCompletado(): boolean {
    return this.estadoPago === 1; // Checks if the payment is completed
  }

  public esPagoPendiente(): boolean {
    return this.estadoPago === 0; // Checks if the payment is pending
  }

  // Method to transform to payment information
  public toInfo(): IPagoInfo {
    return {
      idPago: this.idPago,
      totalPago: this.totalPago,
      estadoPago: this.estadoPago,
      estadoCarrito: this.estadoCarrito,
      totalCarrito: this.totalCarrito,
      horaCarrito: this.horaCarrito.toISOString(), // Converts the date to ISO string format
    };
  }

  public abstract toInfomessege(): IRespuestaPago; // Abstract method to transform to a payment response message
}