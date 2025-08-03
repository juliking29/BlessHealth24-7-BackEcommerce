import NullProducto from "../../../ModuloProductos/Domain/Producto/NullProducto";
import AbstractItemFavorito from "./AbstractItemFavorito";
import { IItemFavoritoCompleto, IItemFavoritoResumen } from "./interfaces/ItemFavoritoInterface";

/**
 * NullItemFavorito is a concrete implementation of the AbstractItemFavorito class,
 * representing a null object pattern for favorite items. It provides default values
 * for the properties and overrides methods to indicate the absence of a valid favorite item.
 */
export default class NullItemFavorito extends AbstractItemFavorito {
  
  /**
   * Constructor for NullItemFavorito.
   * Initializes the favorite item with default "NULL" values.
   */
  constructor() {
    super({
      idItemFavorito: 0,
      producto: new NullProducto(),
    });
  }

  /**
   * Checks if the favorite item is a null object.
   * 
   * @returns {boolean} - Always returns true.
   */
  public override isNull(): boolean {
    return true;
  }

  /**
   * Converts the NullItemFavorito object to a string representation.
   * 
   * @returns {string} - Returns "NullItemFavorito".
   */
  public override toString(): string {
    return "NullItemFavorito";
  }

  // Override setters to do nothing
  public override setIdItemFavorito(_itemId: number): void {}

  public override setProducto(_producto: NullProducto): void {}

  /**
   * Converts the NullItemFavorito object to a summary format.
   * 
   * @returns {IItemFavoritoResumen} - A summary object of the favorite item with default values.
   */
  public override toResumen(): IItemFavoritoResumen {
    return {
      idProducto: 0,
      nombreProducto: "NULL",
      tallaProducto: "NULL",
      precioProducto: "",
      stockProducto: 0,
      imgProducto: null,
      nombreCategoria: "NULL",
    };
  }

  /**
   * Converts the NullItemFavorito object to a complete format.
   * 
   * @returns {IItemFavoritoCompleto} - A complete object of the favorite item with default values.
   */
  public override toCompleto(): IItemFavoritoCompleto {
    return {
      idProducto: 0,
      Producto: "NULL",
      Talla: "NULL",
      Marca: "NULL",
      PrecioUnitario: "$0.00",
    };
  }
}