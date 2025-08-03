import AbstractUsuario from "./AbstractUsuario";
import { IRespuestaUsuario, UsuarioInterface } from "./interfaces/UsuarioInterfaces";

/**
 * Usuario is a concrete implementation of the AbstractUsuario class,
 * representing a user entity in the system. It provides specific
 * implementations for the abstract methods defined in the base class.
 */
export default class Usuario extends AbstractUsuario {
  /**
   * Throws an error indicating that the method is not implemented.
   * 
   * @returns {IRespuestaUsuario} - This method is expected to return a response object.
   */
  public override toInfomessege(): IRespuestaUsuario {
    throw new Error("Method not implemented.");
  }

  /**
   * Constructor for Usuario.
   * 
   * @param {UsuarioInterface} usuarioInterface - An object containing user information.
   */
  constructor(usuarioInterface: UsuarioInterface) {
    super(usuarioInterface);
  }

  /**
   * Checks if the user is a null object.
   * 
   * @returns {boolean} - Always returns false, indicating this is a valid user.
   */
  public isNull(): boolean {
    return false;
  }

  /**
   * Converts the Usuario object to a string representation.
   * 
   * @returns {string} - A string detailing the user's properties.
   */
  public override toString(): string {
    return `Usuario: { 
      idUsuario: ${this.getId()}, 
      nombreUsuario: "${this.getNombre()}", 
      apellidoUsuario: "${this.getApellido()}", 
      correoUsuario: "${this.getCorreo()}", 
      estadoUsuario: ${this.getEstado()}, 
      rolId: ${this.getRolId()}, 
      cedula: "${this.getCedula()}" 
    }`;
  }
}