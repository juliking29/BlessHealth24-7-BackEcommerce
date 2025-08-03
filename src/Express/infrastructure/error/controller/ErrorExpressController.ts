import { Request, Response } from 'express';
import ErrorExpressControllerInterface from '../../../domain/ErrorControllerExpressInterface';

/**
 * ErrorExpressController implements the ErrorExpressControllerInterface,
 * providing a method for handling errors in an Express application.
 */
export default class ErrorExpressController implements ErrorExpressControllerInterface {
  
  /**
   * Handles errors and sends a JSON response indicating the error.
   * 
   * @param {Request} _req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {void} - Sends a JSON response with a 400 status code.
   */
  public error = (_req: Request, res: Response): void => {
    res.status(400).json({ error: 'Path not found' }); // Responds with a 400 error for not found paths
  }
}