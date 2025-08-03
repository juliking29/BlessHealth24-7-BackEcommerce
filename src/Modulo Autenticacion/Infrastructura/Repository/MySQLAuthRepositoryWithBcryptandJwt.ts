import { IAuthRepository } from "../../Domain/Port/Driven/IAuthRepository";
import { IVerificarSesionActivaResponse, IObtenerUsuarioPorTokenResponse, ICerrarSesionResponse, IAuthResponse, IRegisterResponse, IResetPasswordResponse } from "../../Domain/AuthClass/interface/AuthInterfaces";
import NullAuthUsuario from "../../Domain/AuthClass/NullAuthUsuario";
import { IJWTService } from "../../../jwt/domain/IJWTService";
import { MySQLAuthQueries } from "../../../Mysql/infrastructura/Queries/MySQLAuthQueries";
import { IBcryptService } from "../../../Bycript/Domain/IBcryptService";

/**
 * MySQLAuthRepositoryWithBcryptandJwt implements the IAuthRepository,
 * providing methods for managing authentication data operations
 * using MySQL, bcrypt for password hashing, and JWT for token management.
 */
export class MySQLAuthRepositoryWithBcryptandJwt implements IAuthRepository {
  
  constructor(
    private readonly authQueries: MySQLAuthQueries, // MySQL queries for authentication
    private readonly jwtService: IJWTService, // JWT service for token management
    private readonly bcryptService: IBcryptService // Bcrypt service for password hashing
  ) {}

  /**
   * Logs out the user, terminating the session.
   * 
   * @param {string} token - The token of the user to log out.
   * @returns {Promise<ICerrarSesionResponse>} - A promise that resolves to the logout response.
   */
  public async logout(token: string): Promise<ICerrarSesionResponse> {
    try {
      if (!token) {
        return new NullAuthUsuario().getAuthResponse("NULL_TOKEN"); // Return null response if token is missing
      }

      const decoded = this.jwtService.verifyToken(token) as { idUsuario: number };
      if (!decoded || !decoded.idUsuario) {
        return new NullAuthUsuario().getAuthResponse("NULL_TOKEN"); // Return null response if token is invalid
      }

      const rows = await this.authQueries.findSession(token);
      if (rows.length === 0) {
        return new NullAuthUsuario().getAuthResponse("NULL_TOKEN"); // Return null response if session not found
      }

      await this.authQueries.deleteSession(token); // Delete the session
      return { mensaje: "Sesión cerrada exitosamente." } as ICerrarSesionResponse; // Return success message
    } catch (error) {
      console.error("Error durante logout:", error);
      return new NullAuthUsuario().getAuthResponse("NULL_TOKEN"); // Return null response in case of error
    }
  }

  /**
   * Logs in a user with the provided email and password.
   * 
   * @param {string} correoUsuario - The email of the user.
   * @param {string} contrasenaUsuario - The password of the user.
   * @returns {Promise<IAuthResponse>} - A promise that resolves to the authentication response.
   */
  public async login(correoUsuario: string, contrasenaUsuario: string): Promise<IAuthResponse> {
    try {
      if (!correoUsuario || !contrasenaUsuario) {
        return new NullAuthUsuario().getAuthResponse("NULL_TOKEN"); // Return null response if credentials are missing
      }

      const rows = await this.authQueries.findUserByEmail(correoUsuario);
      console.log("Usuario encontrado:", rows);
      if (!Array.isArray(rows) || rows.length === 0) {
        return new NullAuthUsuario().getAuthResponse("NULL_TOKEN"); // Return null response if user not found
      }

      const usuario = rows[0];
      if (usuario.estadoUsuario !== 1) {
        return new NullAuthUsuario().getAuthResponse("NULL_TOKEN"); // Return null response if user is inactive
      }

      const passwordCorrecta = await this.bcryptService.comparePassword(contrasenaUsuario, usuario.contrasenaUsuario);
      console.log("Contraseña correcta:", passwordCorrecta);
      if (!passwordCorrecta) {
        return new NullAuthUsuario().getAuthResponse("NULL_TOKEN"); // Return null response if password is incorrect
      }

      const rolUsuario = usuario.rol_id === 1 ? 'admin' : 'usuario';
      const token = this.jwtService.generateToken({
        idUsuario: usuario.idUsuario,
        rol: rolUsuario,
        correo: usuario.correoUsuario
      });
      console.log("Token generado:", token);

      await this.authQueries.insertSession(usuario.idUsuario, token); // Insert the session into the database
      return {
        token,
        active: true,
        usuario: {
          id: usuario.idUsuario,
          nombre: usuario.nombreUsuario,
          apellido: usuario.apellidoUsuario,
          email: usuario.correoUsuario,
          rolId: usuario.rol_id,
          rolNombre: usuario.rolNombre
        },
        mensaje: "Login exitoso"
      } as IAuthResponse; // Return the authentication response
    } catch (error) {
      console.error("Error durante login:", error);
      return new NullAuthUsuario().getAuthResponse("NULL_TOKEN"); // Return null response in case of error
    }
  }

  /**
   * Registers a new user with the provided details.
   * 
   * @param {string} nombre - The first name of the user.
   * @param {string} apellido - The last name of the user.
   * @param {string} correo - The email of the user.
   * @param {string} contrasena - The password of the user.
   * @param {number} rol - The role ID for the user.
   * @returns {Promise<IRegisterResponse>} - A promise that resolves to the registration response.
   */
  public async register(
    nombre: string,
    apellido: string,
    correo: string,
    contrasena: string,
    confirmarContrasena: string, // Nuevo campo para confirmar contraseña
    rol: number
  ): Promise<IRegisterResponse> {
    try {
      // Validar que todos los campos requeridos estén presentes
      if (!nombre || !apellido || !correo || !contrasena || !confirmarContrasena) {
        return {
          success: false,
          mensaje: "Todos los campos son obligatorios"
        } as IRegisterResponse;
      }
  
      // Validar que las contraseñas coincidan
      if (contrasena !== confirmarContrasena) {
        return {
          success: false,
          mensaje: "Las contraseñas no coinciden"
        } as IRegisterResponse;
      }
  
      // Validar que la contraseña tenga al menos 6 caracteres
      if (contrasena.trim().length < 6) {
        return {
          success: false,
          mensaje: "La contraseña debe tener al menos 6 caracteres"
        } as IRegisterResponse;
      }
  
      // Verificar si el usuario ya está registrado por correo electrónico
      const rows = await this.authQueries.findUserByEmail(correo);
      if (rows.length > 0) {
        return {
          success: false,
          mensaje: "El correo electrónico ya está registrado"
        } as IRegisterResponse;
      }
  
      // Hashear la contraseña antes de guardar en la base de datos
      const hashedPassword = await this.bcryptService.hashPassword(contrasena);
  
      // Insertar el nuevo usuario
      const result = await this.authQueries.insertUser(
        nombre,
        apellido,
        correo,
        hashedPassword,
        1, // Estado activo por defecto
        rol || null
      );
  
      // Verificar si la inserción fue exitosa
      if (result[0]?.affectedRows === 0) {
        return {
          success: false,
          mensaje: "Error al registrar el usuario"
        } as IRegisterResponse;
      }
  
      return {
        success: true,
        mensaje: "Usuario registrado exitosamente"
      } as IRegisterResponse;
  
    } catch (error) {
      console.error("Error durante el registro:", error);
      return {
        success: false,
        mensaje: "Ocurrió un error en el servidor"
      } as IRegisterResponse;
    }
  }
  

  /**
   * Verifies if a user session is active based on the provided token.
   * 
   * @param {string} token - The token to verify.
   * @returns {Promise<IVerificarSesionActivaResponse>} - A promise that resolves to the session verification response.
   */
  public async verifyActiveSession(token: string): Promise<IVerificarSesionActivaResponse> {
    try {
      if (!token) {
        return new NullAuthUsuario().getAuthResponse(token); // Return null response if token is missing
      }

      const decoded = this.jwtService.verifyToken(token) as { idUsuario: number; rol: string; correo: string };
      if (!decoded || !decoded.idUsuario) {
        return new NullAuthUsuario().getAuthResponse(token); // Return null response if token is invalid
      }

      const rows = await this.authQueries.findSession(token);
      if (rows.length === 0) {
        return new NullAuthUsuario().getAuthResponse(token); // Return null response if session not found
      }

      const userData = await this.authQueries.getUserById(decoded.idUsuario);
      if (userData.length === 0) {
        return new NullAuthUsuario().getAuthResponse(token); // Return null response if user not found
      }

      const usuario = userData[0];
      return {
        active: true,
        usuario: {
          id: usuario.idUsuario,
          nombre: usuario.nombreUsuario,
          apellido: usuario.apellidoUsuario,
          email: usuario.correoUsuario,
          rolId: usuario.rol_id,
          rolNombre: usuario.rolNombre
        },
        token: token,
        mensaje: "Sesión activa."
      } as IVerificarSesionActivaResponse; // Return active session response
    } catch (error) {
      console.error("Error al verificar sesión activa:", error);
      return new NullAuthUsuario().getAuthResponse(token); // Return null response in case of error
    }
  }

  /**
   * Retrieves user information based on the provided token.
   * 
   * @param {string} token - The token to use for retrieving user information.
   * @returns {Promise<IObtenerUsuarioPorTokenResponse>} - A promise that resolves to the user information response.
   */
  public async getUserByToken(token: string): Promise<IObtenerUsuarioPorTokenResponse> {
    try {
      const decoded = this.jwtService.verifyToken(token) as { 
        idUsuario: number; 
        rol?: string; 
        correo: string; 
      };

      if (!decoded.idUsuario || !decoded.correo) {
        throw new Error('Token inválido: faltan datos obligatorios.'); // Throw error if token is invalid
      }

      const rows = await this.authQueries.findSession(token);
      if (rows.length === 0) {
        throw new Error('Token no encontrado en la base de datos.'); // Throw error if session not found
      }

      const rolId = decoded.rol === 'admin' ? 1 : 2; // Assign role ID based on role
      return {
        id: decoded.idUsuario,
        correo: decoded.correo,
        rolId: rolId // Return user data
      } as IObtenerUsuarioPorTokenResponse;
    } catch (error) {
      console.error('Error al verificar el token:', error);
      throw new Error('Token inválido.'); // Throw error if token is invalid
    }
  }

  /**
   * Changes the user's password.
   * 
   * @param {string} correoUsuario - The email of the user whose password is to be changed.
   * @param {string} nuevaContrasena - The new password for the user.
   * @returns {Promise<IResetPasswordResponse>} - A promise that resolves to the password change response.
   */
  public async NEWPassword(correoUsuario: string, nuevaContrasena: string): Promise<IResetPasswordResponse> {
    try {
      const rows = await this.authQueries.findUserByEmail(correoUsuario);
      if (rows.length === 0) {
        return new NullAuthUsuario().getResetPasswordResponse(); // Return null response if user not found
      }

      await this.authQueries.updateUserPassword(correoUsuario, nuevaContrasena); // Update the user's password
      return { mensaje: "Contraseña cambiada exitosamente." } as IResetPasswordResponse; // Return success message
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      return new NullAuthUsuario().getResetPasswordResponse(); // Return null response in case of error
    }
  }

  /**
   * Resets the user's password using a verification code.
   * 
   * @param {string} correoUsuario - The email of the user requesting the password reset.
   * @param {string} codigo - The verification code sent to the user.
   * @param {string} nuevaContrasena - The new password for the user.
   * @returns {Promise<IResetPasswordResponse>} - A promise that resolves to the password reset response.
   */
  public async resetPassword(correoUsuario: string, codigo: string, nuevaContrasena: string): Promise<IResetPasswordResponse> {
    try {
      const codigoCorrecto = "1234"; // Simulated correct code
      if (codigo !== codigoCorrecto) {
        return new NullAuthUsuario().getResetPasswordResponse(); // Return null response if code is incorrect
      }

      const rows = await this.authQueries.findUserByEmail(correoUsuario);
      if (rows.length === 0) {
        return new NullAuthUsuario().getResetPasswordResponse(); // Return null response if user not found
      }

      await this.authQueries.updateUserPassword(correoUsuario, nuevaContrasena); // Update the user's password
      return { mensaje: "Contraseña cambiada exitosamente." } as IResetPasswordResponse; // Return success message
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      return new NullAuthUsuario().getResetPasswordResponse(); // Return null response in case of error
    }
  }
}