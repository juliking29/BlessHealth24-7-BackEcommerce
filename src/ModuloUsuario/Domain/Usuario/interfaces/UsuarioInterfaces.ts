// Interfaces for User

/**
 * IRegistroUsuario
 * 
 * This interface defines the structure for user registration information.
 */
export interface IRegistroUsuario {
  nombre: string;        // The first name of the user.
  apellido: string;     // The last name of the user.
  correo: string;       // The email address of the user.
  contrasena: string;   // The password for the user account.
  rol: number;          // The role assigned to the user.
}

/**
* UsuarioInterface
* 
* This interface defines the structure for user information within the system.
*/
export interface UsuarioInterface {
  idUsuario: number;          // The unique identifier for the user.
  nombreUsuario: string;      // The first name of the user.
  apellidoUsuario: string;    // The last name of the user.
  correoUsuario: string;      // The email address of the user.
  contrasenaUsuario: string;  // The password for the user account.
  estadoUsuario: number;      // The status of the user (e.g., active, inactive).
  rolId: number;              // The role ID assigned to the user.
  cedula: string;             // The identification number of the user.
}

/**
* IUsuarioInfo
* 
* This interface defines the structure for user information returned by the system.
*/
export interface IUsuarioInfo {
  idUsuario: number;          // The unique identifier for the user.
  nombreUsuario: string;      // The first name of the user.
  apellidoUsuario: string;    // The last name of the user.
  correoUsuario: string;      // The email address of the user.
  estadoUsuario: number;      // The status of the user (e.g., active, inactive).
  rolUsuario: string;         // The role of the user as a string.
  cedula: string;             // The identification number of the user.
}

/**
* IRespuestaUsuario
* 
* This interface defines the structure for the response returned by user-related operations.
*/
export interface IRespuestaUsuario {
  mensaje: string;           // A message indicating the result of the operation.
}

// src/Domain/Usuario/IUsuario.ts

/**
* IUsuario
* 
* This interface defines the structure for user entities in the system,
* including methods to check user roles.
*/
export interface IUsuario {
  idUsuario: number;          // The unique identifier for the user.
  nombreUsuario: string;      // The first name of the user.
  apellidoUsuario: string;    // The last name of the user.
  correoUsuario: string;      // The email address of the user.
  estadoUsuario: number;      // The status of the user (e.g., active, inactive).
  rolId: number;              // The role ID assigned to the user.
  cedula: string;             // The identification number of the user.

  /**
   * esAdmin
   * 
   * Checks if the user has admin privileges.
   * 
   * @returns {boolean} - True if the user is an admin, false otherwise.
   */
  esAdmin(): boolean;

  /**
   * esUsuario
   * 
   * Checks if the user has standard user privileges.
   * 
   * @returns {boolean} - True if the user is a standard user, false otherwise.
   */
  esUsuario(): boolean;
}