/**
 * IProductoQueries defines the methods for interacting with product-related operations
 * in the application, including searching and retrieving product records.
 */
export interface IProductoQueries {
  
  /**
   * Finds products within a specified price range.
   * 
   * @param {number} min - The minimum price of the products to find.
   * @param {number} max - The maximum price of the products to find.
   * @returns {Promise<any[]>} - A promise that resolves to an array of products within the price range.
   */
  findByPriceRange(min: number, max: number): Promise<any[]>;

  /**
   * Finds a product by its ID.
   * 
   * @param {number} id - The ID of the product to find.
   * @returns {Promise<any[]>} - A promise that resolves to an array containing the product data if found.
   */
  findById(id: number): Promise<any[]>;

  /**
   * Finds products by their name.
   * 
   * @param {string} nombre - The name of the product to find.
   * @returns {Promise<any[]>} - A promise that resolves to an array of products matching the name.
   */
  findByName(nombre: string): Promise<any[]>;

  /**
   * Searches for products based on a search term.
   * 
   * @param {string} termino - The search term to use for finding products.
   * @returns {Promise<any[]>} - A promise that resolves to an array of products matching the search term.
   */
  search(termino: string): Promise<any[]>;

  /**
   * Retrieves a showcase of products.
   * 
   * @returns {Promise<any[]>} - A promise that resolves to an array of products for the showcase.
   */
  getShowcase(): Promise<any[]>;

  /**
   * Retrieves the first set of products (from 1 to 12).
   * 
   * @returns {Promise<any[]>} - A promise that resolves to an array of products from 1 to 12.
   */
  getShowcase1(): Promise<any[]>;

  /**
   * Retrieves the second set of products (from 13 to 24).
   * 
   * @returns {Promise<any[]>} - A promise that resolves to an array of products from 13 to 24.
   */
  getShowcase2(): Promise<any[]>;

  /**
   * Retrieves the third set of products (from 25 to 36).
   * 
   * @returns {Promise<any[]>} - A promise that resolves to an array of products from 25 to 36.
   */
  getShowcase3(): Promise<any[]>;
}
