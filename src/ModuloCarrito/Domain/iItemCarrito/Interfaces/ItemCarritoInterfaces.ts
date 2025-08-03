// ItemCarritoInterfaces.ts

// Interfaces for ItemCarrito

/**
 * IItemCarritoResumen defines the structure for a summary view of a cart item.
 */
export interface IItemCarritoResumen {
  idProducto: number;          // The unique identifier for the product.
  nombreProducto: string;      // The name of the product.
  tallaProducto: string;       // The size of the product.
  precioProducto: string;      // The price of the product formatted as a string.
  stockProducto: number;       // The available stock quantity of the product.
  imgProducto: string | null;  // The image URL of the product, or null if not available.
}

/**
 * IItemCarritoCompleto defines the structure for a complete view of a cart item.
 */
export interface IItemCarritoCompleto {
  idProducto: number;          // The unique identifier for the product.
  Producto: string;           // The name of the product.
  Talla: string;              // The size of the product.
  Marca: string;              // The brand of the product.
  Cantidad: number;           // The quantity of the product in the cart.
  PrecioUnitario: string;     // The unit price of the product formatted as a string.
  Subtotal: string;           // The subtotal for the product in the cart formatted as a string.
}

/**
 * ItemCarritoInterface defines the structure for an item in the shopping cart.
 */
export interface ItemCarritoInterface {
  idItemCarrito: number;      // The unique identifier for the cart item.
  usuarioId: number;          // The ID of the user associated with the cart item.
  producto: any;              // The associated product item (to be specified with the correct type in implementation).
  cantidad: number;           // The quantity of the product in the cart.
}