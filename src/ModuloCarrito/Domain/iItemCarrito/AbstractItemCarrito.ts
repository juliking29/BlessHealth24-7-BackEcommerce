import AbstractProducto from "../../../ModuloProductos/Domain/Producto/AbstractProducto";
import { IItemCarritoCompleto, IItemCarritoResumen, ItemCarritoInterface } from "./Interfaces/ItemCarritoInterfaces";

/**
 * AbstractItemCarrito serves as an abstract base class for items in the shopping cart.
 * It provides common properties and methods for managing cart item details.
 */
export default abstract class AbstractItemCarrito {
  protected idItemCarrito: number;        // The unique identifier for the cart item.
  protected usuarioId: number;            // The ID of the user associated with the cart item.
  protected productoItem: AbstractProducto; // The associated product item.
  protected cantidadItem: number;         // The quantity of the product in the cart.

  /**
   * Constructor for AbstractItemCarrito.
   * 
   * @param {ItemCarritoInterface} itemCarritoInterface - An object containing cart item information.
   */
  constructor(itemCarritoInterface: ItemCarritoInterface) {
    this.idItemCarrito = itemCarritoInterface.idItemCarrito;
    this.usuarioId = itemCarritoInterface.usuarioId;
    this.productoItem = itemCarritoInterface.producto;
    this.cantidadItem = itemCarritoInterface.cantidad;
  }

  // Abstract methods
  public abstract toString(): string; // Converts the cart item to a string representation.
  public abstract isNull(): boolean;   // Checks if the cart item is a null object.

  // Validations
  protected validateId(id: number): boolean {
    return typeof id === "number" && id > 0; // Validates that the ID is a positive number.
  }

  protected validateUsuarioId(usuarioId: number): boolean {
    return typeof usuarioId === "number" && usuarioId > 0; // Validates that the user ID is a positive number.
  }

  protected validateCantidad(cantidad: number): boolean {
    return typeof cantidad === "number" && cantidad > 0; // Validates that the quantity is a positive number.
  }

  // Getters
  public getId(): number {
    return this.idItemCarrito; // Returns the cart item ID.
  }

  public getUsuarioId(): number {
    return this.usuarioId; // Returns the user ID associated with the cart item.
  }

  public getProducto(): AbstractProducto {
    return this.productoItem; // Returns the associated product item.
  }

  public getCantidad(): number {
    return this.cantidadItem; // Returns the quantity of the product in the cart.
  }

  public getSubtotal(): number {
    return this.productoItem.getPrecio() * this.cantidadItem; // Returns the subtotal for the cart item.
  }

  // Setters with validation
  public setId(id: number): void {
    if (this.validateId(id)) this.idItemCarrito = id; // Sets the cart item ID if valid.
  }

  public setUsuarioId(usuarioId: number): void {
    if (this.validateUsuarioId(usuarioId)) this.usuarioId = usuarioId; // Sets the user ID if valid.
  }

  public setProducto(producto: AbstractProducto): void {
    this.productoItem = producto; // Sets the associated product item.
  }

  public setCantidad(cantidad: number): void {
    if (this.validateCantidad(cantidad)) this.cantidadItem = cantidad; // Sets the quantity if valid.
  }

  // Methods to transform to different views
  public toResumen(): IItemCarritoResumen {
    if (this.productoItem) {
      return {
        idProducto: this.productoItem.getId(),
        nombreProducto: this.productoItem.getNombre(),
        tallaProducto: this.productoItem.getTallaNombre(),
        precioProducto: `${this.productoItem.getPrecio().toFixed(2)}`, // Converts to string
        stockProducto: this.productoItem.getStock(),
        imgProducto: this.productoItem.getImagen() || null,
      };
    }
    throw new Error("Producto no definido"); // Throws an error if the product is not defined.
  }

  public toCompleto(): IItemCarritoCompleto {
    return {
      idProducto: this.productoItem.getId(),
      Producto: this.productoItem.getNombre(),
      Talla: this.productoItem.getTallaNombre(),
      Marca: this.productoItem.getMarcaNombre(),
      Cantidad: this.cantidadItem,
      PrecioUnitario: `€${this.productoItem.getPrecio().toFixed(2)}`,
      Subtotal: `€${this.getSubtotal().toFixed(2)}`,
    };
  }

  // Method to access the product ID directly
  public getProductoId(): number {
    // Check if the method getId exists and use it
    if (this.productoItem && typeof this.productoItem.getId === 'function') {
      return this.productoItem.getId();
    }
    
    // Attempt to access the id property directly if it exists
    if (this.productoItem && 'id' in this.productoItem) {
      return (this.productoItem as any).id;
    } 
    
    // Attempt to access idProducto as a last resort
    if (this.productoItem && 'idProducto' in this.productoItem) {
      return (this.productoItem as any).idProducto;
    }
    
    // If the ID cannot be obtained, return a default value (0 or -1)
    return 0; // Or you can use -1 to indicate no valid ID
  }
}