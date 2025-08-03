import { IUsuarioInfo } from "../../Domain/Usuario/interfaces/UsuarioInterfaces";
import { IUsuarioRepository } from "../../Domain/Port/Driven/IUsuarioRepository";
import UsuarioServiceInterface from "../../Domain/interfaces/UsuarioServiceInterface";
import { IRespuestaUsuario } from "../../Domain/Usuario/interfaces/UsuarioInterfaces";

/**
 * UsuarioService implements the UsuarioServiceInterface,
 * providing methods for user-related operations by interacting
 * with the user repository.
 */
export default class UsuarioService implements UsuarioServiceInterface {
  
  /**
   * Constructor for UsuarioService.
   * 
   * @param {IUsuarioRepository} usuarioRepository - An instance of the user repository for data access.
   */
  constructor(private readonly usuarioRepository: IUsuarioRepository) {}

  /**
   * verMiCuentaPorId
   * 
   * Retrieves the account information of a user based on their ID.
   * 
   * @param {number} idUsuario - The ID of the user whose account information is to be retrieved.
   * @returns {Promise<IUsuarioInfo | null>} - A promise that resolves to the user's information or null if the ID is invalid or not found.
   */
  async verMiCuentaPorId(idUsuario: number): Promise<IUsuarioInfo | null> {
    if (!idUsuario || idUsuario <= 0) {
      return null; 
    }
    return await this.usuarioRepository.verMiCuentaId(idUsuario);
  }

  /**
   * verMiCuentaPorCorreo
   * 
   * Retrieves the account information of a user based on their email.
   * 
   * @param {string} correo - The email of the user whose account information is to be retrieved.
   * @returns {Promise<IUsuarioInfo | null>} - A promise that resolves to the user's information or null if the email is invalid or not found.
   */
  async verMiCuentaPorCorreo(correo: string): Promise<IUsuarioInfo | null> {
    if (!correo || correo.trim() === "") {
      return null; 
    }
    return await this.usuarioRepository.verMiCuentaCorreo(correo);
  }

  /**
   * cambiarRolUsuario
   * 
   * Changes the role of a specific user.
   * 
   * @param {number} idUsuario - The ID of the user whose role is to be changed.
   * @param {number} nuevoRol - The new role to be assigned to the user.
   * @returns {Promise<IRespuestaUsuario>} - A promise that resolves to the response of the operation.
   */
  async cambiarRolUsuario(idUsuario: number, nuevoRol: number): Promise<IRespuestaUsuario> {
    return await this.usuarioRepository.cambiarRolUsuario(idUsuario, nuevoRol);
  }

  /**
   * eliminarUsuario
   * 
   * Deletes a specific user from the system.
   * 
   * @param {number} idUsuario - The ID of the user to be deleted.
   * @returns {Promise<IRespuestaUsuario>} - A promise that resolves to the response of the operation.
   */
  async eliminarUsuario(idUsuario: number): Promise<IRespuestaUsuario> {
    return await this.usuarioRepository.eliminarUsuario(idUsuario);
  }
}