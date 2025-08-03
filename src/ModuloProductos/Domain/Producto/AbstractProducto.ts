import { IProductoDetalle, IProductoFavorito, IProductoVitrina, ProductoInterface } from "./interfaces/productoIntefaces";

/**
 * AbstractProducto is an abstract class that serves as a base for product entities.
 * It provides common properties and methods for managing product information,
 * including validation and transformation to different views.
 */
export default abstract class AbstractProducto {
  protected idProducto: number;                // The unique identifier for the product.
  protected nombreProducto: string;            // The name of the product.
  protected descripcionProducto: string;       // The description of the product.
  protected precioProducto: number;            // The price of the product.
  protected stockProducto: number;             // The stock quantity of the product.
  protected imagenProducto: string | null;     // The image URL of the product.
  protected categoriaId: number;               // The ID of the product's category.
  protected enPromocion: boolean;              // Indicates if the product is on promotion.
  protected categoriaNombre: string;           // The name of the product's category.
  protected marcaNombre: string;               // The name of the product's brand.
  protected tallaNombre: string;               // The size of the product.

  /**
   * Constructor for AbstractProducto.
   * 
   * @param {ProductoInterface} productoInterface - An object containing product information.
   */
  constructor(productoInterface: ProductoInterface) {
    this.idProducto = productoInterface.idProducto;
    this.nombreProducto = productoInterface.nombreProducto;
    this.descripcionProducto = productoInterface.descripcionProducto;
    this.precioProducto = Number(productoInterface.precioProducto) || 0; // Ensure number
    this.stockProducto = productoInterface.stockProducto;
    this.imagenProducto = productoInterface.imagenProducto || null;
    this.categoriaId = productoInterface.categoriaId;
    this.enPromocion = productoInterface.enPromocion;
    this.categoriaNombre = productoInterface.categoriaNombre;
    this.marcaNombre = productoInterface.marcaNombre;
    this.tallaNombre = productoInterface.tallaNombre;
  }

  // Abstract methods
  public abstract toString(): string; // Converts the product object to a string representation.
  public abstract isNull(): boolean;   // Checks if the product object is null.

  // Validations
  protected validateId(id: number): boolean {
    return Number.isInteger(id) && id > 0;
  }

  protected validateNombre(nombre: string): boolean {
    return typeof nombre === "string" && nombre.trim().length > 0;
  }

  protected validatePrecio(precio: number): boolean {
    return typeof precio === "number" && !isNaN(precio) && precio >= 0;
  }

  protected validateStock(stock: number): boolean {
    return Number.isInteger(stock) && stock >= 0;
  }

  // Getters
  public getId(): number { return this.idProducto; }
  public getNombre(): string { return this.nombreProducto; }
  public getDescripcion(): string { return this.descripcionProducto; }
  public getPrecio(): number { return this.precioProducto; }
  public getStock(): number { return this.stockProducto; }
  public getImagen(): string | null { return this.imagenProducto; }
  public getCategoriaId(): number { return this.categoriaId; }
  public getEnPromocion(): boolean { return this.enPromocion; }
  public getCategoriaNombre(): string { return this.categoriaNombre; }
  public getMarcaNombre(): string { return this.marcaNombre; }
  public getTallaNombre(): string { return this.tallaNombre; }

  // Setters with validation
  public setId(id: number): void { if (this.validateId(id)) this.idProducto = id; }
  public setNombre(nombre: string): void { if (this.validateNombre(nombre)) this.nombreProducto = nombre.trim(); }
  public setDescripcion(descripcion: string): void { this.descripcionProducto = descripcion; }
  public setPrecio(precio: number): void { if (this.validatePrecio(precio)) this.precioProducto = precio; }
  public setStock(stock: number): void { if (this.validateStock(stock)) this.stockProducto = stock; }
  public setImagen(imagen: string | null): void { this.imagenProducto = imagen; }
  public setCategoriaId(categoriaId: number): void { if (this.validateId(categoriaId)) this.categoriaId = categoriaId; }
  public setEnPromocion(enPromocion: boolean): void { this.enPromocion = enPromocion; }
  public setCategoriaNombre(categoriaNombre: string): void { this.categoriaNombre = categoriaNombre; }
  public setMarcaNombre(marcaNombre: string): void { this.marcaNombre = marcaNombre; }
  public setTallaNombre(tallaNombre: string): void { this.tallaNombre = tallaNombre; }

  // Business methods
  public estaDisponible(): boolean { return this.stockProducto > 0; } // Checks if the product is available.
  public puedeComprar(cantidad: number): boolean { return this.stockProducto >= cantidad; } // Checks if the specified quantity can be purchased.

  // Methods to transform to different views
  public toVitrina(): IProductoVitrina {
    return {
      idProducto: this.idProducto,
      nombreProducto: this.nombreProducto,
      tallaProducto: this.tallaNombre,
      precioProducto: `$${this.precioProducto.toFixed(2)}`,
      stockProducto: this.stockProducto,
      imgProducto: this.imagenProducto,
      nombreCategoria: this.categoriaNombre,
      enPromocion: this.enPromocion ? 'Sí' : 'No'
    };
  }

  public toDetalle(): IProductoDetalle {
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

  public toFavorito(): IProductoFavorito {
    return {
      idProducto: this.idProducto,
      nombreProducto: this.nombreProducto,
      tallaProducto: this.tallaNombre,
      precioProducto: `$${this.precioProducto.toFixed(2)}`,
      stockProducto: this.stockProducto,
      imgProducto: this.imagenProducto,
      nombreCategoria: this.categoriaNombre
    };
  }
}