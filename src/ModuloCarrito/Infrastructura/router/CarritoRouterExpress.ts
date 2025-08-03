import { Router } from 'express';
import CarritoRouterExpressInterface from '../../Domain/interfaces/CarritoRouterExpressInterface';
import CarritoControladorExpressInterface from '../../Domain/interfaces/CarritoControladorExpressInterface';
import { verificarRolMiddleware } from '../../../middlewares/Infrastructura/verificarRolMiddleware';

/**
 * CarritoRouterExpress implements the CarritoRouterExpressInterface,
 * providing routes for handling shopping cart operations in an Express application.
 */
export default class CarritoRouterExpress implements CarritoRouterExpressInterface {
  
  router: Router;
  path: string;

  constructor(private readonly carritoControlador: CarritoControladorExpressInterface) {
    this.router = Router();
    this.path = '/carrito';
    this.routes();
  }

  /**
   * Initializes the routes for the shopping cart.
   */
  public routes(): void {
    this.verCarrito();
    this.verCarritoResumido();
    this.calcularTotales();
    this.calcularTotalesCarritoCompleto();
    this.agregarProducto();
    this.eliminarProducto();
    this.aumentarCantidad();
    this.disminuirCantidad();
  }

  /**
   * Defines the route for retrieving the complete shopping cart for a user.
   */
  public verCarrito(): void {
    this.router.get(
      '/:usuarioId',
      verificarRolMiddleware(['usuario']), 
      this.carritoControlador.verCarrito.bind(this.carritoControlador)
    );
  }

  /**
   * Defines the route for retrieving a summary of the user's shopping cart.
   */
  public verCarritoResumido(): void {
    this.router.get(
      '/resumen/:usuarioId',
      verificarRolMiddleware(['usuario']), 
      this.carritoControlador.verCarritoResumido.bind(this.carritoControlador)
    );
  }

  /**
   * Defines the route for calculating the totals for the user's shopping cart.
   */
  public calcularTotales(): void {
    this.router.get(
      '/totales/:usuarioId',
      verificarRolMiddleware(['usuario']), 
      this.carritoControlador.calcularTotales.bind(this.carritoControlador)
    );
  }

  /**
   * Defines the route for calculating the totals for the complete shopping cart.
   */
  public calcularTotalesCarritoCompleto(): void {
    this.router.get(
      '/totales-completo/:usuarioId',
      verificarRolMiddleware(['usuario']), 
      this.carritoControlador.calcularTotalesCarritoCompleto.bind(this.carritoControlador)
    );
  }

  /**
   * Defines the route for adding a product to the user's shopping cart.
   */
  public agregarProducto(): void {
    this.router.post(
      '/agregar',
      verificarRolMiddleware(['usuario']), 
      this.carritoControlador.agregarProducto.bind(this.carritoControlador)
    );
  }

  /**
   * Defines the route for removing a product from the user's shopping cart.
   */
  public eliminarProducto(): void {
    this.router.delete(
      '/eliminar',
      verificarRolMiddleware(['usuario']),
      this.carritoControlador.eliminarProducto.bind(this.carritoControlador)
    );
  }

  /**
   * Defines the route for increasing the quantity of a product in the user's shopping cart.
   */
  public aumentarCantidad(): void {
    this.router.put(
      '/aumentar',
      verificarRolMiddleware(['usuario']),
      this.carritoControlador.aumentarCantidad.bind(this.carritoControlador)
    );
  }

  /**
   * Defines the route for decreasing the quantity of a product in the user's shopping cart.
   */
  public disminuirCantidad(): void {
    this.router.put(
      '/disminuir',
      verificarRolMiddleware(['usuario']),
      this.carritoControlador.disminuirCantidad.bind(this.carritoControlador)
    );
  }
}