import AbstractProducto from './AbstractProducto';
import { IProductoDetalle, IProductoVitrina, ProductoInterface } from './interfaces/productoIntefaces';

/**
 * Producto is a concrete implementation of the AbstractProducto class,
 * representing a product entity in the system. It provides specific
 * implementations for the abstract methods defined in the base class.
 */
export default class Producto extends AbstractProducto {
  
  /**
   * Constructor for Producto.
   * 
   * @param {ProductoInterface} productoInterface - An object containing product information.
   */
  constructor(productoInterface: ProductoInterface) {
    super(productoInterface);
  }

  /**
   * Checks if the product is a null object.
   * 
   * @returns {boolean} - Always returns false, indicating this is a valid product.
   */
  public isNull(): boolean {
    return false;
  }

  /**
   * Converts the Producto object to a string representation.
   * 
   * @returns {string} - A string detailing the product's properties.
   */
  public override toString(): string {
    return `Producto: { 
      idProducto: ${this.getId()}, 
      nombreProducto: "${this.getNombre()}", 
      precioProducto: $${this.getPrecio().toFixed(2)},
      stockProducto: ${this.getStock()},
      categoría: "${this.getCategoriaNombre()}",
      talla: "${this.getTallaNombre()}",
      marca: "${this.getMarcaNombre()}"
    }`;
  }

  // Methods to transform to different views
  public override toVitrina(): IProductoVitrina {
    return {
      idProducto: this.idProducto,
      nombreProducto: this.nombreProducto,
      tallaProducto: this.tallaNombre,
      precioProducto: `$${this.precioProducto.toFixed(2)}`,
      stockProducto: this.stockProducto,
      imgProducto: this.imagenProducto,
      nombreCategoria: this.categoriaNombre,
      enPromocion: this.enPromocion ? 'Tiene promoción' : 'No tiene promoción'
    };
  }
  

  public override toDetalle(): IProductoDetalle {
    return {
      idProducto: this.idProducto,
      nombreProducto: this.nombreProducto,
      descripcionProducto: this.descripcionProducto,
      precioProducto: `$${this.precioProducto.toFixed(2)}`,
      imgProducto: this.imagenProducto || '',
      stockProducto: this.stockProducto,
      promocion: this.enPromocion ? 'En promoción' : 'Sin promoción'
    };
  }

  // Business methods
  public override estaDisponible(): boolean {
    return this.stockProducto > 0; // Checks if the product is available.
  }

  public override puedeComprar(cantidad: number): boolean {
    return this.stockProducto >= cantidad; // Checks if the specified quantity can be purchased.
  }
}