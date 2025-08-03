import RouterExpressInterface from "../../../Express/domain/RouterExpressInterface";

/**
 * ImagesRouterExpressInterface extends the RouterExpressInterface,
 * defining methods for handling image-related routes in an Express application.
 */
export default interface ImagesRouterExpressInterface extends RouterExpressInterface {
  
  /**
   * Defines the route for retrieving an image.
   */
  verImagen(): void;
}