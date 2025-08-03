import UsuarioServiceInterface from "../Domain/interfaces/UsuarioServiceInterface";
import UsuariotoUseCasePort from "../Domain/Port/Driver/UsuarioUseCasePort";
import { IUsuarioInfo } from "../Domain/Usuario/interfaces/UsuarioInterfaces";
import NullUsuario from "../Domain/Usuario/NullUsuario";
import { IRespuestaUsuario } from "../Domain/Usuario/interfaces/UsuarioInterfaces"; // Ensure the path is correct

/**
 * UsuarioUseCase implements the UsuariotoUseCasePort interface,
 * providing use case methods for user-related operations.
 * It interacts with the UsuarioService to perform actions related to user accounts.
 */
export default class UsuarioUseCase implements UsuariotoUseCasePort {
  
  /**
   * Constructor for UsuarioUseCase.
   * 
   * @param {UsuarioServiceInterface} usuarioService - An instance of the user service for business logic.
   */
  constructor(private readonly usuarioService: UsuarioServiceInterface) {}

  /**
   * verMiCuentaPorId
   * 
   * Retrieves the account information of a user based on their ID.
   * If the user is not found, returns a NullUsuario object.
   * 
   * @param {number} idUsuario - The ID of the user whose account information is to be retrieved.
   * @returns {Promise<IUsuarioInfo>} - A promise that resolves to the user's information or a NullUsuario object.
   */
  public async verMiCuentaPorId(idUsuario: number): Promise<IUsuarioInfo> {
    const usuario = await this.usuarioService.verMiCuentaPorId(idUsuario);

    if (!usuario) {
      return new NullUsuario().toInfo();
    }

    return usuario;
  }

  /**
   * verMiCuentaPorCorreo
   * 
   * Retrieves the account information of a user based on their email.
   * If the user is not found, returns a NullUsuario object.
   * 
   * @param {string} correo - The email of the user whose account information is to be retrieved.
   * @returns {Promise<IUsuarioInfo>} - A promise that resolves to the user's information or a NullUsuario object.
   */
  public async verMiCuentaPorCorreo(correo: string): Promise<IUsuarioInfo> {
    const usuario = await this.usuarioService.verMiCuentaPorCorreo(correo);

    if (!usuario) {
      return new NullUsuario().toInfo(); 
    }

    return usuario;
  }

  /**
   * cambiarRolUsuario
   * 
   * Changes the role of a specific user.
   * If the user ID or new role is invalid, returns a message from a NullUsuario object.
   * 
   * @param {number} idUsuario - The ID of the user whose role is to be changed.
   * @param {number} nuevoRol - The new role to be assigned to the user.
   * @returns {Promise<IRespuestaUsuario>} - A promise that resolves to the response of the operation.
   */
  public async cambiarRolUsuario(idUsuario: number, nuevoRol: number): Promise<IRespuestaUsuario> {
    if (!idUsuario || idUsuario <= 0 || !nuevoRol) {
      return new NullUsuario().toInfomessege(); 
    }
    return await this.usuarioService.cambiarRolUsuario(idUsuario, nuevoRol);
  }

  /**
   * eliminarUsuario
   * 
   * Deletes a specific user from the system.
   * If the user ID is invalid, returns a message from a NullUsuario object.
   * 
   * @param {number} idUsuario - The ID of the user to be deleted.
   * @returns {Promise<IRespuestaUsuario>} - A promise that resolves to the response of the operation.
   */
  public async eliminarUsuario(idUsuario: number): Promise<IRespuestaUsuario> {
    if (!idUsuario || idUsuario <= 0) {
      return new NullUsuario().toInfomessege(); 
    }
    return await this.usuarioService.eliminarUsuario(idUsuario);
  }
}