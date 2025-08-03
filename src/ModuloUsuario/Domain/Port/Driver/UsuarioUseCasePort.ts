/**
 * UsuarioUseCasePort is an interface that defines the use case methods
 * for user management within the application.
 */
import { IRespuestaUsuario, IUsuarioInfo } from "../../Usuario/interfaces/UsuarioInterfaces";

export default interface UsuarioUseCasePort {
  
  /**
   * verMiCuentaPorId
   * 
   * Returns the account information of a user based on their ID.
   * 
   * @param {number} idUsuario - The ID of the user whose account is to be viewed.
   * @returns {Promise<IUsuarioInfo>} - A promise that resolves to the user's information.
   */
  verMiCuentaPorId(idUsuario: number): Promise<IUsuarioInfo>;

  /**
   * verMiCuentaPorCorreo
   * 
   * Returns the account information of a user based on their email.
   * 
   * @param {string} Correo - The email of the user whose account is to be viewed.
   * @returns {Promise<IUsuarioInfo>} - A promise that resolves to the user's information.
   */
  verMiCuentaPorCorreo(Correo: string): Promise<IUsuarioInfo>;

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
   * Deletes a specific user from the database.
   * 
   * @param {number} idUsuario - The ID of the user to be deleted.
   * @returns {Promise<IRespuestaUsuario>} - A promise that resolves to the response of the operation.
   */
  eliminarUsuario(idUsuario: number): Promise<IRespuestaUsuario>;
}