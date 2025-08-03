/**
 * IUsuarioRepository is an interface that extends RepositoryInterface,
 * defining specific methods for user management within the application.
 * 
 * @extends RepositoryInterface
 */
import RepositoryInterface from "../../../../repository/domain/RepositoryInterface";
import { IRespuestaUsuario, IUsuarioInfo } from "../../Usuario/interfaces/UsuarioInterfaces";

export interface IUsuarioRepository extends RepositoryInterface {
  
  /**
   * verMiCuentaId
   * 
   * Returns the account information of a user based on their ID.
   * 
   * @param {number} idUsuario - The ID of the user whose account is to be viewed.
   * @returns {Promise<IUsuarioInfo>} - A promise that resolves to the user's information.
   */
  verMiCuentaId(idUsuario: number): Promise<IUsuarioInfo>;

  /**
   * verMiCuentaCorreo
   * 
   * Returns the account information of a user based on their email.
   * 
   * @param {string} correo - The email of the user whose account is to be viewed.
   * @returns {Promise<IUsuarioInfo>} - A promise that resolves to the user's information.
   */
  verMiCuentaCorreo(correo: string): Promise<IUsuarioInfo>;

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