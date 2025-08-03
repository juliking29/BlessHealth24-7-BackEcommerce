import AbstractProducto from "../../../../ModuloProductos/Domain/Producto/AbstractProducto";

/**
 * ItemFavoritoInterface defines the structure for a favorite item.
 * It includes the ID of the favorite item and the associated product.
 */
export interface ItemFavoritoInterface {
  idItemFavorito: number;      // The unique identifier for the favorite item.
  producto: AbstractProducto;   // The associated product item.
}

// Summary view of a favorite item
export interface IItemFavoritoResumen {
  idProducto: number;          // The unique identifier for the product.
  nombreProducto: string;      // The name of the product.
  tallaProducto: string;       // The size of the product.
  precioProducto: string;      // The price of the product formatted as a string.
  stockProducto: number;       // The available stock quantity of the product.
  imgProducto: string | null;  // The image URL of the product, or null if not available.
  nombreCategoria: string;     // The name of the product's category.
}

// Complete view of a favorite item
export interface IItemFavoritoCompleto {
  idProducto: number;          // The unique identifier for the product.
  Producto: string;           // The name of the product.
  Talla: string;              // The size of the product.
  Marca: string;              // The brand of the product.
  PrecioUnitario: string;     // The unit price of the product formatted as a string.
}