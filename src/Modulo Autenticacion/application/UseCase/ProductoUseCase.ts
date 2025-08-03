import AuthServiceInterface from "../../Domain/Interfaces/AuthServiceInterface";
import { 
    IAuthResponse, 
    IRegisterResponse, 
    IVerificarSesionActivaResponse, 
    IObtenerUsuarioPorTokenResponse, 
    ICerrarSesionResponse, 
    IRequestPasswordResetResponse, 
    IResetPasswordResponse 
} from "../../Domain/AuthClass/interface/AuthInterfaces";
import NullAuthUsuario from "../../Domain/AuthClass/NullAuthUsuario";
import AuthServicePort from "../../Domain/Port/Driver/AuthServicePort";

/**
 * @class AuthUseCase
 * @implements {AuthServicePort}
 * 
 * This class implements the AuthServicePort interface and serves as a use case for user authentication and authorization.
 * It defines the logic for user login, registration, session verification, logout, password change, and password recovery.
 */
export default class AuthUseCase implements AuthServicePort {
    /**
     * Constructor to initialize AuthUseCase with an instance of AuthServiceInterface.
     * 
     * @param {AuthServiceInterface} authService - The authentication service interface.
     */
    constructor(private readonly authService: AuthServiceInterface) {}

    /**
     * Handles user login.
     * 
     * @param {string} correoUsuario - The user's email address.
     * @param {string} contrasenaUsuario - The user's password.
     * @returns {Promise<IAuthResponse>} - Returns the authentication response.
     */
    public async login(correoUsuario: string, contrasenaUsuario: string): Promise<IAuthResponse> {
        if (!correoUsuario || !contrasenaUsuario) {
            return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
        }
        const response = await this.authService.login(correoUsuario, contrasenaUsuario);
        return response || new NullAuthUsuario().getAuthResponse("NULL_TOKEN"); // Return NullAuthUsuario response if no valid response
    }

    /**
     * Handles user registration.
     * 
     * @param {string} nombre - The user's first name.
     * @param {string} apellido - The user's last name.
     * @param {string} correo - The user's email address.
     * @param {string} contrasena - The user's password.
     * @param {string} confirmarContrasena - The confirmation of the user's password.
     * @param {number} [rol] - The user's role (optional).
     * @returns {Promise<IRegisterResponse>} - Returns the registration response.
     * @throws {Error} - Throws an error if the passwords do not match.
     */
    public async register(
        nombre: string, 
        apellido: string, 
        correo: string, 
        contrasena: string, 
        confirmarContrasena: string, 
        rol?: number
    ): Promise<IRegisterResponse> {
        // ✅ Validate that fields are not empty
        if (!nombre || !apellido || !correo || !contrasena || !confirmarContrasena) {
            return new NullAuthUsuario().getRegisterData();
        }

        // ✅ Validate that passwords match
        if (contrasena !== confirmarContrasena) {
            throw new Error("Las contraseñas no coinciden");
        }

        const response = await this.authService.register(nombre, apellido, correo, contrasena, confirmarContrasena, rol);
        return response || new NullAuthUsuario().getRegisterData();
    }

    /**
     * Verifies if the user session is active.
     * 
     * @param {string} token - The user's session token.
     * @returns {Promise<IVerificarSesionActivaResponse>} - Returns the session verification response.
     */
    public async verificarSesionActiva(token: string): Promise<IVerificarSesionActivaResponse> {
        if (!token) {
            new NullAuthUsuario().getAuthResponse(token);
        }
        const response = await this.authService.verifyActiveSession(token);
        return response || new NullAuthUsuario().getAuthResponse(token); 
    }

    /**
     * Retrieves user information based on the provided token.
     * 
     * @param {string} token - The user's session token.
     * @returns {Promise<IObtenerUsuarioPorTokenResponse>} - Returns the user information response.
     */
    public async obtenerUsuarioPorToken(token: string): Promise<IObtenerUsuarioPorTokenResponse> {
        if (!token) {
            new NullAuthUsuario().getAuthResponse(token);
        }
        const response = await this.authService.getUserByToken(token);
        return response || new NullAuthUsuario().getUsuario(); 
    }

    /**
     * Handles user logout.
     * 
     * @param {string} token - The user's session token.
     * @returns {Promise<ICerrarSesionResponse>} - Returns the logout response.
     */
    public async cerrarSesion(token: string): Promise<ICerrarSesionResponse> {
        if (!token) {
            new NullAuthUsuario().getAuthResponse(token); 
        }
        const response = await this.authService.logout(token);
        return response || new NullAuthUsuario().getAuthResponse(token); 
    }

    /**
     * Changes the user's password.
     * 
     * @param {string} correoUsuario - The user's email address.
     * @param {string} nuevaContrasena - The new password.
     * @returns {Promise<IRequestPasswordResetResponse>} - Returns the password change response.
     */
    public async CambiarContraseña(correoUsuario: string, nuevaContrasena: string): Promise<IRequestPasswordResetResponse> {
        if (!correoUsuario) {
            new NullAuthUsuario().getResetPasswordResponse();
        }
        if (!nuevaContrasena) {
            new NullAuthUsuario().getResetPasswordResponse();
        }
        
        const response = await this.authService.CambiarContraseña(correoUsuario, nuevaContrasena);
        return response || new NullAuthUsuario().getResetPasswordResponse();
    }
  
    /**
     * Handles password recovery.
     * 
     * @param {string} correoUsuario - The user's email address.
     * @param {string} codigo - The recovery code.
     * @param {string} nuevaContrasena - The new password.
     * @returns {Promise<IResetPasswordResponse>} - Returns the password recovery response.
     */
    public async OlvideContarseña(correoUsuario: string, codigo: string, nuevaContrasena: string): Promise<IResetPasswordResponse> {
        if (!correoUsuario || !codigo || !nuevaContrasena) {
            new NullAuthUsuario().getResetPasswordResponse();
        }
        const response = await this.authService.olvideContraseña(correoUsuario, codigo, nuevaContrasena);
        return response || new NullAuthUsuario().getResetPasswordResponse();
    }
}
