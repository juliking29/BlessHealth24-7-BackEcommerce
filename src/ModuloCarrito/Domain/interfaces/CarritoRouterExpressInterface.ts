import RouterExpressInterface from "../../../Express/domain/RouterExpressInterface";

/**
 * CarritoRouterExpressInterface extends the RouterExpressInterface,
 * defining the methods for managing shopping cart routes in an Express application.
 */
export default interface CarritoRouterExpressInterface extends RouterExpressInterface {
  
  /**
   * Defines the route for viewing the user's shopping cart.
   */
  verCarrito(): void;

  /**
   * Defines the route for viewing a summarized version of the user's shopping cart.
   */
  verCarritoResumido(): void;

  /**
   * Defines the route for calculating the totals of the user's shopping cart.
   */
  calcularTotales(): void;

  /**
   * Defines the route for calculating the totals for the complete shopping cart.
   */
  calcularTotalesCarritoCompleto(): void;

  /**
   * Defines the route for adding a product to the user's shopping cart.
   */
  agregarProducto(): void;

  /**
   * Defines the route for removing a product from the user's shopping cart.
   */
  eliminarProducto(): void;

  /**
   * Defines the route for increasing the quantity of a product in the user's shopping cart.
   */
  aumentarCantidad(): void;

  /**
   * Defines the route for decreasing the quantity of a product in the user's shopping cart.
   */
  disminuirCantidad(): void;
}