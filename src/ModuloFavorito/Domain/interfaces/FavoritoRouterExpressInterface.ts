import { Request, Response } from 'express';
import ControllerExpressInterface from '../../../Express/domain/ControllerExpressInterface';

/**
 * FavoritoControladorExpressInterface extends the ControllerExpressInterface,
 * defining methods for handling favorite-related HTTP requests in an Express application.
 * 
 * @extends ControllerExpressInterface
 */
export default interface FavoritoControladorExpressInterface extends ControllerExpressInterface {
  
  /**
   * obtenerFavoritos
   * 
   * Handles the request to retrieve the list of favorite items for a user.
   * 
   * @param {Request} req - The Express request object containing user information.
   * @param {Response} res - The Express response object used to send the list of favorites.
   * @returns {void} - This method does not return a value.
   */
  obtenerFavoritos(req: Request, res: Response): void;

  /**
   * agregarAFavoritos
   * 
   * Handles the request to add a product to the user's favorites.
   * 
   * @param {Request} req - The Express request object containing product information.
   * @param {Response} res - The Express response object used to send the result of the operation.
   * @returns {void} - This method does not return a value.
   */
  agregarAFavoritos(req: Request, res: Response): void;

  /**
   * quitarProductoDeFavoritos
   * 
   * Handles the request to remove a product from the user's favorites.
   * 
   * @param {Request} req - The Express request object containing product information.
   * @param {Response} res - The Express response object used to send the result of the operation.
   * @returns {void} - This method does not return a value.
   */
  quitarProductoDeFavoritos(req: Request, res: Response): void;

  /**
   * contarFavoritos
   * 
   * Handles the request to count the number of favorite items for a user.
   * 
   * @param {Request} req - The Express request object containing user information.
   * @param {Response} res - The Express response object used to send the count of favorites.
   * @returns {void} - This method does not return a value.
   */
  contarFavoritos(req: Request, res: Response): void; // Method added
}