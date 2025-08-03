import { IAuthResponse, IRegisterResponse, IVerificarSesionActivaResponse, IObtenerUsuarioPorTokenResponse, ICerrarSesionResponse, IResetPasswordResponse } from "../../AuthClass/interface/AuthInterfaces";

/**
 * IAuthRepository defines the methods for managing authentication data operations
 * in the repository layer of the application.
 */
export interface IAuthRepository {
  
  /**
   * Logs in a user with the provided email and password.
   * 
   * @param {string} userEmail - The email of the user.
   * @param {string} userPassword - The password of the user.
   * @returns {Promise<IAuthResponse>} - A promise that resolves to the authentication response.
   */
  login(userEmail: string, userPassword: string): Promise<IAuthResponse>;

  /**
   * Registers a new user with the provided details.
   * 
   * @param {string} firstName - The first name of the user.
   * @param {string} lastName - The last name of the user.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @param {string} confirmPassword - The password confirmation of the user.
   * @param {number} [role] - Optional role ID for the user.
   * @returns {Promise<IRegisterResponse>} - A promise that resolves to the registration response.
   */
  register(
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string, 
    confirmPassword: string, // Nuevo campo para confirmar contraseña
    role?: number
  ): Promise<IRegisterResponse>;
  /**
   * Verifies if a user session is active based on the provided token.
   * 
   * @param {string} token - The token to verify.
   * @returns {Promise<IVerificarSesionActivaResponse>} - A promise that resolves to the session verification response.
   */
  verifyActiveSession(token: string): Promise<IVerificarSesionActivaResponse>;

  /**
   * Retrieves user information based on the provided token.
   * 
   * @param {string} token - The token to use for retrieving user information.
   * @returns {Promise<IObtenerUsuarioPorTokenResponse>} - A promise that resolves to the user information response.
   */
  getUserByToken(token: string): Promise<IObtenerUsuarioPorTokenResponse>;

  /**
   * Logs out the user, terminating the session.
   * 
   * @param {string} token - The token of the user to log out.
   * @returns {Promise<ICerrarSesionResponse>} - A promise that resolves to the logout response.
   */
  logout(token: string): Promise<ICerrarSesionResponse>;

  /**
   * Changes the user's password.
   * 
   * @param {string} correoUsuario - The email of the user whose password is to be changed.
   * @param {string} nuevaContrasena - The new password for the user.
   * @returns {Promise<IResetPasswordResponse>} - A promise that resolves to the password change response.
   */
  NEWPassword(correoUsuario: string, nuevaContrasena: string): Promise<IResetPasswordResponse>;

  /**
   * Resets the user's password using a verification code.
   * 
   * @param {string} correoUsuario - The email of the user requesting the password reset.
   * @param {string} codigo - The verification code sent to the user.
   * @param {string} nuevaContrasena - The new password for the user.
   * @returns {Promise<IResetPasswordResponse>} - A promise that resolves to the password reset response.
   */
  resetPassword(correoUsuario: string, codigo: string, nuevaContrasena: string): Promise<IResetPasswordResponse>;
}