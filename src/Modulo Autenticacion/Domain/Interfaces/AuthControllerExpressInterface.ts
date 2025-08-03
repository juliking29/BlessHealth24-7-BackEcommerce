import { Request, Response } from "express";
import ControllerExpressInterface from "../../../Express/domain/ControllerExpressInterface";

/**
 * AuthControllerExpressInterface defines the methods for handling HTTP requests
 * related to authentication operations in an Express application.
 */
export default interface AuthControllerExpressInterface extends ControllerExpressInterface {
  
  /**
   * Registers a new user.
   * 
   * @param {Request} req - The HTTP request object containing user registration data.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  registrarUsuario(req: Request, res: Response): Promise<void>;

  /**
   * Initiates a user session (login).
   * 
   * @param {Request} req - The HTTP request object containing login credentials.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  iniciarSesion(req: Request, res: Response): Promise<void>;

  /**
   * Verifies if a user session is active.
   * 
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  verificarSesionActiva(req: Request, res: Response): Promise<void>;

  /**
   * Retrieves user information based on the provided token.
   * 
   * @param {Request} req - The HTTP request object containing the token.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  obtenerUsuarioPorToken(req: Request, res: Response): Promise<void>;

  /**
   * Logs out the user, terminating the session.
   * 
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  logout(req: Request, res: Response): Promise<void>;

  /**
   * Resets the user's password.
   * 
   * @param {Request} req - The HTTP request object containing password reset data.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  restablecerContrasena(req: Request, res: Response): Promise<void>;

  /**
   * Changes the user's password to a new one.
   * 
   * @param {Request} req - The HTTP request object containing new password data.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  cambiarNuevaContrasena(req: Request, res: Response): Promise<void>;
}