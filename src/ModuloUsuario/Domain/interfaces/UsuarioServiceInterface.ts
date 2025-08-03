import { IUsuarioInfo } from "../Usuario/interfaces/UsuarioInterfaces";
import { IRespuestaUsuario } from "../Usuario/interfaces/UsuarioInterfaces"; // Ensure the path is correct

/**
 * UsuarioServiceInterface defines the methods for user-related operations
 * in the service layer of the application. It provides an abstraction for
 * managing user accounts and roles.
 */
export default interface UsuarioServiceInterface {
  
  /**
   * verMiCuentaPorId
   * 
   * Retrieves the account information of a user based on their ID.
   * 
   * @param {number} idUsuario - The ID of the user whose account information is to be retrieved.
   * @returns {Promise<IUsuarioInfo | null>} - A promise that resolves to the user's information or null if not found.
   */
  verMiCuentaPorId(idUsuario: number): Promise<IUsuarioInfo | null>;

  /**
   * verMiCuentaPorCorreo
   * 
   * Retrieves the account information of a user based on their email.
   * 
   * @param {string} correo - The email of the user whose account information is to be retrieved.
   * @returns {Promise<IUsuarioInfo | null>} - A promise that resolves to the user's information or null if not found.
   */
  verMiCuentaPorCorreo(correo: string): Promise<IUsuarioInfo | null>;

  /**
   * cambiarRolUsuario
   * 
   * Changes the role of a specific user.
   * 
   * @param {number} idUsuario - The ID of the user whose role is to be changed.
   * @param {number} nuevoRol - The new role to be assigned to the user.
   * @returns {Promise<IRespuestaUsuario>} - A promise that resolves to the response of the operation.
   */
  cambiarRolUsuario(idUsuario: number, nuevoRol: number): Promise<IRespuestaUsuario>;

  /**
   * eliminarUsuario
   * 
   * Deletes a specific user from the system.
   * 
   * @param {number} idUsuario - The ID of the user to be deleted.
   * @returns {Promise<IRespuestaUsuario>} - A promise that resolves to the response of the operation.
   */
  eliminarUsuario(idUsuario: number): Promise<IRespuestaUsuario>;
}