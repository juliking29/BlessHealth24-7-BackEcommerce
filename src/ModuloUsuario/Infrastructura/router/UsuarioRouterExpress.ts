import { Router } from 'express';
import UsuarioControladorExpressInterface from '../../Domain/interfaces/UsuarioControladorExpressInterface';
import UsuarioRouterExpressInterface from '../../Domain/interfaces/UsuarioRouterExpressInterface';
import { verificarRolMiddleware } from '../../../middlewares/Infrastructura/verificarRolMiddleware';

/**
 * UsuarioRouterExpress implements the UsuarioRouterExpressInterface,
 * defining the routes related to user operations in an Express application.
 */
export default class UsuarioRouterExpress implements UsuarioRouterExpressInterface {
  router: Router;
  path: string;

  /**
   * Constructor for UsuarioRouterExpress.
   * 
   * @param {UsuarioControladorExpressInterface} usuarioControlador - An instance of the user controller for handling requests.
   */
  constructor(private readonly usuarioControlador: UsuarioControladorExpressInterface) {
    this.router = Router();
    this.path = '/usuario';
    this.routes();
  }

  /**
   * Initializes the routes for user operations.
   */
  public routes(): void {
    this.verMiCuentaPorId();
    this.verMiCuentaPorCorreo();
    this.cambiarRolUsuario();
    this.eliminarUsuario();
  }

  /**
   * Defines the route for retrieving a user's account information based on their ID.
   */
  public verMiCuentaPorId(): void {
    this.router.get(
      '/:idUsuario',
      verificarRolMiddleware(['usuario']), 
      this.usuarioControlador.verMiCuentaPorId.bind(this.usuarioControlador)
    );
  }

  /**
   * Defines the route for retrieving a user's account information based on their email.
   */
  public verMiCuentaPorCorreo(): void {
    this.router.get(
      '/correo/:correo',
      verificarRolMiddleware(['usuario']), 
      this.usuarioControlador.verMiCuentaPorCorreo.bind(this.usuarioControlador)
    );
  }

  /**
   * Defines the route for changing a user's role.
   */
  public cambiarRolUsuario(): void {
    this.router.put(
      '/rol/:idUsuario/',
      verificarRolMiddleware(['admin']), 
      this.usuarioControlador.cambiarRolUsuario.bind(this.usuarioControlador)
    );
  }

  /**
   * Defines the route for deleting a user from the system.
   */
  public eliminarUsuario(): void {
    this.router.delete(
      '/:idUsuario',
      verificarRolMiddleware(['admin']), 
      this.usuarioControlador.eliminarUsuario.bind(this.usuarioControlador)
    );
  }
}