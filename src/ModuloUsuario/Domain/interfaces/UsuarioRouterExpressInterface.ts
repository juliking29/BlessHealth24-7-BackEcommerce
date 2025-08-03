import RouterExpressInterface from "../../../Express/domain/RouterExpressInterface";

/**
 * UsuarioRouterExpressInterface is an interface that extends the RouterExpressInterface,
 * defining routes related to user operations in an Express application.
 * 
 * @extends RouterExpressInterface
 */
export default interface UsuarioRouterExpressInterface extends RouterExpressInterface {
  
  /**
   * verMiCuentaPorId
   * 
   * Defines the route for viewing a user's account information based on their ID.
   * This method should be implemented to set up the necessary route handling.
   * 
   * @returns {void} - This method does not return a value.
   */
  verMiCuentaPorId(): void;

  /**
   * verMiCuentaPorCorreo
   * 
   * Defines the route for viewing a user's account information based on their email.
   * This method should be implemented to set up the necessary route handling.
   * 
   * @returns {void} - This method does not return a value.
   */
  verMiCuentaPorCorreo(): void;
}