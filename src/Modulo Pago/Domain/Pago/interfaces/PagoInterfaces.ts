import AbstractCarrito from "../../../../ModuloCarrito/Domain/Carrito/AbstractCarrito";
import AbstractUsuario from "../../../../ModuloUsuario/Domain/Usuario/AbstractUsuario";

/**
 * PagoInterface defines the structure for payment information,
 * including details about the payment, associated cart, and user.
 */
export interface PagoInterface {
  idPago: number; // Unique identifier for the payment
  totalPago: string; // Total amount paid
  carrito: AbstractCarrito; // The shopping cart associated with the payment
  estadoPago: number; // Status of the payment (e.g., completed, pending)

  estadoCarrito: number; // Status of the shopping cart (e.g., active, inactive)
  usuario: AbstractUsuario; // The user associated with the payment
  totalCarrito: string; // Total amount of the shopping cart
  horaCarrito: string; // Time when the cart was created or last updated
}

/**
 * IPagoInfo defines a simplified structure for payment information,
 * focusing on essential details without the associated cart and user.
 */
export interface IPagoInfo {
  idPago: number; // Unique identifier for the payment
  totalPago: string; // Total amount paid

  estadoPago: number; // Status of the payment

  estadoCarrito: number; // Status of the shopping cart

  totalCarrito: string; // Total amount of the shopping cart
  horaCarrito: string; // Time when the cart was created or last updated
}

/**
 * IRespuestaPago defines the structure for the response of a payment operation,
 * including a message and optional payment information.
 */
export interface IRespuestaPago {
  mensaje: string; // Message indicating the result of the payment operation
  pago?: IPagoInfo; // Optional payment information if available
}