import { Request, Response } from "express";
import AuthUseCasePort from "../../Domain/Port/Driver/AuthServicePort";
import AuthControllerExpressInterface from "../../Domain/Interfaces/AuthControllerExpressInterface";

/**
 * AuthControllerExpress handles HTTP requests related to authentication operations
 * in an Express application.
 */
export default class AuthControllerExpress implements AuthControllerExpressInterface {
  
  constructor(private readonly authUseCase: AuthUseCasePort) {}

   /**
   * Registers a new user.
   * 
   * @param {Request} req - The HTTP request object containing user registration data.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async registrarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, apellido, correo, contrasena, confirmarContrasena, rol } = req.body;

      // ✅ Validar que los campos obligatorios estén completos
      if (!nombre || !apellido || !correo || !contrasena || !confirmarContrasena) {
        res.status(400).json({ error: "Faltan datos: nombre, apellido, correo, contraseña y confirmación de contraseña son obligatorios." });
        return;
      }

      // ✅ Validar que la contraseña y la confirmación coincidan
      if (contrasena !== confirmarContrasena) {
        res.status(400).json({ error: "Las contraseñas no coinciden." });
        return;
      }

      // ✅ Llamar al caso de uso para registrar el usuario
      const response = await this.authUseCase.register(nombre, apellido, correo, contrasena, confirmarContrasena, rol);
      res.status(201).json(response);
    } catch (error: unknown) {
      console.error("Error en registrarUsuario:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }

  // Log in
  /**
   * Initiates a user session (login).
   * 
   * @param {Request} req - The HTTP request object containing login credentials.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async iniciarSesion(req: Request, res: Response): Promise<void> {
    try {
      const { correoUsuario, contrasenaUsuario } = req.body;

      if (!correoUsuario || !contrasenaUsuario) {
        res.status(400).json({ error: "Faltan datos: correo y contraseña son obligatorios." });
        return;
      }

      const response = await this.authUseCase.login(correoUsuario, contrasenaUsuario);
      res.status(200).json(response);
    } catch (error: unknown) {
      console.error("Error en iniciarSesion:", error);
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }

  // Verify active session
  /**
   * Verifies if a user session is active.
   * 
   * @param {Request} req - The HTTP request object containing the token.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async verificarSesionActiva(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.body;

      if (!token) {
        res.status(400).json({ error: "Falta el token." });
        return;
      }

      const payload = await this.authUseCase.verificarSesionActiva(token);

      if (!payload) {
        res.status(401).json({ error: "Token inválido o expirado." });
        return;
      }

      res.status(200).json(payload);
    } catch (error: unknown) {
      console.error("Error en verificarSesionActiva:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }

  // Get user by token
  /**
   * Retrieves user information based on the provided token.
   * 
   * @param {Request} req - The HTTP request object containing the token.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async obtenerUsuarioPorToken(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.body;

      if (!token) {
        res.status(400).json({ error: "Falta el token." });
        return;
      }

      const usuario = await this.authUseCase.obtenerUsuarioPorToken(token);
      res.status(200).json(usuario);
    } catch (error: unknown) {
      console.error("Error en obtenerUsuarioPorToken:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }

  // Logout
  /**
   * Logs out the user, terminating the session.
   * 
   * @param {Request} req - The HTTP request object containing the token.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async logout(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.body;

      if (!token) {
        res.status(400).json({ error: "Falta el token." });
        return;
      }

      const response = await this.authUseCase.cerrarSesion(token);
      res.status(200).json(response);
    } catch (error: unknown) {
      console.error("Error en logout:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }

  // Reset password
  /**
   * Resets the user's password.
   * 
   * @param {Request} req - The HTTP request object containing password reset data.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async restablecerContrasena(req: Request, res: Response): Promise<void> {
    try {
      const { correoUsuario, codigo, nuevaContrasena } = req.body;

      if (!correoUsuario || !codigo || !nuevaContrasena) {
        res.status(400).json({ error: "Faltan datos: correo, código y nueva contraseña son obligatorios." });
        return;
      }

      const response = await this.authUseCase.OlvideContarseña(correoUsuario, codigo, nuevaContrasena);
      res.status(200).json(response);
    } catch (error: unknown) {
      console.error("Error en restablecerContrasena:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }

  // Change new password
  /**
   * Changes the user's password to a new one.
   * 
   * @param {Request} req - The HTTP request object containing new password data.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async cambiarNuevaContrasena(req: Request, res: Response): Promise<void> {
    try {
      const { correoUsuario, nuevaContrasena } = req.body;

      if (!correoUsuario || !nuevaContrasena) {
        res.status(400).json({ error: "Faltan datos: correo y nueva contraseña son obligatorios." });
        return;
      }

      const response = await this.authUseCase.CambiarContraseña(correoUsuario, nuevaContrasena);
      res.status(200).json(response);
    } catch (error: unknown) {
      console.error("Error en cambiarNuevaContrasena:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }
}