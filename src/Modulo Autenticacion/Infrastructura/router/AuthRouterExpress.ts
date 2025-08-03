import { Router } from 'express';
import AuthControllerExpressInterface from '../../Domain/Interfaces/AuthControllerExpressInterface';
import AuthRouterExpressInterface from '../../Domain/Interfaces/AuthRouterExpressInterface';
import { verificarRolMiddleware } from '../../../middlewares/Infrastructura/verificarRolMiddleware';

/**
 * AuthRouterExpress implements the AuthRouterExpressInterface,
 * defining the routes for authentication operations in an Express application.
 */
export default class AuthRouterExpress implements AuthRouterExpressInterface {
  
  router: Router; // Express router instance
  path: string; // Base path for the router

  constructor(private readonly authController: AuthControllerExpressInterface) {
    this.router = Router(); // Initialize the router
    this.path = '/auth'; // Set the base path
    this.routes(); // Define the routes
  }

  /**
   * Defines the routes for authentication operations.
   */
  public routes(): void {
    // Public routes (no protection)
    this.registrarUsuario();
    this.iniciarSesion();

    // Protected routes (role-based protection)
    this.verificarSesionActiva();
    this.obtenerUsuarioPorToken();
    this.logout(); 
    this.restablecerContrasena();
    this.cambiarNuevaContrasena();
  }

  /**
   * Defines the route for user registration.
   */
  public registrarUsuario(): void {
    this.router.post('/registrar', this.authController.registrarUsuario.bind(this.authController));
  }

  /**
   * Defines the route for user login.
   */
  public iniciarSesion(): void {
    this.router.post('/iniciar-sesion', this.authController.iniciarSesion.bind(this.authController));
  }

  /**
   * Defines the route for verifying if a user session is active.
   */
  public verificarSesionActiva(): void {
    this.router.post(
      '/verificar-sesion',
      verificarRolMiddleware(['usuario']),
      this.authController.verificarSesionActiva.bind(this.authController)
    );
  }

  /**
   * Defines the route for retrieving user information based on the token.
   */
  public obtenerUsuarioPorToken(): void {
    this.router.post(
      '/usuario',
      verificarRolMiddleware(['usuario']), 
      this.authController.obtenerUsuarioPorToken.bind(this.authController)
    );
  }

  /**
   * Defines the route for logging out the user.
   */
  public logout(): void {
    this.router.delete(
      '/logout',
      verificarRolMiddleware(['usuario']), 
      this.authController.logout.bind(this.authController)
    );
  }

  /**
   * Defines the route for resetting the user's password.
   */
  public restablecerContrasena(): void {
    this.router.put(
      '/restablecer-contrasena',
      verificarRolMiddleware(['usuario']), 
      this.authController.restablecerContrasena.bind(this.authController)
    );
  }

  /**
   * Defines the route for changing the user's password.
   */
  public cambiarNuevaContrasena(): void {
    this.router.put(
      '/cambiar-contrasena',
      verificarRolMiddleware(['usuario']), 
      this.authController.cambiarNuevaContrasena.bind(this.authController)
    );
  }
}