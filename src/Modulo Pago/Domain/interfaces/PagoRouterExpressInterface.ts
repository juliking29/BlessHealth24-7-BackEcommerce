import RouterExpressInterface from "../../../Express/domain/RouterExpressInterface";

/**
 * PagoRouterExpressInterface extends the RouterExpressInterface,
 * defining methods for handling payment-related routes in an Express application.
 */
export default interface PagoRouterExpressInterface extends RouterExpressInterface {
  
  /**
   * Defines the route for retrieving payment information by payment ID.
   */
  verPagoPorId(): void;

  /**
   * Defines the route for processing a payment for a specific user.
   */
  procesarPago(): void;
}