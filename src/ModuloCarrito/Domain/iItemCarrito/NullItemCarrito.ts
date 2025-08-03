import NullProducto from "../../../ModuloProductos/Domain/Producto/NullProducto";
import AbstractItemCarrito from "./AbstractItemCarrito";
import { IItemCarritoCompleto, IItemCarritoResumen } from "./Interfaces/ItemCarritoInterfaces";

/**
 * NullItemCarrito is a concrete implementation of the AbstractItemCarrito class,
 * representing a null object pattern for cart items. It provides default values
 * for the properties and overrides methods to indicate the absence of a valid cart item.
 */
export default class NullItemCarrito extends AbstractItemCarrito {
  
  /**
   * Constructor for NullItemCarrito.
   * Initializes the cart item with default "NULL" values.
   */
  constructor() {
    super({
      idItemCarrito: 0,
      usuarioId: 0,
      producto: new NullProducto(),
      cantidad: 0
    });
  }

  /**
   * Checks if the cart item is a null object.
   * 
   * @returns {boolean} - Always returns true.
   */
  public isNull(): boolean {
    return true;
  }

  /**
   * Converts the NullItemCarrito object to a string representation.
   * 
   * @returns {string} - Returns "NullItemCarrito".
   */
  public override toString(): string {
    return "NullItemCarrito";
  }

  // Override setters to do nothing
  public override setId = (_id: number): void => {
    return;
  };

  public override setUsuarioId = (_usuarioId: number): void => {
    return;
  };

  public override setProducto = (_producto: any): void => {
    return;
  };

  public override setCantidad = (_cantidad: number): void => {
    return;
  };

  /**
   * Converts the NullItemCarrito object to a complete format.
   * 
   * @returns {IItemCarritoCompleto} - A complete object of the cart item with default values.
   */
  public override toCompleto(): IItemCarritoCompleto {
    return {
      idProducto: 0,
      Producto: "NULL",
      Talla: "NULL",
      Marca: "NULL",
      Cantidad: 0,
      PrecioUnitario: "$0.00",
      Subtotal: "$0.00"
    };
  }

  /**
   * Converts the NullItemCarrito object to a summary format.
   * 
   * @returns {IItemCarritoResumen} - A summary object of the cart item with default values.
   */
  public override toResumen(): IItemCarritoResumen {
    return {
      idProducto: -999,
      nombreProducto: "Producto no disponible",
      tallaProducto: "",
      precioProducto: "0.00",
      stockProducto: 0,
      imgProducto: " ",
    };
  }
}