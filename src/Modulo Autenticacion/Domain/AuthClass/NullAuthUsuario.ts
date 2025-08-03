import AuthUsuario from './AuthUsuario'; // Adjust the import path as necessary
import NullUsuario from '../../../ModuloUsuario/Domain/Usuario/NullUsuario'; // Adjust the import path as necessary
import { IAuthResponse, ILoginCredentials, IRecoverPasswordData, IRegisterData, IRegisterResponse, IRequestPasswordResetResponse, IResetPasswordResponse } from './interface/AuthInterfaces';

/**
 * NullAuthUsuario represents a null object for authentication,
 * implementing the Null Object pattern to avoid null references.
 */
export default class NullAuthUsuario extends AuthUsuario {
  
  /**
   * Constructor for NullAuthUsuario.
   * Initializes with a placeholder secret key and a NullUsuario instance.
   */
  constructor() {
    super("NULL_SECRET_KEY", 10, new NullUsuario()); // Use a placeholder for the secret key and a new NullUsuario instance
  }

  /**
   * Checks if the authentication object is a null object.
   * 
   * @returns {boolean} - Always returns true for NullAuthUsuario.
   */
  public isNull(): boolean {
    return true;
  }

  /**
   * Converts the NullAuthUsuario object to a string representation.
   * 
   * @returns {string} - The string "NullAuthUsuario".
   */
  public override toString(): string {
    return "NullAuthUsuario";
  }

  /**
   * Retrieves login credentials for the null user.
   * 
   * @returns {ILoginCredentials} - An object containing placeholder email and password.
   */
  public override getLoginCredentials(): ILoginCredentials {
    return {
      email: "NULL",
      password: '', // Password should not be exposed
    };
  }

  /**
   * Retrieves registration data for the null user.
   * 
   * @returns {IRegisterData & IRegisterResponse} - An object containing placeholder registration data and error messages.
   */
  public override getRegisterData(): IRegisterData & IRegisterResponse {
    return {
      nombre: "NULL",
      apellido: "NULL",
      email: "NULL",
      password: '', 
      rolId: 0,
      mensaje: "Datos inválidos", 
      error: "Faltan datos requeridos", 
      success: false
    };
  }

  /**
   * Retrieves password recovery data for the null user.
   * 
   * @returns {IRecoverPasswordData} - An object containing a placeholder email.
   */
  public override getRecoverPasswordData(): IRecoverPasswordData {
    return {
      email: "NULL",
    };
  }

  /**
   * Retrieves the authentication response for the null user.
   * 
   * @param {string} _token - The token (not used in this case).
   * @returns {IAuthResponse} - An object containing placeholder user data and a message.
   */
  public override getAuthResponse(_token: string): IAuthResponse {
    return {
      active: false,
      token: "NULL_TOKEN",
      usuario: {
        id: 0,
        nombre: "NULL",
        apellido: "NULL",
        email: "NULL",
        rolId: 0,
        rolNombre: "NULL",
      },
      mensaje: "null"
    };
  }

  /**
   * Generates a token for the null user.
   * 
   * @param {any} _payload - The payload (not used in this case).
   * @param {string} _expiresIn - The expiration time for the token (default is '1h').
   * @returns {string} - A placeholder token.
   */
  public override generateToken(_payload: any, _expiresIn: string = '1h'): string {
    return "NULL_TOKEN"; // Return a placeholder token
  }

  /**
   * Verifies a token for the null user.
   * 
   * @param {string} _token - The token to verify (not used in this case).
   * @returns {null} - Always returns null for verification.
   */
  public override verifyToken(_token: string): null {
    return null; // Return null for verification
  }

  /**
   * Retrieves request password reset data for the null user.
   * 
   * @returns {IRequestPasswordResetResponse} - An object indicating the request is invalid.
   */
  public override getRequestPasswordResetData(): IRequestPasswordResetResponse {
    return {
      sucess: false,
      mensaje: "Solicitud de restablecimiento de contraseña inválida"
    };
  }

  /**
   * Retrieves reset password response data for the null user.
   * 
   * @returns {IResetPasswordResponse} - An object indicating the reset request is invalid.
   */
  public override getResetPasswordResponse(): IResetPasswordResponse {
    return {
      sucess: false,
      mensaje: "Restablecimiento de contraseña inválido"
    };
  }
}