import AbstractItemCarrito from "../iItemCarrito/AbstractItemCarrito";
import AbstractCarrito from "./AbstractCarrito";
import { CarritoInterface } from "./interfaces/carritointerfaces";

/**
 * Carrito extends the AbstractCarrito class,
 * representing a shopping cart in the application.
 * It provides specific implementations for managing cart items.
 */
export default class Carrito extends AbstractCarrito {
  
  /**
   * Constructor for Carrito.
   * 
   * @param {CarritoInterface} carritoInterface - An object containing cart information.
   */
  constructor(carritoInterface: CarritoInterface) {
    super(carritoInterface);
  }

  /**
   * Checks if the cart is a null object.
   * 
   * @returns {boolean} - Always returns false, indicating this is a valid cart.
   */
  public isNull(): boolean {
    return false;
  }

  /**
   * Converts the Carrito object to a string representation.
   * 
   * @returns {string} - A string detailing the cart's properties.
   */
  public override toString(): string {
    return `Carrito: { 
      idCarrito: ${this.getId()}, 
      usuarioId: ${this.getUsuarioId()}, 
      cantidadItems: ${this.getItems().length}, 
      cantidadTotalArticulos: ${this.getCantidadTotalArticulos()}, 
      subtotal: ${this.getSubtotal().toFixed(2)}, 
      totalConIVA: ${this.getTotalConIVA().toFixed(2)}
    }`;
  }

  // Additional methods for cart management

  /**
   * Adds an item to the cart.
   * If the item already exists, increments its quantity.
   * 
   * @param {AbstractItemCarrito} item - The item to be added to the cart.
   */
  public agregarItem(item: AbstractItemCarrito): void {
    // Check if the product already exists in the cart
    const itemExistente = this.itemsCarrito.find(
      i => i.getProducto().getId() === item.getProducto().getId()
    );

    if (itemExistente) {
      // If it exists, increment the quantity
      itemExistente.setCantidad(itemExistente.getCantidad() + item.getCantidad());
    } else {
      // If it does not exist, add the new item
      this.itemsCarrito.push(item);
    }
  }

  /**
   * Removes an item from the cart by product ID.
   * 
   * @param {number} idProducto - The ID of the product to be removed.
   */
  public eliminarItem(idProducto: number): void {
    this.itemsCarrito = this.itemsCarrito.filter(
      item => item.getProducto().getId() !== idProducto
    );
  }

  /**
   * Updates the quantity of an item in the cart.
   * If the quantity is 0 or less, the item is removed from the cart.
   * 
   * @param {number} idProducto - The ID of the product to update.
   * @param {number} cantidad - The new quantity for the product.
   */
  public actualizarCantidad(idProducto: number, cantidad: number): void {
    const item = this.itemsCarrito.find(
      i => i.getProducto().getId() === idProducto
    );

    if (item) {
      if (cantidad <= 0) {
        // If the quantity is 0 or less, remove the item
        this.eliminarItem(idProducto);
      } else {
        // Update the quantity
        item.setCantidad(cantidad);
      }
    }
  }

  /**
   * Empties the cart, removing all items.
   */
  public vaciar(): void {
    this.itemsCarrito = [];
  }

  /**
   * Checks if the cart contains any products.
   * 
   * @returns {boolean} - Returns true if there are products in the cart, otherwise false.
   */
  public tieneProductos(): boolean {
    return this.itemsCarrito.length > 0;
  }

  /**
   * Checks the availability of all products in the cart.
   * 
   * @returns {boolean} - Returns true if all products are available in the requested quantities, otherwise false.
   */
  public verificarDisponibilidad(): boolean {
    // Check that all products are available in the requested quantities
    return this.itemsCarrito.every(item => 
      item.getProducto().puedeComprar(item.getCantidad())
    );
  }
}