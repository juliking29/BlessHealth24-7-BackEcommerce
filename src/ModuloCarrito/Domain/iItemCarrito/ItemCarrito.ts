import AbstractItemCarrito from "./AbstractItemCarrito";
import { ItemCarritoInterface } from "./Interfaces/ItemCarritoInterfaces";

/**
 * ItemCarrito extends the AbstractItemCarrito class,
 * representing an item in the shopping cart. It provides specific
 * implementations for managing cart item details and quantities.
 */
export default class ItemCarrito extends AbstractItemCarrito {
  
  /**
   * Constructor for ItemCarrito.
   * 
   * @param {ItemCarritoInterface} itemCarritoInterface - An object containing item cart information.
   */
  constructor(itemCarritoInterface: ItemCarritoInterface) {
    super(itemCarritoInterface);
  }

  /**
   * Checks if the item is a null object.
   * 
   * @returns {boolean} - Always returns false, indicating this is a valid item.
   */
  public isNull(): boolean {
    return false;
  }

  /**
   * Converts the ItemCarrito object to a string representation.
   * 
   * @returns {string} - A string detailing the item's properties.
   */
  public override toString(): string {
    return `ItemCarrito: { 
      idItemCarrito: ${this.getId()}, 
      usuarioId: ${this.getUsuarioId()}, 
      producto: "${this.getProducto().getNombre()}", 
      cantidad: ${this.getCantidad()}, 
      subtotal: $${this.getSubtotal().toFixed(2)}
    }`;
  }

  // Additional method to increment the quantity
  /**
   * Increments the quantity of the item by a specified amount.
   * 
   * @param {number} cantidad - The amount to increment the quantity by (default is 1).
   */
  public incrementarCantidad(cantidad: number = 1): void {
    if (cantidad > 0) {
      this.setCantidad(this.getCantidad() + cantidad); // Increases the quantity.
    }
  }

  // Additional method to decrement the quantity
  /**
   * Decrements the quantity of the item by a specified amount.
   * If the quantity to decrement is greater than or equal to the current quantity, sets it to 0.
   * 
   * @param {number} cantidad - The amount to decrement the quantity by (default is 1).
   */
  public decrementarCantidad(cantidad: number = 1): void {
    if (cantidad > 0 && this.getCantidad() > cantidad) {
      this.setCantidad(this.getCantidad() - cantidad); // Decreases the quantity.
    } else if (cantidad > 0 && this.getCantidad() <= cantidad) {
      this.setCantidad(0); // Sets quantity to 0 if decrementing exceeds current quantity.
    }
  }

  // Method to check if the product can be purchased in the current quantity
  /**
   * Checks if the product can be purchased in the current quantity.
   * 
   * @returns {boolean} - Returns true if the product can be purchased, otherwise false.
   */
  public puedeComprar(): boolean {
    return this.getProducto().puedeComprar(this.getCantidad()); // Checks product availability.
  }
}