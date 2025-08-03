import { Pool } from "mysql2/promise"; // Ensure to import Pool
import MySQLDatabase from "../Singelton/MySQLDatabase"; // Ensure to import the database class
import { IUsuarioQueries } from "../../Domain/IUsuarioQueries";

/**
 * MySQLUsuarioQueries implements the IUsuarioQueries interface,
 * providing methods for interacting with the MySQL database for user operations.
 */
export class MySQLUsuarioQueries implements IUsuarioQueries {
  
  private readonly pool: Pool; // MySQL connection pool

  /**
   * Initializes the MySQLUsuarioQueries with a connection pool.
   */
  constructor() {
    this.pool = MySQLDatabase.getPool(); // Get the connection pool from MySQLDatabase
  }

  /**
   * Finds a user by their ID.
   * 
   * @param {number} idUsuario - The ID of the user to find.
   * @returns {Promise<any[]>} - A promise that resolves to an array containing the user data if found.
   */
  async findById(idUsuario: number): Promise<any[]> {
    const [rows]: any = await this.pool.execute(
      `SELECT u.idUsuario, u.nombreUsuario, u.apellidoUsuario, 
              u.correoUsuario, u.cedulaUsuario, u.estadoUsuario, 
              r.nombreRol AS rolUsuario
       FROM usuarios u
       LEFT JOIN Roles r ON u.rol_id = r.idRol
       WHERE u.idUsuario = ?`,
      [idUsuario]
    );
    return rows; // Return the found user data
  }

  /**
   * Finds a user by their email address.
   * 
   * @param {string} correo - The email address of the user to find.
   * @returns {Promise<any[]>} - A promise that resolves to an array containing the user data if found.
   */
  async findByCorreo(correo: string): Promise<any[]> {
    const [rows]: any = await this.pool.execute(
      `SELECT u.idUsuario, u.nombreUsuario, u.apellidoUsuario, 
              u.correoUsuario, u.cedulaUsuario, u.estadoUsuario, 
              r.nombreRol AS rolUsuario
       FROM usuarios u
       LEFT JOIN Roles r ON u.rol_id = r.idRol
       WHERE u.correoUsuario = ?`,
      [correo]
    );
    return rows; // Return the found user data
  }

  /**
   * Updates the role of a user.
   * 
   * @param {number} idUsuario - The ID of the user whose role is to be updated.
   * @param {number} nuevoRol - The new role ID to assign to the user.
   * @returns {Promise<any>} - A promise that resolves when the role is updated.
   */
  async updateRol(idUsuario: number, nuevoRol: number): Promise<any> {
    console.log('Nuevo rol:', nuevoRol); // Log the new role for verification
    
    const [rolExistente] = await this.pool.execute(
      `SELECT idRol FROM Roles WHERE idRol = ?`,
      [nuevoRol]
    );
    
    console.log('Resultado de la consulta rolExistente:', rolExistente); // Log the result of the role query
    
    if (!rolExistente || (rolExistente as any[]).length === 0) {
      throw new Error('El rol especificado no existe'); // Throw error if the role does not exist
    }
    
    return await this.pool.execute(
      `UPDATE Usuarios SET rol_id = ? WHERE idUsuario = ?`,
      [nuevoRol, idUsuario]
    ); // Update the user's role
  }
  
  /**
   * Deletes a user by their ID.
   * 
   * @param {number} idUsuario - The ID of the user to delete.
   * @returns {Promise<any>} - A promise that resolves when the user is deleted.
   */
  async deleteUsuario(idUsuario: number): Promise<any> {
    // Check for dependencies before deleting
    const [rows] = await this.pool.execute(
      `SELECT idCarrito FROM carrito WHERE usuario_id = ?`,
      [idUsuario]
    );
    
    if ((rows as any[]).length > 0) {
      throw new Error('No se puede eliminar el usuario porque tiene datos asociados'); // Throw error if there are associated data
    }
    
    return await this.pool.execute(
      `DELETE FROM usuarios WHERE idUsuario = ?`,
      [idUsuario]
    ); // Delete the user
  }
}