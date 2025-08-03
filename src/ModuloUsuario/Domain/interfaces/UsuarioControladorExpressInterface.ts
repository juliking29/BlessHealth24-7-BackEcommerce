import { Request, Response } from 'express';
import ControllerExpressInterface from '../../../Express/domain/ControllerExpressInterface';

/**
 * UsuarioControladorExpressInterface is an interface that extends the ControllerExpressInterface,
 * defining methods for user-related operations in an Express application.
 * It specifies the structure for handling user requests and responses.
 * 
 * @extends ControllerExpressInterface
 */
export default interface UsuarioControladorExpressInterface extends ControllerExpressInterface {
  
  /**
   * verMiCuentaPorId
   * 
   * Handles the request to view a user's account information based on their ID.
   * 
   * @param {Request} req - The Express request object containing user ID in the parameters.
   * @param {Response} res - The Express response object used to send the account information.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  verMiCuentaPorId(req: Request, res: Response): Promise<void>;

  /**
   * verMiCuentaPorCorreo
   * 
   * Handles the request to view a user's account information based on their email.
   * 
   * @param {Request} req - The Express request object containing the user's email in the parameters.
   * @param {Response} res - The Express response object used to send the account information.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  verMiCuentaPorCorreo(req: Request, res: Response): Promise<void>;

  /**
   * cambiarRolUsuario
   * 
   * Handles the request to change a user's role.
   * 
   * @param {Request} req - The Express request object containing user ID and new role in the parameters.
   * @param {Response} res - The Express response object used to send the result of the operation.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  cambiarRolUsuario(req: Request, res: Response): Promise<void>;

  /**
   * eliminarUsuario
   * 
   * Handles the request to delete a user from the system.
   * 
   * @param {Request} req - The Express request object containing the user ID in the parameters.
   * @param {Response} res - The Express response object used to send the result of the operation.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  eliminarUsuario(req: Request, res: Response): Promise<void>;
}