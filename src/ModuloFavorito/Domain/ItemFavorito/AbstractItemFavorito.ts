import { IItemCarritoResumen } from "../../../ModuloCarrito/Domain/iItemCarrito/Interfaces/ItemCarritoInterfaces";
import AbstractProducto from "../../../ModuloProductos/Domain/Producto/AbstractProducto";
import { IItemFavoritoCompleto, ItemFavoritoInterface } from "./interfaces/ItemFavoritoInterface";

/**
 * AbstractItemFavorito serves as an abstract base class for favorite items.
 * It provides common properties and methods for managing favorite product items.
 */
export default abstract class AbstractItemFavorito {
  protected idItemFavorito: number;        // The unique identifier for the favorite item.
  protected productoItem: AbstractProducto; // The associated product item.

  /**
   * Constructor for AbstractItemFavorito.
   * 
   * @param {ItemFavoritoInterface} itemFavoritoInterface - An object containing favorite item information.
   */
  constructor(itemFavoritoInterface: ItemFavoritoInterface) {
    this.idItemFavorito = itemFavoritoInterface.idItemFavorito;
    this.productoItem = itemFavoritoInterface.producto;
  }

  /**
   * Abstract method to convert the favorite item to a string representation.
   * 
   * @returns {string} - A string representation of the favorite item.
   */
  public abstract toString(): string;

  /**
   * Abstract method to check if the favorite item is a null object.
   * 
   * @returns {boolean} - Returns true if the item is null, otherwise false.
   */
  public abstract isNull(): boolean;

  /**
   * Validates the item ID.
   * 
   * @param {number} itemId - The ID of the item to validate.
   * @returns {boolean} - Returns true if the ID is valid, otherwise false.
   */
  protected validateItemId(itemId: number): boolean {
    return Number.isInteger(itemId) && itemId > 0;
  }

  /**
   * Sets the ID of the favorite item.
   * 
   * @param {number} itemId - The new ID for the favorite item.
   * @throws {Error} - Throws an error if the ID is invalid.
   */
  public setIdItemFavorito(itemId: number): void {
    if (!this.validateItemId(itemId)) {
      throw new Error("ID de Item Favorito inválido");
    }
    this.idItemFavorito = itemId;
  }

  /**
   * Sets the associated product item.
   * 
   * @param {AbstractProducto} producto - The product item to associate.
   * @throws {Error} - Throws an error if the product is invalid.
   */
  public setProducto(producto: AbstractProducto): void {
    if (!(producto instanceof AbstractProducto)) {
      throw new Error("Producto inválido");
    }
    this.productoItem = producto;
  }

  // Getters

  /**
   * Gets the ID of the favorite item.
   * 
   * @returns {number} - The ID of the favorite item.
   */
  public getId(): number {
    return this.idItemFavorito;
  }

  /**
   * Gets the associated product item.
   * 
   * @returns {AbstractProducto} - The associated product item.
   */
  public getProducto(): AbstractProducto {
    return this.productoItem;
  }

  /**
   * Gets the ID of the associated product.
   * 
   * @returns {number} - The ID of the associated product.
   */
  public getProductoId(): number {
    return this.productoItem.getId();
  }

  /**
   * Converts the favorite item to a summary format for the shopping cart.
   * 
   * @returns {IItemCarritoResumen} - A summary object of the favorite item.
   * @throws {Error} - Throws an error if the product is not defined.
   */
  public toResumen(): IItemCarritoResumen {
    if (this.productoItem) {
      return {
        idProducto: this.productoItem.getId(),
        nombreProducto: this.productoItem.getNombre(),
        tallaProducto: this.productoItem.getTallaNombre(),
        precioProducto: `$${this.productoItem.getPrecio().toFixed(2)}`, // Convert to string
        stockProducto: this.productoItem.getStock(),
        imgProducto: this.productoItem.getImagen() || null,
      };
    }
    throw new Error("Producto no definido");
  }

  /**
   * Converts the favorite item to a complete format.
   * 
   * @returns {IItemFavoritoCompleto} - A complete object of the favorite item.
   */
  public toCompleto(): IItemFavoritoCompleto {
    return {
      idProducto: this.productoItem.getId(),
      Producto: this.productoItem.getNombre(),
      Talla: this.productoItem.getTallaNombre(),
      Marca: this.productoItem.getMarcaNombre(),
      PrecioUnitario: `€${this.productoItem.getPrecio().toFixed(2)}`,
    };
  }
}