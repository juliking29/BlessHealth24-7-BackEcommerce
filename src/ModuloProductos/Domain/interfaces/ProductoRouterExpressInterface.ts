import RouterExpressInterface from "../../../Express/domain/RouterExpressInterface";

/**
 * ProductoRouterExpressInterface extends the RouterExpressInterface,
 * defining routes related to product operations in an Express application.
 * 
 * @extends RouterExpressInterface
 */
export default interface ProductoRouterExpressInterface extends RouterExpressInterface {
  
  /**
   * obtenerProductoPorId
   * 
   * Defines the route for retrieving a product's details based on its ID.
   * This method should be implemented to set up the necessary route handling.
   * 
   * @returns {void} - This method does not return a value.
   */
  obtenerProductoPorId(): void;

  /**
   * obtenerProductoPorNombre
   * 
   * Defines the route for retrieving a product's details based on its name.
   * This method should be implemented to set up the necessary route handling.
   * 
   * @returns {void} - This method does not return a value.
   */
  obtenerProductoPorNombre(): void;

  /**
   * obtenerProductosPorRangoDePrecio
   * 
   * Defines the route for retrieving products within a specified price range.
   * This method should be implemented to set up the necessary route handling.
   * 
   * @returns {void} - This method does not return a value.
   */
  obtenerProductosPorRangoDePrecio(): void;

  /**
   * buscarProductos
   * 
   * Defines the route for searching for products based on a search term.
   * This method should be implemented to set up the necessary route handling.
   * 
   * @returns {void} - This method does not return a value.
   */
  buscarProductos(): void;

  /**
   * obtenerVitrina
   * 
   * Defines the route for retrieving a showcase view of products.
   * This method should be implemented to set up the necessary route handling.
   * 
   * @returns {void} - This method does not return a value.
   */
  obtenerVitrina(): void;

   /**
   * obtenerVitrina1
   * 
   * Defines the route for retrieving the first showcase view of products.
   * This method should be implemented to set up the necessary route handling.
   * 
   * @returns {void} - This method does not return a value.
   */
   obtenerVitrina1(): void;

   /**
    * obtenerVitrina2
    * 
    * Defines the route for retrieving the second showcase view of products.
    * This method should be implemented to set up the necessary route handling.
    * 
    * @returns {void} - This method does not return a value.
    */
   obtenerVitrina2(): void;
 
   /**
    * obtenerVitrina3
    * 
    * Defines the route for retrieving the third showcase view of products.
    * This method should be implemented to set up the necessary route handling.
    * 
    * @returns {void} - This method does not return a value.
    */
   obtenerVitrina3(): void;
 
}