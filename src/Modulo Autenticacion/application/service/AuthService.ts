import { IAuthResponse, ICerrarSesionResponse, IObtenerUsuarioPorTokenResponse, IRegisterResponse, IRequestPasswordResetResponse, IResetPasswordResponse, IVerificarSesionActivaResponse } from "../../Domain/AuthClass/interface/AuthInterfaces";
import AuthServiceInterface from "../../Domain/Interfaces/AuthServiceInterface";
import { IAuthRepository } from "../../Domain/Port/Driven/IAuthRepository";

/**
 * AuthService implements the AuthServiceInterface,
 * providing methods for managing authentication operations
 * in the service layer of the application.
 */
export default class AuthService implements AuthServiceInterface {
  
  constructor(private readonly authRepository: IAuthRepository) {}

  /**
   * Logs in a user with the provided email and password.
   * 
   * @param {string} userEmail - The email of the user.
   * @param {string} userPassword - The password of the user.
   * @returns {Promise<IAuthResponse>} - A promise that resolves to the authentication response.
   */
  async login(userEmail: string, userPassword: string): Promise<IAuthResponse> {
    return await this.authRepository.login(userEmail, userPassword);
  }

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
 async register(
  firstName: string, 
  lastName: string, 
  email: string, 
  password: string, 
  confirmPassword: string, // Nuevo parámetro para confirmar la contraseña
  role?: number
): Promise<IRegisterResponse> {
  if (password !== confirmPassword) {
    throw new Error("Las contraseñas no coinciden");
  }

  return await this.authRepository.register(firstName, lastName, email, password, confirmPassword ,role);
}

  /**
   * Verifies if a user session is active based on the provided token.
   * 
   * @param {string} token - The token to verify.
   * @returns {Promise<IVerificarSesionActivaResponse>} - A promise that resolves to the session verification response.
   */
  async verifyActiveSession(token: string): Promise<IVerificarSesionActivaResponse> {
    return await this.authRepository.verifyActiveSession(token);
  }

  /**
   * Retrieves user information based on the provided token.
   * 
   * @param {string} token - The token to use for retrieving user information.
   * @returns {Promise<IObtenerUsuarioPorTokenResponse>} - A promise that resolves to the user information response.
   */
  async getUserByToken(token: string): Promise<IObtenerUsuarioPorTokenResponse> {
    return await this.authRepository.getUserByToken(token);
  }

  /**
   * Logs out the user, terminating the session.
   * 
   * @param {string} token - The token of the user to log out.
   * @returns {Promise<ICerrarSesionResponse>} - A promise that resolves to the logout response.
   */
  async logout(token: string): Promise<ICerrarSesionResponse> {
    return await this.authRepository.logout(token);
  }

  /**
   * Changes the user's password.
   * 
   * @param {string} correoUsuario - The email of the user whose password is to be changed.
   * @param {string} nuevaContrasena - The new password for the user.
   * @returns {Promise<IRequestPasswordResetResponse>} - A promise that resolves to the password change request response.
   */
  async CambiarContraseña(correoUsuario: string, nuevaContrasena: string): Promise<IRequestPasswordResetResponse> {
    return await this.authRepository.NEWPassword(correoUsuario, nuevaContrasena);
  }

  /**
   * Resets the user's password using a verification code.
   * 
   * @param {string} correoUsuario - The email of the user requesting the password reset.
   * @param {string} codigo - The verification code sent to the user.
   * @param {string} nuevaContrasena - The new password for the user.
   * @returns {Promise<IResetPasswordResponse>} - A promise that resolves to the password reset response.
   */
  async olvideContraseña(correoUsuario: string, codigo: string, nuevaContrasena: string): Promise<IResetPasswordResponse> {
    return await this.authRepository.resetPassword(correoUsuario, codigo, nuevaContrasena);
  }
}