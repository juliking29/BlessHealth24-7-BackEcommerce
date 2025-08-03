import AbstractItemFavorito from "./AbstractItemFavorito";
import { IItemFavoritoCompleto, ItemFavoritoInterface } from "./interfaces/ItemFavoritoInterface";

/**
 * ItemFavorito extends the AbstractItemFavorito class,
 * representing a favorite item in the system. It provides specific
 * implementations for the abstract methods defined in the base class.
 */
export default class ItemFavorito extends AbstractItemFavorito {
  
  /**
   * Constructor for ItemFavorito.
   * 
   * @param {ItemFavoritoInterface} itemFavoritoInterface - An object containing favorite item information.
   */
  constructor(itemFavoritoInterface: ItemFavoritoInterface) {
    super(itemFavoritoInterface);
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
   * Converts the ItemFavorito object to a string representation.
   * 
   * @returns {string} - A string detailing the favorite item's properties.
   */
  public override toString(): string {
    return `ItemFavorito: { 
      idItemFavorito: ${this.getId()}, 
      producto: {
        idProducto: ${this.getProducto().getId()}, 
        nombre: "${this.getProducto().getNombre()}",
        talla: "${this.getProducto().getTallaNombre()}",
        marca: "${this.getProducto().getMarcaNombre()}",
        precio: €${this.getProducto().getPrecio().toFixed(2)}
      }
    }`;
  }

  /**
   * Converts the ItemFavorito object to a complete format.
   * 
   * @returns {IItemFavoritoCompleto} - A complete object of the favorite item.
   */
  public override toCompleto(): IItemFavoritoCompleto {
    return {
      idProducto: this.productoItem.getId(),
      Producto: this.productoItem.getNombre(),
      Talla: this.productoItem.getTallaNombre(),
      Marca: this.productoItem.getMarcaNombre(),
      PrecioUnitario: `${this.productoItem.getPrecio().toFixed(2)}`,
    };
  }
}