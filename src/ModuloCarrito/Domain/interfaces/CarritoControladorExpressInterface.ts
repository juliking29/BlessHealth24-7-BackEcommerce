import { Request, Response } from 'express';
import ControllerExpressInterface from '../../../Express/domain/ControllerExpressInterface';

/**
 * CarritoControladorExpressInterface extends the ControllerExpressInterface,
 * defining the methods for managing shopping cart operations in an Express application.
 */
export default interface CarritoControladorExpressInterface extends ControllerExpressInterface {
  
  /**
   * Displays the user's shopping cart.
   * 
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  verCarrito(req: Request, res: Response): void;

  /**
   * Displays a summarized view of the user's shopping cart.
   * 
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  verCarritoResumido(req: Request, res: Response): void;

  /**
   * Calculates the totals for the user's shopping cart.
   * 
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  calcularTotales(req: Request, res: Response): void;

  /**
   * Calculates the totals for the complete shopping cart.
   * 
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  calcularTotalesCarritoCompleto(req: Request, res: Response): void;

  /**
   * Adds a product to the user's shopping cart.
   * 
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  agregarProducto(req: Request, res: Response): void;

  /**
   * Removes a product from the user's shopping cart.
   * 
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  eliminarProducto(req: Request, res: Response): void;

  /**
   * Increases the quantity of a product in the user's shopping cart.
   * 
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  aumentarCantidad(req: Request, res: Response): void;

  /**
   * Decreases the quantity of a product in the user's shopping cart.
   * 
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  disminuirCantidad(req: Request, res: Response): void;
}