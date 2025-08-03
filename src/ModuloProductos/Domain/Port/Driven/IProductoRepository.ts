import AbstractProducto from "../../Producto/AbstractProducto";
import { IProductoDetalle, IProductoVitrina } from "../../Producto/interfaces/productoIntefaces";

/**
 * IProductoRepository defines the methods for product-related data access operations.
 * It provides an abstraction for interacting with product data sources.
 */
export interface IProductoRepository {
  
  /**
   * findById
   * 
   * Retrieves the details of a product based on its ID.
   * 
   * @param {number} id - The ID of the product to be retrieved.
   * @returns {Promise<IProductoDetalle>} - A promise that resolves to the product details.
   */
  findById(id: number): Promise<IProductoDetalle>;

  /**
   * findByName
   * 
   * Retrieves a product based on its name.
   * 
   * @param {string} nombre - The name of the product to be retrieved.
   * @returns {Promise<AbstractProducto>} - A promise that resolves to the product object.
   */
  findByName(nombre: string): Promise<AbstractProducto>;

  /**
   * findByPriceRange
   * 
   * Retrieves products within a specified price range.
   * 
   * @param {number} min - The minimum price of the products to be retrieved.
   * @param {number} max - The maximum price of the products to be retrieved.
   * @returns {Promise<AbstractProducto[]>} - A promise that resolves to an array of product objects.
   */
  findByPriceRange(min: number, max: number): Promise<AbstractProducto[]>;

  /**
   * search
   * 
   * Searches for products based on a search term.
   * 
   * @param {string} termino - The search term to find products.
   * @returns {Promise<AbstractProducto[]>} - A promise that resolves to an array of matching product objects.
   */
  search(termino: string): Promise<AbstractProducto[]>;

  /**
   * getShowcase
   * 
   * Retrieves a showcase view of products.
   * 
   * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products in showcase format.
   */
  getShowcase(): Promise<IProductoVitrina[]>;

  /**
   * getShowcase1
   * 
   * Retrieves the first set of products (from 1 to 12).
   * 
   * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products from 1 to 12.
   */
  getShowcase1(): Promise<IProductoVitrina[]>;

  /**
   * getShowcase2
   * 
   * Retrieves the second set of products (from 13 to 24).
   * 
   * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products from 13 to 24.
   */
  getShowcase2(): Promise<IProductoVitrina[]>;

  /**
   * getShowcase3
   * 
   * Retrieves the third set of products (from 25 to 36).
   * 
   * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products from 25 to 36.
   */
  getShowcase3(): Promise<IProductoVitrina[]>;
}
