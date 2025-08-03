import { Request, Response } from 'express';
import PagoUseCasePort from '../../Domain/Port/Driver/PagoUseCasePort';

/**
 * PagoControladorExpress handles HTTP requests related to payment operations
 * in an Express application.
 */
export default class PagoControladorExpress {
  
  constructor(private readonly pagoCasoUso: PagoUseCasePort) {}

  /**
   * Retrieves payment information by payment ID.
   * 
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async verPagoPorId(req: Request, res: Response): Promise<void> {
    const { idPago } = req.params;

    if (!idPago || isNaN(Number(idPago))) {
      res.status(400).json({ mensaje: "ID de pago inválido" }); // Return error for invalid payment ID
      return;
    }

    const pagos = await this.pagoCasoUso.verPagoPorId(Number(idPago));

    // Check to avoid accessing `undefined`
    if (pagos.length === 0 || (pagos[0] && pagos[0].idPago === 0)) {
      res.status(404).json({ mensaje: "Pago no encontrado" }); // Return error if payment not found
      return;
    }

    res.status(200).json(pagos); // Return the payment information
  }

  /**
   * Processes a payment for a specific user.
   * 
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async procesarPago(req: Request, res: Response): Promise<void> {
    const { idUsuario } = req.body;
    
    console.log("ID Usuario recibido:", idUsuario); // Log the received user ID
    
    try {
      const resultado = await this.pagoCasoUso.procesarPago(idUsuario);
  
      if (resultado) {
        res.status(201).json({
          mensaje: "Pago procesado correctamente",
          pago: resultado // Return the processed payment information
        });
      } else {
        res.status(404).json({ mensaje: "No se encontró información del pago." }); // Return error if payment info not found
      }
    } catch (error) {
      console.error("Error al procesar pago:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" }); // Return internal server error
    }
  }
}