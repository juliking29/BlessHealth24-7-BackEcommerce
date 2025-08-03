import AbstractItemCarrito from "../iItemCarrito/AbstractItemCarrito";
import { IItemCarritoResumen } from "../iItemCarrito/Interfaces/ItemCarritoInterfaces";
import { CarritoInterface, ICarritoCompleto, ITotalesCarrito } from "./interfaces/carritointerfaces";

/**
 * AbstractCarrito serves as an abstract base class for shopping carts.
 * It provides common properties and methods for managing a shopping cart's items.
 */
export default abstract class AbstractCarrito {
  protected idCarrito: number;                // The unique identifier for the shopping cart.
  protected usuarioId: number;                // The ID of the user associated with the cart.
  protected itemsCarrito: AbstractItemCarrito[]; // The list of items in the shopping cart.

  /**
   * Constructor for AbstractCarrito.
   * 
   * @param {CarritoInterface} carritoInterface - An object containing cart information.
   */
  constructor(carritoInterface: CarritoInterface) {
    this.idCarrito = carritoInterface.idCarrito;
    this.usuarioId = carritoInterface.usuarioId;
    this.itemsCarrito = carritoInterface.items || [];
  }

  // Abstract methods
  public abstract toString(): string; // Converts the cart to a string representation.
  public abstract isNull(): boolean;   // Checks if the cart is a null object.

  // Validations
  protected validateId(id: number): boolean {
    return typeof id === "number" && id > 0; // Validates that the ID is a positive number.
  }

  protected validateUsuarioId(usuarioId: number): boolean {
    return typeof usuarioId === "number" && usuarioId > 0; // Validates that the user ID is a positive number.
  }

  // Getters
  public getId(): number {
    return this.idCarrito; // Returns the cart ID.
  }

  public getUsuarioId(): number {
    return this.usuarioId; // Returns the user ID associated with the cart.
  }

  public getItems(): AbstractItemCarrito[] {
    return [...this.itemsCarrito]; // Returns a copy of the items in the cart.
  }

  public getCantidadTotalArticulos(): number {
    return this.itemsCarrito.reduce((total, item) => total + item.getCantidad(), 0); // Returns the total quantity of items.
  }

  public getSubtotal(): number {
    return this.itemsCarrito.reduce((total, item) => total + item.getSubtotal(), 0); // Returns the subtotal of the cart.
  }

  public getTotalConIVA(): number {
    return this.getSubtotal() * 1.21; // Returns the total including VAT.
  }

  public getMensajeEnvio(): string {
    const minimoEnvioGratis = 45; // Minimum amount for free shipping.
    const subtotal = this.getSubtotal();
  
    if (subtotal >= minimoEnvioGratis) {
      return 'Envío gratis'; // Free shipping message.
    } else {
      const falta = (minimoEnvioGratis - subtotal).toFixed(2);
      return `Te faltan ${falta}€ para obtener envío gratis`; // Message indicating how much more is needed for free shipping.
    }
  }

  // Setters with validation
  public setId(id: number): void {
    if (this.validateId(id)) this.idCarrito = id; // Sets the cart ID if valid.
  }

  public setUsuarioId(usuarioId: number): void {
    if (this.validateUsuarioId(usuarioId)) this.usuarioId = usuarioId; // Sets the user ID if valid.
  }

  public setItems(items: AbstractItemCarrito[]): void {
    this.itemsCarrito = items; // Sets the items in the cart.
  }

  // Methods to transform to different views
  public toResumen(): IItemCarritoResumen[] {
    return this.itemsCarrito.map(item => item.toResumen()); // Converts each item to its summary version.
  }

  public toCompleto(): ICarritoCompleto {
    return {
      productos: this.itemsCarrito.map(item => item.toCompleto()) // Converts each item to its complete version.
    };
  }

  public toTotales(): ITotalesCarrito {
    return {
      Subtotal: `$${this.getSubtotal().toFixed(2)}`, // Returns the subtotal formatted as a string.
      CantidadTotalArticulos: this.getCantidadTotalArticulos(), // Returns the total quantity of items.
      TotalConIVA: `$${this.getTotalConIVA().toFixed(2)}`, // Returns the total including VAT formatted as a string.
      MensajeEnvio: this.getMensajeEnvio() // Returns the shipping message.
    };
  }
}