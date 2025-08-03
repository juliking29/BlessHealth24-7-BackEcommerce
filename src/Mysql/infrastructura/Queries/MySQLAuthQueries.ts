import { Pool } from "mysql2/promise"; // Ensure to import Pool
import MySQLDatabase from "../Singelton/MySQLDatabase"; // Ensure the path is correct
import bcrypt from "bcrypt";
import { IMySQLAuthQueries } from "../../Domain/IMySQLAuthQueries";

/**
 * MySQLAuthQueries implements the IMySQLAuthQueries interface,
 * providing methods for interacting with the MySQL database for authentication-related operations.
 */
export class MySQLAuthQueries implements IMySQLAuthQueries {
  
  private readonly pool: Pool; // MySQL connection pool

  /**
   * Initializes the MySQLAuthQueries with a connection pool.
   */
  constructor() {
    this.pool = MySQLDatabase.getPool(); // Get the connection pool from MySQLDatabase
  }

  /**
   * Finds a user by their email address.
   * 
   * @param {string} correoUsuario - The email address of the user to find.
   * @returns {Promise<any>} - A promise that resolves to the user data if found.
   */
  public async findUserByEmail(correoUsuario: string): Promise<any> {
    const [rows]: any = await this.pool.execute(
      "SELECT * FROM usuarios WHERE correoUsuario = ? LIMIT 1",
      [correoUsuario]
    );
    return rows; // Return the found user data
  }

  /**
   * Inserts a new session for a user.
   * 
   * @param {number} idUsuario - The ID of the user.
   * @param {string} token - The session token to insert.
   * @returns {Promise<any>} - A promise that resolves when the session is inserted.
   */
  public async insertSession(idUsuario: number, token: string): Promise<any> {
    return await this.pool.execute(
      `INSERT INTO sesiones (idUsuario, token) VALUES (?, ?)`,
      [idUsuario, token]
    );
  }

  /**
   * Inserts a new user into the database.
   * 
   * @param {string} nombre - The first name of the user.
   * @param {string} apellido - The last name of the user.
   * @param {string} correo - The email address of the user.
   * @param {string} contrasena - The password of the user.
   * @param {number} [estado=1] - Optional status of the user (default is active).
   * @param {number | null} [rol=null] - Optional role ID for the user (can be null).
   * @returns {Promise<any>} - A promise that resolves when the user is inserted.
   */
  public async insertUser(
    nombre: string,
    apellido: string,
    correo: string,
    contrasena: string,
    estado: number = 1,
    rol: number | null = null // Allow role to be null
  ): Promise<any> {
    return await this.pool.execute(
      `INSERT INTO usuarios (nombreUsuario, apellidoUsuario, correoUsuario, contrasenaUsuario, estadoUsuario, rol_id)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, apellido, correo, contrasena, estado, rol]
    );
  }

  /**
   * Deletes a session based on the provided token.
   * 
   * @param {string} token - The session token to delete.
   * @returns {Promise<any>} - A promise that resolves when the session is deleted.
   */
  public async deleteSession(token: string): Promise<any> {
    return await this.pool.execute(
      `DELETE FROM sesiones WHERE token = ?`,
      [token]
    );
  }

  /**
   * Finds a session based on the provided token.
   * 
   * @param {string} token - The session token to find.
   * @returns {Promise<any>} - A promise that resolves to the session data if found.
   */
  public async findSession(token: string): Promise<any> {
    const [rows]: any = await this.pool.execute(
      `SELECT token FROM sesiones WHERE token = ?`,
      [token]
    );
    return rows; // Return the found session data
  }

  /**
   * Updates the user's password in the database.
   * 
   * @param {string} correoUsuario - The email address of the user whose password is to be updated.
   * @param {string} nuevaContrasena - The new password for the user.
   * @returns {Promise<any>} - A promise that resolves when the password is updated.
   */
  public async updateUserPassword(correoUsuario: string, nuevaContrasena: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10); // Hash the new password
    return await this.pool.execute(
      `UPDATE usuarios SET contrasenaUsuario = ? WHERE correoUsuario = ?`,
      [hashedPassword, correoUsuario]
    );
  }

  /**
   * Retrieves user data by their ID.
   * 
   * @param {number} idUsuario - The ID of the user to retrieve.
   * @returns {Promise<any>} - A promise that resolves to the user data if found.
   */
  public async getUserById(idUsuario: number): Promise<any> {
    const [rows]: any = await this.pool.execute(
      `SELECT * FROM usuarios WHERE idUsuario = ? LIMIT 1`,
      [idUsuario]
    );
    return rows; // Return the found user data
  }

  /**
   * Checks if a user is active based on their ID.
   * 
   * @param {number} idUsuario - The ID of the user to check.
   * @returns {Promise<boolean>} - A promise that resolves to true if the user is active, otherwise false.
   */
  public async isUserActive(idUsuario: number): Promise<boolean> {
    const [rows]: any = await this.pool.execute(
      `SELECT estadoUsuario FROM usuarios WHERE idUsuario = ? LIMIT 1`,
      [idUsuario]
    );
    return rows.length > 0 && rows[0].estadoUsuario === 1; // Return true if the user is active
  }
}