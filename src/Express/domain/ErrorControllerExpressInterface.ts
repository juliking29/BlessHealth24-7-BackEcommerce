import { Request, Response } from 'express';
import ControllerExpressInterface from './ControllerExpressInterface';

/**
 * ErrorControllerExpressInterface extends the ControllerExpressInterface,
 * defining the method for handling errors in an Express application.
 */
export default interface ErrorControllerExpressInterface extends ControllerExpressInterface {
  
  /**
   * Handles errors and sends an appropriate response.
   * 
   * @param {Request} _req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   */
  error: (_req: Request, res: Response) => void;
}