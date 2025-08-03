import { Router } from 'express';
import FavoritoControladorExpressInterface from '../../Domain/interfaces/FavoritoControladorExpressInterface';
import FavoritoRouterExpressInterface from '../../Domain/interfaces/FavoritoRouterExpressInterface';
import { verificarRolMiddleware } from '../../../middlewares/Infrastructura/verificarRolMiddleware';

/**
 * FavoritoRouterExpress implements the FavoritoRouterExpressInterface,
 * defining the routes related to favorite items in an Express application.
 */
export default class FavoritoRouterExpress implements FavoritoRouterExpressInterface {
  router: Router;
  path: string;

  /**
   * Constructor for FavoritoRouterExpress.
   * 
   * @param {FavoritoControladorExpressInterface} favoritoControlador - An instance of the favorite controller for handling requests.
   */
  constructor(private readonly favoritoControlador: FavoritoControladorExpressInterface) {
    this.router = Router();
    this.path = '/favorito';
    this.routes();
  }

  /**
   * Initializes the routes for favorite operations.
   */
  public routes(): void {
    this.obtenerFavoritos();
    this.agregarAFavoritos();
    this.quitarProductoDeFavoritos();
    this.contarFavoritos(); 
  }

  /**
   * Defines the route for retrieving a user's favorite items.
   */
  public obtenerFavoritos(): void {
    this.router.get(
      '/:idUsuario',
      verificarRolMiddleware(['usuario']), // Middleware to verify user role
      this.favoritoControlador.obtenerFavoritos.bind(this.favoritoControlador)
    );
  }

  /**
   * Defines the route for adding a product to the user's favorites.
   */
  public agregarAFavoritos(): void {
    this.router.post(
      '/agregar',
      verificarRolMiddleware(['usuario']), // Middleware to verify user role
      this.favoritoControlador.agregarAFavoritos.bind(this.favoritoControlador)
    );
  }

  /**
   * Defines the route for removing a product from the user's favorites.
   */
  public quitarProductoDeFavoritos(): void {
    this.router.delete(
      '/eliminar',
      verificarRolMiddleware(['usuario']), // Middleware to verify user role
      this.favoritoControlador.quitarProductoDeFavoritos.bind(this.favoritoControlador)
    );
  }

  /**
   * Defines the route for counting the number of favorite items for a user.
   */
  public contarFavoritos(): void {
    this.router.get(
      '/cantidad/:idUsuario/',
      verificarRolMiddleware(['usuario']), // Middleware to verify user role
      this.favoritoControlador.contarFavoritos.bind(this.favoritoControlador)
    );
  }
}