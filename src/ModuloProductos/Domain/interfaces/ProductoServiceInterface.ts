import AbstractProducto from "../Producto/AbstractProducto";
import { IProductoDetalle, IProductoVitrina } from "../Producto/interfaces/productoIntefaces";

/**
 * ProductoServiceInterface defines the methods for product-related operations
 * in the service layer of the application. It provides an abstraction for
 * managing product information and interactions.
 */
export default interface ProductoServiceInterface {
  
  /**
   * obtenerProductoPorId
   * 
   * Retrieves the details of a product based on its ID.
   * 
   * @param {number} id - The ID of the product to be retrieved.
   * @returns {Promise<IProductoDetalle>} - A promise that resolves to the product details.
   */
  obtenerProductoPorId(id: number): Promise<IProductoDetalle>;

  /**
   * obtenerProductoPorNombre
   * 
   * Retrieves a product based on its name.
   * 
   * @param {string} nombre - The name of the product to be retrieved.
   * @returns {Promise<AbstractProducto>} - A promise that resolves to the product object.
   */
  obtenerProductoPorNombre(nombre: string): Promise<AbstractProducto>;

  /**
   * obtenerProductosPorRangoDePrecio
   * 
   * Retrieves products within a specified price range.
   * 
   * @param {number} min - The minimum price of the products to be retrieved.
   * @param {number} max - The maximum price of the products to be retrieved.
   * @returns {Promise<AbstractProducto[]>} - A promise that resolves to an array of product objects.
   */
  obtenerProductosPorRangoDePrecio(min: number, max: number): Promise<AbstractProducto[]>;

  /**
   * buscarProductos
   * 
   * Searches for products based on a search term.
   * 
   * @param {string} termino - The search term to find products.
   * @returns {Promise<AbstractProducto[]>} - A promise that resolves to an array of matching product objects.
   */
  buscarProductos(termino: string): Promise<AbstractProducto[]>;

  /**
   * obtenerVitrina
   * 
   * Retrieves a showcase view of products.
   * 
   * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products in showcase format.
   */
  obtenerVitrina(): Promise<IProductoVitrina[]>;

  /**
   * obtenerVitrina1
   * 
   * Retrieves the first set of products (from 1 to 12).
   * 
   * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products from 1 to 12.
   */
  obtenerVitrina1(): Promise<IProductoVitrina[]>;

  /**
   * obtenerVitrina2
   * 
   * Retrieves the second set of products (from 13 to 24).
   * 
   * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products from 13 to 24.
   */
  obtenerVitrina2(): Promise<IProductoVitrina[]>;

  /**
   * obtenerVitrina3
   * 
   * Retrieves the third set of products (from 25 to 36).
   * 
   * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products from 25 to 36.
   */
  obtenerVitrina3(): Promise<IProductoVitrina[]>;
}
