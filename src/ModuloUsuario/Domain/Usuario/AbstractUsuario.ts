import { IRespuestaUsuario, IUsuarioInfo, UsuarioInterface } from "./interfaces/UsuarioInterfaces";

/**
 * AbstractUsuario is an abstract class that represents a user and provides functionality
 * for managing user data, validation, and role-based operations.
 * 
 * This class is intended to be extended by specific user types to implement more detailed behaviors.
 */
export default abstract class AbstractUsuario {
  // Properties to store user information
  protected idUsuario: number;
  protected nombreUsuario: string;
  protected apellidoUsuario: string;
  protected correoUsuario: string;
  protected contrasenaUsuario: string;
  protected estadoUsuario: number;
  protected rolId: number;
  protected cedula: string;

  /**
   * Constructor to initialize a user with an object implementing the UsuarioInterface.
   * 
   * @param usuarioInterface - An object containing user data that conforms to the UsuarioInterface.
   */
  constructor(usuarioInterface: UsuarioInterface) {
    this.idUsuario = usuarioInterface.idUsuario;
    this.nombreUsuario = usuarioInterface.nombreUsuario;
    this.apellidoUsuario = usuarioInterface.apellidoUsuario;
    this.correoUsuario = usuarioInterface.correoUsuario;
    this.contrasenaUsuario = usuarioInterface.contrasenaUsuario;
    this.estadoUsuario = usuarioInterface.estadoUsuario;
    this.rolId = usuarioInterface.rolId;
    this.cedula = usuarioInterface.cedula; // Initialize cedula
  }

  // Abstract methods to be implemented by subclasses
  /**
   * Converts the user to a string representation.
   * @returns {string} - String representation of the user.
   */
  public abstract toString(): string;

  /**
   * Checks if the user object is null or not.
   * @returns {boolean} - Whether the user object is null.
   */
  public abstract isNull(): boolean;

  // Validation methods
  /**
   * Validates the user ID.
   * @param {number} id - The user ID to validate.
   * @returns {boolean} - True if valid, otherwise false.
   */
  protected validateId(id: number): boolean {
    return typeof id === "number" && id > 0;
  }

  /**
   * Validates the user's first name.
   * @param {string} nombre - The first name to validate.
   * @returns {boolean} - True if valid, otherwise false.
   */
  protected validateNombre(nombre: string): boolean {
    return typeof nombre === "string" && nombre.trim().length > 0;
  }

  /**
   * Validates the user's email address.
   * @param {string} correo - The email address to validate.
   * @returns {boolean} - True if valid, otherwise false.
   */
  protected validateCorreo(correo: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof correo === "string" && emailRegex.test(correo);
  }

  /**
   * Validates the user's password.
   * @param {string} contrasena - The password to validate.
   * @returns {boolean} - True if valid, otherwise false.
   */
  protected validateContrasena(contrasena: string): boolean {
    return typeof contrasena === "string" && contrasena.length >= 6;
  }

  /**
   * Validates the user's status.
   * @param {number} estado - The status to validate (should be 0 or 1).
   * @returns {boolean} - True if valid, otherwise false.
   */
  protected validateEstado(estado: number): boolean {
    return typeof estado === "number" && (estado === 0 || estado === 1);
  }

  /**
   * Validates the user's role ID.
   * @param {number} rolId - The role ID to validate.
   * @returns {boolean} - True if valid, otherwise false.
   */
  protected validateRolId(rolId: number): boolean {
    return typeof rolId === "number" && rolId > 0;
  }

  /**
   * Validates the user's ID card number (cedula).
   * @param {string} cedula - The cedula to validate.
   * @returns {boolean} - True if valid, otherwise false.
   */
  protected validateCedula(cedula: string): boolean {
    return typeof cedula === "string" && cedula.trim().length > 0; // Simple validation for cedula
  }

  // Getter methods
  public getId(): number {
    return this.idUsuario;
  }

  public getNombre(): string {
    return this.nombreUsuario;
  }

  public getApellido(): string {
    return this.apellidoUsuario;
  }

  public getCorreo(): string {
    return this.correoUsuario;
  }

  public getContrasena(): string {
    return this.contrasenaUsuario;
  }

  public getEstado(): number {
    return this.estadoUsuario;
  }

  public getRolId(): number {
    return this.rolId;
  }

  public getCedula(): string {
    return this.cedula; // Getter for cedula
  }

  // Setter methods with validation
  public setId(id: number): void {
    if (this.validateId(id)) this.idUsuario = id;
  }

  public setNombre(nombre: string): void {
    if (this.validateNombre(nombre)) this.nombreUsuario = nombre.trim();
  }

  public setApellido(apellido: string): void {
    if (this.validateNombre(apellido)) this.apellidoUsuario = apellido.trim();
  }

  public setCorreo(correo: string): void {
    if (this.validateCorreo(correo)) this.correoUsuario = correo;
  }

  public setContrasena(contrasena: string): void {
    if (this.validateContrasena(contrasena)) this.contrasenaUsuario = contrasena;
  }

  public setEstado(estado: number): void {
    if (this.validateEstado(estado)) this.estadoUsuario = estado;
  }

  public setRolId(rolId: number): void {
    if (this.validateRolId(rolId)) this.rolId = rolId;
  }

  public setCedula(cedula: string): void {
    if (this.validateCedula(cedula)) this.cedula = cedula; // Setter for cedula
  }

  // Business methods
  /**
   * Checks if the user is an admin.
   * @returns {boolean} - True if the user is an admin, otherwise false.
   */
  public esAdmin(): boolean {
    return this.rolId === 1;
  }

  /**
   * Checks if the user is a regular user.
   * @returns {boolean} - True if the user is a regular user, otherwise false.
   */
  public esUsuario(): boolean {
    return this.rolId === 2;
  }

  /**
   * Converts the user to an IUsuarioInfo object for external use.
   * 
   * @returns {IUsuarioInfo} - An object containing the user's information.
   */
  public toInfo(): IUsuarioInfo {
    return {
      idUsuario: this.idUsuario,
      nombreUsuario: this.nombreUsuario,
      apellidoUsuario: this.apellidoUsuario,
      correoUsuario: this.correoUsuario,
      estadoUsuario: this.estadoUsuario,
      rolUsuario: this.rolId === 1 ? 'Administrator' : 'User',
      cedula: this.cedula
    };
  }

  // Abstract method to return a response message, needs to be implemented in subclasses
  public abstract toInfomessege(): IRespuestaUsuario;
}
