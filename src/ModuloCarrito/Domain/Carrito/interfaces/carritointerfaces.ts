import { IItemCarritoCompleto } from "../../iItemCarrito/Interfaces/ItemCarritoInterfaces";

// Interfaces for the Shopping Cart

/**
 * ICarritoCompleto defines the structure for a complete shopping cart,
 * including an array of complete item details.
 */
export interface ICarritoCompleto {
  productos: IItemCarritoCompleto[]; // An array of complete item details in the cart.
}

/**
 * ITotalesCarrito defines the structure for the totals of a shopping cart,
 * including subtotal, total item count, total with VAT, and shipping message.
 */
export interface ITotalesCarrito {
  Subtotal: string;                  // The subtotal of the cart formatted as a string.
  CantidadTotalArticulos: number;    // The total number of items in the cart.
  TotalConIVA: string;               // The total amount including VAT formatted as a string.
  MensajeEnvio: string;              // The shipping message.
}

// Main interface for constructing a Shopping Cart
/**
 * CarritoInterface defines the structure for a shopping cart,
 * including the cart ID, user ID, and an array of items.
 */
export interface CarritoInterface {
  idCarrito: number;                 // The unique identifier for the shopping cart.
  usuarioId: number;                 // The ID of the user associated with the cart.
  items: any[];                      // An array of items in the cart (to be specified with the correct type in implementation).
}