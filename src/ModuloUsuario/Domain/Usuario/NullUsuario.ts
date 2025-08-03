import AbstractUsuario from './AbstractUsuario';
import { IRespuestaUsuario, IUsuarioInfo } from './interfaces/UsuarioInterfaces';

/**
 * NullUsuario is a concrete implementation of the AbstractUsuario class,
 * representing a null object pattern for user entities. It provides default
 * values for user properties and overrides methods to indicate the absence of a valid user.
 */
export default class NullUsuario extends AbstractUsuario {
  /**
   * Constructor for NullUsuario.
   * Initializes the user with default "NULL" values.
   */
  constructor() {
    super({
      idUsuario: 0,
      nombreUsuario: "NULL",
      apellidoUsuario: "NULL",
      correoUsuario: "NULL",
      contrasenaUsuario: "NULL",
      estadoUsuario: 0,
      rolId: 0,
      cedula: "NULL" // Added cedula field
    });
  }

  /**
   * Checks if the user is a null object.
   * 
   * @returns {boolean} - Always returns true.
   */
  public isNull(): boolean {
    return true;
  }

  /**
   * Converts the NullUsuario object to a string representation.
   * 
   * @returns {string} - Returns "NullUsuario".
   */
  public override toString(): string {
    return "NullUsuario";
  }

  // Override setters to do nothing
  public override setId = (_id: number): void => {
    return;
  };

  public override setNombre = (_nombre: string): void => {
    return;
  };

  public override setApellido = (_apellido: string): void => {
    return;
  };

  public override setCorreo = (_correo: string): void => {
    return;
  };

  public override setContrasena = (_contrasena: string): void => {
    return;
  };

  public override setEstado = (_estado: number): void => {
    return;
  };

  public override setRolId = (_rolId: number): void => {
    return;
  };

  public override setCedula = (_cedula: string): void => {
    return; // Override setter for cedula
  };

  // Override business methods
  public override esAdmin(): boolean {
    return false; // Indicates that the null user is not an admin
  }

  public override esUsuario(): boolean {
    return false; // Indicates that the null user is not a standard user
  }

  // Override transformation method
  public override toInfo(): IUsuarioInfo {
    return {
      idUsuario: 0,
      nombreUsuario: "NULL",
      apellidoUsuario: "NULL",
      correoUsuario: "NULL",
      estadoUsuario: 0,
      rolUsuario: "NULL",
      cedula: "NULL" // Added cedula to the information
    };
  }

  /**
   * Returns a message indicating that no user information was found.
   * 
   * @returns {IRespuestaUsuario} - An object containing the message.
   */
  public toInfomessege(): IRespuestaUsuario {
    return {
      mensaje: "No se encontró información del usuario."
    };
  }
}