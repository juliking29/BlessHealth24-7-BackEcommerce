// Summary view of favorites
export interface IFavoritoResumen {
  idFavorito: number;        // The unique identifier for the favorite list.
  idUsuario: number;         // The ID of the user associated with the favorite list.
  totalItems: number;        // The total number of items in the favorite list.
  productos: any[];          // An array of products in the favorite list (type can be specified further).
}

// Complete view of favorites
export interface IFavorito {
  idFavorito: number;        // The unique identifier for the favorite list.
  idUsuario: number;         // The ID of the user associated with the favorite list.
  itemsFavoritos: any[];     // An array of favorite items (type can be specified further).
}

// Detailed view of a favorite item
export interface IFavoritos {
  idProducto: number;        // The unique identifier for the product.
  nombreProducto: string;    // The name of the product.
  tallaProducto: string;     // The size of the product.
  precioProducto: string;    // The price of the product formatted as a string.
  stockProducto: number;     // The available stock quantity of the product.
  imgProducto: string | null; // The image URL of the product, or null if not available.
  nombreCategoria: string;   // The name of the product's category.
  idItemFavorito: number;    // The unique identifier for the favorite item.
}

// Interface for creating or updating a favorite list
export interface FavoritoInterface {
  idFavorito: number;        // The unique identifier for the favorite list.
  idUsuario: number;         // The ID of the user associated with the favorite list.
  itemsFavoritos: any[];     // An array of favorite items (type can be specified further).
}