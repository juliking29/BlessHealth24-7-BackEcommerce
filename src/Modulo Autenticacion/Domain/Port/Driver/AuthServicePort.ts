import { IAuthResponse, IRegisterResponse, IVerificarSesionActivaResponse, IObtenerUsuarioPorTokenResponse, ICerrarSesionResponse, IRequestPasswordResetResponse, IResetPasswordResponse } from "../../AuthClass/interface/AuthInterfaces";

/**
 * AuthServicePort defines the methods for managing authentication operations
 * in the service layer of the application.
 */
export default interface AuthServicePort {
  
  /**
   * Logs in a user with the provided email and password.
   * 
   * @param {string} correoUsuario - The email of the user.
   * @param {string} contrasenaUsuario - The password of the user.
   * @returns {Promise<IAuthResponse>} - A promise that resolves to the authentication response.
   */
  login(correoUsuario: string, contrasenaUsuario: string): Promise<IAuthResponse>;

/**
   * Registers a new user with the provided details.
   * 
   * @param {string} nombre - The first name of the user.
   * @param {string} apellido - The last name of the user.
   * @param {string} correo - The email of the user.
   * @param {string} contrasena - The password of the user.
   * @param {string} confirmarContrasena - The password confirmation of the user.
   * @param {number} [rol] - Optional role ID for the user.
   * @returns {Promise<IRegisterResponse>} - A promise that resolves to the registration response.
   */
register(
  nombre: string, 
  apellido: string, 
  correo: string, 
  contrasena: string, 
  confirmarContrasena: string, // Nuevo campo para confirmar contraseña
  rol?: number
): Promise<IRegisterResponse>;
  /**
   * Verifies if a user session is active based on the provided token.
   * 
   * @param {string} token - The token to verify.
   * @returns {Promise<IVerificarSesionActivaResponse>} - A promise that resolves to the session verification response.
   */
  verificarSesionActiva(token: string): Promise<IVerificarSesionActivaResponse>;

  /**
   * Retrieves user information based on the provided token.
   * 
   * @param {string} token - The token to use for retrieving user information.
   * @returns {Promise<IObtenerUsuarioPorTokenResponse>} - A promise that resolves to the user information response.
   */
  obtenerUsuarioPorToken(token: string): Promise<IObtenerUsuarioPorTokenResponse>;

  /**
   * Logs out the user, terminating the session.
   * 
   * @param {string} token - The token of the user to log out.
   * @returns {Promise<ICerrarSesionResponse>} - A promise that resolves to the logout response.
   */
  cerrarSesion(token: string): Promise<ICerrarSesionResponse>;

  /**
   * Changes the user's password.
   * 
   * @param {string} correoUsuario - The email of the user whose password is to be changed.
   * @param {string} nuevaContrasena - The new password for the user.
   * @returns {Promise<IRequestPasswordResetResponse>} - A promise that resolves to the password change request response.
   */
  CambiarContraseña(correoUsuario: string, nuevaContrasena: string): Promise<IRequestPasswordResetResponse>;

  /**
   * Resets the user's password using a verification code.
   * 
   * @param {string} correoUsuario - The email of the user requesting the password reset.
   * @param {string} codigo - The verification code sent to the user.
   * @param {string} nuevaContrasena - The new password for the user.
   * @returns {Promise<IResetPasswordResponse>} - A promise that resolves to the password reset response.
   */
  OlvideContarseña(correoUsuario: string, codigo: string, nuevaContrasena: string): Promise<IResetPasswordResponse>;
}