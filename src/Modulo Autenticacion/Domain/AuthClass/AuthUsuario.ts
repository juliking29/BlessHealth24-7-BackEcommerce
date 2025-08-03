const jwt = require('jsonwebtoken');
import bcrypt from 'bcrypt';

import Usuario from "../../../ModuloUsuario/Domain/Usuario/Usuario"; // Adjust the import path as necessary
import { TokenPayload, ILoginCredentials, IRegisterData, IRecoverPasswordData, IAuthResponse, IResetPasswordResponse, IRequestPasswordResetResponse } from './interface/AuthInterfaces';

/**
 * AuthUsuario handles authentication-related operations,
 * including password hashing, token generation, and user management.
 */
export default class AuthUsuario {
  
  private secretKey: string; // Secret key for JWT
  private saltRounds: number; // Number of salt rounds for password hashing
  private usuario: Usuario; // User object

  /**
   * Constructor for AuthUsuario.
   * 
   * @param {string} secretKey - The secret key for JWT.
   * @param {number} saltRounds - The number of salt rounds for password hashing (default is 10).
   * @param {Usuario} usuario - The user object.
   */
  constructor(secretKey: string, saltRounds: number = 10, usuario: Usuario) {
    if (!secretKey) {
      throw new Error("La clave secreta (secretKey) no puede estar vacía.");
    }
    this.secretKey = secretKey;
    this.saltRounds = saltRounds;
    this.usuario = usuario;
  }

  /**
   * Hashes a password using bcrypt.
   * 
   * @param {string} password - The password to hash.
   * @returns {Promise<string>} - A promise that resolves to the hashed password.
   */
  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  /**
   * Compares a password with a hashed password.
   * 
   * @param {string} password - The password to compare.
   * @param {string} hash - The hashed password.
   * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, false otherwise.
   */
  public async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  /**
   * Generates a JWT token for the given payload.
   * 
   * @param {TokenPayload} payload - The payload to include in the token.
   * @param {string} expiresIn - The expiration time for the token (default is '1h').
   * @returns {string} - The generated JWT token.
   */
  public generateToken(payload: TokenPayload, expiresIn: string = '1h'): string {
    if (!this.secretKey) {
      throw new Error("La clave secreta (secretKey) no está definida.");
    }
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  /**
   * Verifies a JWT token and returns the decoded payload.
   * 
   * @param {string} token - The token to verify.
   * @returns {TokenPayload | null} - The decoded payload if valid, null otherwise.
   */
  public verifyToken(token: string): TokenPayload | null {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      if (typeof decoded === 'object' && decoded !== null && 'id' in decoded && 'rolId' in decoded) {
        return decoded as TokenPayload;
      }
      return null;
    } catch (error) {
      console.error("Error al verificar el token:", error);
      return null;
    }
  }

  // Getters and Setters
  public getUsuario(): Usuario {
    return this.usuario; // Returns the user object
  }

  public setUsuario(usuario: Usuario): void {
    this.usuario = usuario; // Sets the user object
  }

  public getLoginCredentials(): ILoginCredentials {
    return {
      email: this.usuario.getCorreo(),
      password: '', // Password should not be exposed
    };
  }

  public getRegisterData(): IRegisterData {
    return {
      nombre: this.usuario.getNombre(),
      apellido: this.usuario.getApellido(),
      email: this.usuario.getCorreo(),
      password: '', // Password should not be exposed
      rolId: this.usuario.getRolId(),
    };
  }

  public getRecoverPasswordData(): IRecoverPasswordData {
    return {
      email: this.usuario.getCorreo(),
    };
  }

  public getAuthResponse(token: string): IAuthResponse {
    const rolNombre = this.usuario.getRolId() === 1 ? 'admin' : 'usuario';
    return {
      active: true, // Or false based on your conditions
      token,
      usuario: {
        id: this.usuario.getId(),
        nombre: this.usuario.getNombre(),
        apellido: this.usuario.getApellido(),
        email: this.usuario.getCorreo(),
        rolId: this.usuario.getRolId(),
        rolNombre: rolNombre,
      },
      mensaje: 'Autenticación exitosa', // Or the message you need
    };
  }

  // Conversion methods for each interface
  public toAuthResponse(token: string): IAuthResponse {
    return this.getAuthResponse(token);
  }

  public toLoginCredentials(): ILoginCredentials {
    return this.getLoginCredentials();
  }

  public toRegisterData(): IRegisterData {
    return this.getRegisterData();
  }

  public toRecoverPasswordData(): IRecoverPasswordData {
    return this.getRecoverPasswordData();
  }

  public getRequestPasswordResetData(): IRequestPasswordResetResponse {
    if (!this.usuario.getCorreo()) {
      return {
        sucess: false,
        mensaje: "Correo electrónico no encontrado"
      };
    }

    return {
      sucess: true,
      mensaje: `Solicitud de restablecimiento de contraseña enviada al correo ${this.usuario.getCorreo()}`
    };
  }

  // New method to get reset password response data
  public getResetPasswordResponse(): IResetPasswordResponse {
    return {
      sucess: true,
      mensaje: "Contraseña restablecida correctamente"
    };
  }
}