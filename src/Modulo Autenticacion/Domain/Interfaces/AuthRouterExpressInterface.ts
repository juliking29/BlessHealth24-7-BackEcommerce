import RouterExpressInterface from "../../../Express/domain/RouterExpressInterface";

/**
 * AuthRouterExpressInterface extends the RouterExpressInterface,
 * defining methods for handling authentication-related routes in an Express application.
 */
export default interface AuthRouterExpressInterface extends RouterExpressInterface {
  
  /**
   * Defines the route for registering a new user.
   */
  registrarUsuario(): void;

  /**
   * Defines the route for initiating a user session (login).
   */
  iniciarSesion(): void;

  /**
   * Defines the route for verifying if a user session is active.
   */
  verificarSesionActiva(): void;

  /**
   * Defines the route for retrieving user information based on the provided token.
   */
  obtenerUsuarioPorToken(): void;

  /**
   * Defines the route for resetting the user's password.
   */
  restablecerContrasena(): void;

  /**
   * Defines the route for changing the user's password to a new one.
   */
  cambiarNuevaContrasena(): void;
}