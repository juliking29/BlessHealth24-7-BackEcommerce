import { MySQLUsuarioQueries } from '../../../Mysql/infrastructura/Queries/MySQLUsuarioQueries';
import { IUsuarioRepository } from '../../Domain/Port/Driven/IUsuarioRepository';
import { IRespuestaUsuario, IUsuarioInfo, UsuarioInterface } from '../../Domain/Usuario/interfaces/UsuarioInterfaces';
import NullUsuario from '../../Domain/Usuario/NullUsuario';
import Usuario from '../../Domain/Usuario/Usuario'; 

/**
 * MySQLUsuarioRepository implements the IUsuarioRepository interface,
 * providing methods for user-related operations using MySQL as the data source.
 */
export class MySQLUsuarioRepository implements IUsuarioRepository {
  
  /**
   * Constructor for MySQLUsuarioRepository.
   * 
   * @param {MySQLUsuarioQueries} usuarioQueries - An instance of MySQLUsuarioQueries for database operations.
   */
  constructor(private readonly usuarioQueries: MySQLUsuarioQueries) {}

  /**
   * verMiCuentaId
   * 
   * Retrieves the account information of a user based on their ID.
   * If the user is not found, returns a NullUsuario object.
   * 
   * @param {number} idUsuario - The ID of the user whose account information is to be retrieved.
   * @returns {Promise<IUsuarioInfo>} - A promise that resolves to the user's information or a NullUsuario object.
   */
  async verMiCuentaId(idUsuario: number): Promise<IUsuarioInfo> {
    const rows = await this.usuarioQueries.findById(idUsuario);

    if (!rows || rows.length === 0) {
      return new NullUsuario().toInfo(); 
    }

    const nuevoUsuario = new Usuario(rows[0]);
    return nuevoUsuario.toInfo(); 
  }

  /**
   * verMiCuentaCorreo
   * 
   * Retrieves the account information of a user based on their email.
   * If the user is not found, returns a NullUsuario object.
   * 
   * @param {string} correo - The email of the user whose account information is to be retrieved.
   * @returns {Promise<IUsuarioInfo>} - A promise that resolves to the user's information or a NullUsuario object.
   */
  async verMiCuentaCorreo(correo: string): Promise<IUsuarioInfo> {
    const rows = await this.usuarioQueries.findByCorreo(correo);

    if (!rows || rows.length === 0) {
      return new NullUsuario().toInfo(); 
    }

    const nuevoUsuario = new Usuario(rows[0]); 
    return nuevoUsuario.toInfo(); 
  }

  /**
   * cambiarRolUsuario
   * 
   * Changes the role of a specific user.
   * If the user is not found, returns a message from a NullUsuario object.
   * 
   * @param {number} idUsuario - The ID of the user whose role is to be changed.
   * @param {number} nuevoRol - The new role to be assigned to the user.
   * @returns {Promise<IRespuestaUsuario>} - A promise that resolves to the response of the operation.
   */
  public async cambiarRolUsuario(idUsuario: number, nuevoRol: number): Promise<IRespuestaUsuario> {
    try {
      console.log('ID del usuario:', idUsuario);
      console.log('Nuevo rol:', nuevoRol);
  
      // Get user information
      const usuarioInfo = await this.usuarioQueries.findById(idUsuario);
      console.log('Información del usuario:', usuarioInfo);
  
      if (!usuarioInfo || usuarioInfo.length === 0) {
        console.log('Usuario no encontrado');
        return new NullUsuario().toInfomessege(); 
      }
  
      const usuarioData = usuarioInfo[0];
      const usuario: UsuarioInterface = {
        idUsuario: usuarioData.idUsuario,
        nombreUsuario: usuarioData.nombreUsuario,
        apellidoUsuario: usuarioData.apellidoUsuario,
        correoUsuario: usuarioData.correoUsuario,
        contrasenaUsuario: usuarioData.contrasenaUsuario,
        estadoUsuario: usuarioData.estadoUsuario,
        rolId: usuarioData.rolId,
        cedula: usuarioData.cedula
      };
  
      const nuevoUsuario = new Usuario(usuario); 
  
      const [result] = await this.usuarioQueries.updateRol(idUsuario, nuevoRol);
      console.log('Resultado de la actualización:', result);
  
      if (result.affectedRows > 0) {
        console.log('Rol actualizado exitosamente');
        return {
          mensaje: "Rol de usuario actualizado exitosamente.",
          usuario: nuevoUsuario.toInfo(), 
          nuevoRol: nuevoRol
        } as IRespuestaUsuario;
      } else {
        console.log('No se pudo actualizar el rol');
        return new NullUsuario().toInfomessege();
      }
    } catch (error) {
      console.error('Error al cambiar el rol del usuario:', error);
      return new NullUsuario().toInfomessege();
    }
  }
  
  /**
   * eliminarUsuario
   * 
   * Deletes a specific user from the system.
   * If the user is not found, returns a message from a NullUsuario object.
   * 
   * @param {number} idUsuario - The ID of the user to be deleted.
   * @returns {Promise<IRespuestaUsuario>} - A promise that resolves to the response of the operation.
   */
  public async eliminarUsuario(idUsuario: number): Promise<IRespuestaUsuario> {
    try {
      const usuarioInfo = await this.usuarioQueries.findById(idUsuario);
      if (!usuarioInfo || usuarioInfo.length === 0) {
        return new NullUsuario().toInfomessege(); 
      }
  
      const [result]: any = await this.usuarioQueries.deleteUsuario(idUsuario);
  
      if (result.affectedRows > 0) {
        return {
          mensaje: "Usuario eliminado exitosamente."
        } as IRespuestaUsuario; 
      } else {
        return new NullUsuario().toInfomessege(); 
      }
    } catch (error) {
      return new NullUsuario().toInfomessege(); 
    }
  }
}