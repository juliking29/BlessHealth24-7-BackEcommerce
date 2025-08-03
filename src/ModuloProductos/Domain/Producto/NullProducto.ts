import AbstractProducto from "./AbstractProducto";
import { IProductoDetalle, IProductoFavorito, IProductoVitrina } from "./interfaces/productoIntefaces";

/**
 * NullProducto is a concrete implementation of the AbstractProducto class,
 * representing a null object pattern for products. It provides default values
 * for the properties and overrides methods to indicate the absence of a valid product.
 */
export default class NullProducto extends AbstractProducto {
  
  /**
   * Constructor for NullProducto.
   * Initializes the product with default "NULL" values.
   */
  constructor() {
    super({
      idProducto: 0,
      nombreProducto: "NULL",
      descripcionProducto: "NULL",
      precioProducto: 0,
      stockProducto: 0,
      imagenProducto: null,
      categoriaId: 0,
      enPromocion: false,
      categoriaNombre: "NULL",
      marcaNombre: "NULL",
      tallaNombre: "NULL"
    });
  }

  /**
   * Checks if the product is a null object.
   * 
   * @returns {boolean} - Always returns true.
   */
  public override isNull(): boolean {
    return true;
  }

  /**
   * Converts the NullProducto object to a string representation.
   * 
   * @returns {string} - Returns "NullProducto".
   */
  public override toString(): string {
    return "NullProducto";
  }

  // Override setters to do nothing
  public override setId = (_id: number): void => {};
  public override setNombre = (_nombre: string): void => {};
  public override setDescripcion = (_descripcion: string): void => {};
  public override setPrecio = (_precio: number): void => {};
  public override setStock = (_stock: number): void => {};
  public override setImagen = (_imagen: string | null): void => {};
  public override setCategoriaId = (_categoriaId: number): void => {};
  public override setEnPromocion = (_enPromocion: boolean): void => {};
  public override setCategoriaNombre = (_categoriaNombre: string): void => {};
  public override setMarcaNombre = (_marcaNombre: string): void => {};
  public override setTallaNombre = (_tallaNombre: string): void => {};

  // Override business methods to return default values
  public override estaDisponible(): boolean {
    return false; // A null product is never available.
  }

  public override puedeComprar(_cantidad: number): boolean {
    return false; // A null product cannot be purchased.
  }

  // Override transformation methods to return default objects
  public override toVitrina(): IProductoVitrina {
    return {
      idProducto: 0,
      nombreProducto: "NULL",
      tallaProducto: "NULL",
      precioProducto: `$0.00`,
      stockProducto: 0,
      imgProducto: null,
      nombreCategoria: "NULL",
      enPromocion: "No"
    };
  }

  public override toDetalle(): IProductoDetalle {
    return {
      idProducto: 0,
      nombreProducto: "NULL",
      descripcionProducto: "NULL",
      precioProducto: `$0.00`,
      imgProducto: "",
      stockProducto: 0,
      promocion: "Sin promoción"
    };
  }

  public override toFavorito(): IProductoFavorito {
    return {
      idProducto: 0,
      nombreProducto: "NULL",
      tallaProducto: "NULL",
      precioProducto: `$0.00`,
      stockProducto: 0,
      imgProducto: null,
      nombreCategoria: "NULL"
    };
  }
}
