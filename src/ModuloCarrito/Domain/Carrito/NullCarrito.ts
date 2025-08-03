import { IItemCarritoResumen } from "../iItemCarrito/Interfaces/ItemCarritoInterfaces";
import AbstractCarrito from "./AbstractCarrito";
import { ICarritoCompleto, ITotalesCarrito } from "./interfaces/carritointerfaces";

/**
 * NullCarrito is a concrete implementation of the AbstractCarrito class,
 * representing a null object pattern for shopping carts. It provides default values
 * for the properties and overrides methods to indicate the absence of a valid cart.
 */
export default class NullCarrito extends AbstractCarrito {
  
  /**
   * Constructor for NullCarrito.
   * Initializes the cart with default "NULL" values.
   */
  constructor() {
    super({
      idCarrito: 0,
      usuarioId: 0,
      items: []
    });
  }

  /**
   * Checks if the cart is a null object.
   * 
   * @returns {boolean} - Always returns true.
   */
  public isNull(): boolean {
    return true;
  }

  /**
   * Converts the NullCarrito object to a string representation.
   * 
   * @returns {string} - Returns "NullCarrito".
   */
  public override toString(): string {
    return "NullCarrito";
  }

  // Override setters to do nothing
  public override setId = (_id: number): void => {
    return;
  };

  public override setUsuarioId = (_usuarioId: number): void => {
    return;
  };

  public override setItems = (_items: any[]): void => {
    return;
  };

  // Override getters for null values
  public override getCantidadTotalArticulos(): number {
    return 0; // Returns 0 for total item count.
  }

  public override getSubtotal(): number {
    return 0; // Returns 0 for subtotal.
  }

  public override getTotalConIVA(): number {
    return 0; // Returns 0 for total including VAT.
  }

  public override getMensajeEnvio(): string {
    return 'Envío gratis en compras mayores a $1,000'; // Default shipping message.
  }

  // Override transformation methods
  public override toResumen(): IItemCarritoResumen[] {
    return []; // Returns an empty summary for a null cart.
  }

  public override toCompleto(): ICarritoCompleto {
    return {
      productos: [] // Returns an empty complete object for a null cart.
    };
  }

  public override toTotales(): ITotalesCarrito {
    return {
      Subtotal: '$0.00', // Returns formatted subtotal for a null cart.
      CantidadTotalArticulos: 0, // Returns 0 for total item count.
      TotalConIVA: '$0.00', // Returns formatted total including VAT for a null cart.
      MensajeEnvio: 'Envío gratis en compras mayores a 60 € ' // Default shipping message.
    };
  }
}