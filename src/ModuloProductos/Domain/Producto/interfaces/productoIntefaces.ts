// Interfaces for different views of the product

/**
 * IProductoVitrina
 * 
 * This interface defines the structure for a product displayed in a showcase view.
 */
export interface IProductoVitrina {
  idProducto: number;                // The unique identifier for the product.
  nombreProducto: string;            // The name of the product.
  tallaProducto: string;             // The size of the product.
  precioProducto: string;            // The price of the product formatted as a string.
  stockProducto: number;             // The available stock quantity of the product.
  imgProducto: string | null;        // The image URL of the product, or null if not available.
  nombreCategoria: string;           // The name of the product's category.
  enPromocion?: string;              // Indicates if the product is on promotion (optional).
}

/**
* IProductoDetalle
* 
* This interface defines the structure for a detailed view of a product.
*/
export interface IProductoDetalle {
  idProducto: number;                // The unique identifier for the product.
  nombreProducto: string;            // The name of the product.
  descripcionProducto: string;       // The description of the product.
  precioProducto: string;            // The price of the product formatted as a string.
  imgProducto: string;                // The image URL of the product.
  stockProducto: number;             // The available stock quantity of the product.
  promocion: string;                 // Indicates if the product is on promotion.
}

/**
* IProductoFavorito
* 
* This interface defines the structure for a product marked as a favorite.
*/
export interface IProductoFavorito {
  idProducto: number;                // The unique identifier for the product.
  nombreProducto: string;            // The name of the product.
  tallaProducto: string;             // The size of the product.
  precioProducto: string;            // The price of the product formatted as a string.
  stockProducto: number;             // The available stock quantity of the product.
  imgProducto: string | null;        // The image URL of the product, or null if not available.
  nombreCategoria: string;           // The name of the product's category.
}

/**
* ProductoInterface
* 
* This interface defines the structure for constructing product entities.
*/
export interface ProductoInterface {
  idProducto: number;                // The unique identifier for the product.
  nombreProducto: string;            // The name of the product.
  descripcionProducto: string;       // The description of the product.
  precioProducto: number;            // The price of the product as a number.
  stockProducto: number;             // The available stock quantity of the product.
  imagenProducto: string | null;     // The image URL of the product, or null if not available.
  categoriaId: number;               // The ID of the product's category.
  enPromocion: boolean;              // Indicates if the product is on promotion.
  categoriaNombre: string;           // The name of the product's category.
  marcaNombre: string;               // The name of the product's brand.
  tallaNombre: string;               // The size of the product.
}