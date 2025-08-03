/**
 * IProducto defines the structure for a product in the application.
 * It includes all the necessary properties to represent a product's information.
 */
export interface IProducto {
  
  id: number;                  // The unique identifier for the product.
  nombre: string;              // The name of the product.
  talla: string;               // The size of the product.
  precio: number;              // The price of the product.
  stock: number;               // The available stock quantity of the product.
  imagen: string | null;       // The image URL of the product, or null if not available.
  categoriaNombre: string;     // The name of the product's category.
}