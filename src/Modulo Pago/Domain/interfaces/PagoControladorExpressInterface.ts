import { Request, Response } from 'express';

/**
 * PagoControladorExpressInterface defines the methods for handling HTTP requests
 * related to payment operations in an Express application.
 */
export default interface PagoControladorExpressInterface {
  
  /**
   * Retrieves payment information by payment ID.
   * 
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  obtenerPagoPorId(req: Request, res: Response): Promise<void>;

  /**
   * Creates a new payment.
   * 
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  crearPago(req: Request, res: Response): Promise<void>;

  /**
   * Updates an existing payment.
   * 
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  actualizarPago(req: Request, res: Response): Promise<void>;

  /**
   * Deletes a payment.
   * 
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  eliminarPago(req: Request, res: Response): Promise<void>;
}