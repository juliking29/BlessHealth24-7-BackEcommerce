import AbstractItemFavorito from "../ItemFavorito/AbstractItemFavorito";
import { FavoritoInterface, IFavoritoResumen, IFavorito } from "./interfaces/FavoritoInterface";

/**
 * AbstractFavorito serves as an abstract base class for favorite lists.
 * It provides common properties and methods for managing a collection of favorite items.
 */
export default abstract class AbstractFavorito {
  protected idFavorito: number;                // The unique identifier for the favorite list.
  protected idUsuario: number;                 // The ID of the user associated with the favorite list.
  protected itemsFavoritos: AbstractItemFavorito[]; // The list of favorite items.

  /**
   * Constructor for AbstractFavorito.
   * 
   * @param {FavoritoInterface} favoritoInterface - An object containing favorite list information.
   */
  constructor(favoritoInterface: FavoritoInterface) {
    this.idFavorito = favoritoInterface.idFavorito;
    this.idUsuario = favoritoInterface.idUsuario;
    this.itemsFavoritos = favoritoInterface.itemsFavoritos; 
  }

  // Abstract methods
  public abstract toString(): string; // Converts the favorite list to a string representation.
  public abstract isNull(): boolean;   // Checks if the favorite list is a null object.

  // Getters
  public getIdFavorito(): number {
    return this.idFavorito; // Returns the ID of the favorite list.
  }

  public getIdUsuario(): number {
    return this.idUsuario; // Returns the ID of the associated user.
  }

  public getItemsFavoritos(): AbstractItemFavorito[] {
    return this.itemsFavoritos; // Returns the list of favorite items.
  }

  // Setters
  public setIdFavorito(id: number): void {
    if (this.validateId(id)) this.idFavorito = id; // Sets the ID of the favorite list if valid.
  }

  public setIdUsuario(idUsuario: number): void {
    if (this.validateId(idUsuario)) this.idUsuario = idUsuario; // Sets the user ID if valid.
  }

  public setItemsFavoritos(items: AbstractItemFavorito[]): void {
    this.itemsFavoritos = items; // Sets the list of favorite items.
  }

  // Validations
  protected validateId(id: number): boolean {
    return Number.isInteger(id) && id > 0; // Validates that the ID is a positive integer.
  }

  // Business methods
  public agregarItem(item: AbstractItemFavorito): void {
    this.itemsFavoritos.push(item); // Adds a favorite item to the list.
  }

  public eliminarItem(itemId: number): void {
    this.itemsFavoritos = this.itemsFavoritos.filter(item => item.getId() !== itemId); // Removes an item by ID.
  }

  public contieneItem(itemId: number): boolean {
    return this.itemsFavoritos.some(item => item.getId() === itemId); // Checks if the list contains an item by ID.
  }

  // Methods to transform to different views
  public toResumen(): IFavoritoResumen {
    return {
      idFavorito: this.idFavorito,
      idUsuario: this.idUsuario,
      totalItems: this.itemsFavoritos.length,
      productos: this.itemsFavoritos.map(item => item.toResumen()), // Converts each item to its summary version.
    };
  }

  public toCompleto(): IFavorito {
    return {
      idFavorito: this.idFavorito,
      idUsuario: this.idUsuario,
      itemsFavoritos: this.itemsFavoritos.map(item => item.toCompleto()), // Converts each item to its complete version.
    };
  }
}