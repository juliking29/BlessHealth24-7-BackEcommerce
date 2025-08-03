import { Router } from 'express';
import PagoRouterExpressInterface from '../../Domain/interfaces/PagoRouterExpressInterface';
import PagoControladorExpress from '../Controller/CarritoControladorExpress';
import { verificarRolMiddleware } from '../../../middlewares/Infrastructura/verificarRolMiddleware';

/**
 * PagoRouterExpress implements the PagoRouterExpressInterface,
 * providing routes for handling payment-related operations in an Express application.
 */
export default class PagoRouterExpress implements PagoRouterExpressInterface {
  
  router: Router;
  path: string;

  constructor(private readonly pagoControlador: PagoControladorExpress) {
    this.router = Router();
    this.path = '/pago';
    this.routes(); // Initialize routes
  }

  /**
   * Initializes the routes for payment operations.
   */
  public routes(): void {
    this.verPagoPorId();
    this.procesarPago();
  }

  /**
   * Defines the route for retrieving payment information by payment ID.
   */
  public verPagoPorId(): void {
    this.router.get(
      '/:idPago',
      verificarRolMiddleware(['usuario']), 
      this.pagoControlador.verPagoPorId.bind(this.pagoControlador)
    );
  }

  /**
   * Defines the route for processing a payment.
   */
  public procesarPago(): void {
    this.router.post(
      '/procesarpago',
      verificarRolMiddleware(['usuario']), 
      this.pagoControlador.procesarPago.bind(this.pagoControlador)
    );
  }
}