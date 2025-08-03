/**
 * IMySQLAuthQueries defines the methods for interacting with the MySQL database
 * for authentication-related operations, including user management and session handling.
 */
export interface IMySQLAuthQueries {
  
    /**
     * Finds a user by their email address.
     * 
     * @param {string} correoUsuario - The email address of the user to find.
     * @returns {Promise<any>} - A promise that resolves to the user data if found.
     */
    findUserByEmail(correoUsuario: string): Promise<any>;
  
    /**
     * Inserts a new session for a user.
     * 
     * @param {number} idUsuario - The ID of the user.
     * @param {string} token - The session token to insert.
     * @returns {Promise<any>} - A promise that resolves when the session is inserted.
     */
    insertSession(idUsuario: number, token: string): Promise<any>;
  
    /**
     * Inserts a new user into the database.
     * 
     * @param {string} nombre - The first name of the user.
     * @param {string} apellido - The last name of the user.
     * @param {string} correo - The email address of the user.
     * @param {string} contrasena - The password of the user.
     * @param {number} [estado] - Optional status of the user (e.g., active, inactive).
     * @param {number | null} [rol] - Optional role ID for the user.
     * @returns {Promise<any>} - A promise that resolves when the user is inserted.
     */
    insertUser(
      nombre: string,
      apellido: string,
      correo: string,
      contrasena: string,
      estado?: number,
      rol?: number | null
    ): Promise<any>;
  
    /**
     * Deletes a session based on the provided token.
     * 
     * @param {string} token - The session token to delete.
     * @returns {Promise<any>} - A promise that resolves when the session is deleted.
     */
    deleteSession(token: string): Promise<any>;
  
    /**
     * Finds a session based on the provided token.
     * 
     * @param {string} token - The session token to find.
     * @returns {Promise<any>} - A promise that resolves to the session data if found.
     */
    findSession(token: string): Promise<any>;
  
    /**
     * Updates the user's password in the database.
     * 
     * @param {string} correoUsuario - The email address of the user whose password is to be updated.
     * @param {string} nuevaContrasena - The new password for the user.
     * @returns {Promise<any>} - A promise that resolves when the password is updated.
     */
    updateUserPassword(correoUsuario: string, nuevaContrasena: string): Promise<any>;
  
    /**
     * Retrieves user data by their ID.
     * 
     * @param {number} idUsuario - The ID of the user to retrieve.
     * @returns {Promise<any>} - A promise that resolves to the user data if found.
     */
    getUserById(idUsuario: number): Promise<any>;
  
    /**
     * Checks if a user is active based on their ID.
     * 
     * @param {number} idUsuario - The ID of the user to check.
     * @returns {Promise<boolean>} - A promise that resolves to true if the user is active, otherwise false.
     */
    isUserActive(idUsuario: number): Promise<boolean>;
  }