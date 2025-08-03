import { Request, Response } from 'express';
import UsuarioUseCasePort from '../../Domain/Port/Driver/UsuarioUseCasePort';
import UsuarioControladorExpressInterface from '../../Domain/interfaces/UsuarioControladorExpressInterface';

/**
 * UsuarioControladorExpress implements the UsuarioControladorExpressInterface,
 * providing methods to handle user-related HTTPS requests in an Express application.
 */
export default class UsuarioControladorExpress implements UsuarioControladorExpressInterface {
  
  /**
   * Constructor for UsuarioControladorExpress.
   * 
   * @param {UsuarioUseCasePort} usuarioCasoUso - An instance of the user use case for business logic.
   */
  constructor(private readonly usuarioCasoUso: UsuarioUseCasePort) {}

  /**
   * verMiCuentaPorId
   * 
   * Handles the request to retrieve a user's account information based on their ID.
   * 
   * @param {Request} req - The Express request object containing the user ID in the parameters.
   * @param {Response} res - The Express response object used to send the account information.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async verMiCuentaPorId(req: Request, res: Response): Promise<void> {
    const { idUsuario } = req.params;
    const usuario = await this.usuarioCasoUso.verMiCuentaPorId(Number(idUsuario));

    if (!usuario) {
      res.status(404).send('Usuario no encontrado');
      return;
    }

    res.status(200).json(usuario);
  }

  /**
   * verMiCuentaPorCorreo
   * 
   * Handles the request to retrieve a user's account information based on their email.
   * 
   * @param {Request} req - The Express request object containing the user's email in the parameters.
   * @param {Response} res - The Express response object used to send the account information.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async verMiCuentaPorCorreo(req: Request, res: Response): Promise<void> {
    const { correo } = req.params;
    const usuario = await this.usuarioCasoUso.verMiCuentaPorCorreo(String(correo));

    if (!usuario) {
      res.status(404).send('Usuario no encontrado');
      return;
    }

    res.status(200).json(usuario);
  }

  /**
   * cambiarRolUsuario
   * 
   * Handles the request to change a user's role.
   * 
   * @param {Request} req - The Express request object containing the user ID in the parameters and the new role in the body.
   * @param {Response} res - The Express response object used to send the result of the operation.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async cambiarRolUsuario(req: Request, res: Response): Promise<void> {
    const { nuevoRol } = req.body;
    const { idUsuario } = req.params;
    const resultado = await this.usuarioCasoUso.cambiarRolUsuario(Number(idUsuario), Number(nuevoRol));

    if (!resultado) {
      res.status(400).send('ID de usuario o nuevo rol inválido');
      return;
    }

    res.status(200).json(resultado);
  }

  /**
   * eliminarUsuario
   * 
   * Handles the request to delete a user from the system.
   * 
   * @param {Request} req - The Express request object containing the user ID in the parameters.
   * @param {Response} res - The Express response object used to send the result of the operation.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async eliminarUsuario(req: Request, res: Response): Promise<void> {
    const { idUsuario } = req.params;
    const resultado = await this.usuarioCasoUso.eliminarUsuario(Number(idUsuario));

    if (!resultado) {
      res.status(404).send('Usuario no encontrado');
      return;
    }

    res.status(200).json(resultado);
  }
}