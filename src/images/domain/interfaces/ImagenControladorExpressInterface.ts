import { Request, Response } from 'express';
import ControllerExpressInterface from '../../../Express/domain/ControllerExpressInterface';

/**
 * ImagenControladorExpressInterface defines the methods for handling
 * image-related operations in an Express application.
 */
export default interface ImagenControladorExpressInterface extends ControllerExpressInterface {
  
  /**
   * Retrieves and returns an image based on the request parameters.
   * 
   * @param {Request} req - The HTTP request object containing image retrieval parameters.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  VerIamgen(req: Request, res: Response): Promise<void>;
}