/**
 * IUsuarioQueries defines the methods for interacting with user-related operations
 * in the application, including retrieving, updating, and deleting user records.
 */
export interface IUsuarioQueries {
  
    /**
     * Finds a user by their ID.
     * 
     * @param {number} idUsuario - The ID of the user to find.
     * @returns {Promise<any[]>} - A promise that resolves to an array containing the user data if found.
     */
    findById(idUsuario: number): Promise<any[]>;
  
    /**
     * Finds a user by their email address.
     * 
     * @param {string} correo - The email address of the user to find.
     * @returns {Promise<any[]>} - A promise that resolves to an array containing the user data if found.
     */
    findByCorreo(correo: string): Promise<any[]>;
  
    /**
     * Updates the role of a user.
     * 
     * @param {number} idUsuario - The ID of the user whose role is to be updated.
     * @param {number} nuevoRol - The new role ID to assign to the user.
     * @returns {Promise<any>} - A promise that resolves when the role is updated.
     */
    updateRol(idUsuario: number, nuevoRol: number): Promise<any>;
  
    /**
     * Deletes a user by their ID.
     * 
     * @param {number} idUsuario - The ID of the user to delete.
     * @returns {Promise<any>} - A promise that resolves when the user is deleted.
     */
    deleteUsuario(idUsuario: number): Promise<any>;
  }