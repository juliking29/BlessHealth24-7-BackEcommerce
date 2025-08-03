/**
 * IProductoData defines the structure for product data in the application.
 * It includes all the necessary properties to represent a product's information.
 */
export default interface IProductoData {
  
  idProducto: number;            // The unique identifier for the product.
  nombreProducto: string;        // The name of the product.
  descripcionProducto: string;   // The description of the product.
  precioProducto: number;        // The price of the product.
  stockProducto: number;         // The available stock quantity of the product.
  imagenProducto: string;        // The image URL of the product.
  categoriaId: number;          // The ID of the product's category.
  enPromocion: string;          // Indicates if the product is on promotion.
  categoriaNombre: string;      // The name of the product's category.
  marcaNombre: string;          // The name of the product's brand.
  tallaNombre: string;          // The size of the product.
}



export interface IDataProducto {
  idProducto: number;
  nombreProducto: string;
  descripcionProducto: string;
  precioProducto: number; // Asegúrate de que el tipo sea correcto
  stockProducto: number;
  imgProducto: string; // Cambia esto si el campo tiene otro nombre
  categoriaId: number;
  promocion: string; // O un tipo más específico si es necesario
  categoriaNombre: string; // Opcional
  marcaNombre: string; // Opcional
  tallaNombre: string; // Opcional
}

export interface IDataProducto2 {
  idProducto: number;
  nombreProducto: string;
  descripcionProducto: string;
  precioProducto: number; // Asegúrate de que el tipo sea correcto
  stockProducto: number;
  imgProducto: string; // Cambia esto si el campo tiene otro nombre
  categoriaId: number;
  enPromocion: string; // O un tipo más específico si es necesario
  categoriaNombre: string; // Opcional
  marcaNombre: string; // Opcional
  tallaNombre: string; // Opcional
}