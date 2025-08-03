import AbstractFavorito from "./AbstractFavorito";
import { IFavoritoResumen, IFavorito } from "./interfaces/FavoritoInterface";
import AbstractItemFavorito from "../ItemFavorito/AbstractItemFavorito";

/**
 * NullFavorito is a concrete implementation of the AbstractFavorito class,
 * representing a null object pattern for favorite lists. It provides default values
 * for the properties and overrides methods to indicate the absence of a valid favorite list.
 */
export default class NullFavorito extends AbstractFavorito {
  
  /**
   * Constructor for NullFavorito.
   * Initializes the favorite list with default "NULL" values.
   */
  constructor() {
    super({
      idFavorito: 0,
      idUsuario: 0,
      itemsFavoritos: []
    });
  }

  /**
   * Checks if the favorite list is a null object.
   * 
   * @returns {boolean} - Always returns true.
   */
  public override isNull(): boolean {
    return true;
  }

  /**
   * Converts the NullFavorito object to a string representation.
   * 
   * @returns {string} - Returns "NullFavorito".
   */
  public override toString(): string {
    return "NullFavorito";
  }

  // Override setters to do nothing
  public override setIdFavorito = (_id: number): void => {
    return;
  };

  public override setIdUsuario = (_idUsuario: number): void => {
    return;
  };

  public override setItemsFavoritos = (_items: AbstractItemFavorito[]): void => {
    return;
  };

  // Override business methods to do nothing
  public override agregarItem = (_item: AbstractItemFavorito): void => {
    return;
  };

  public override eliminarItem = (_itemId: number): void => {
    return;
  };

  public override contieneItem(_itemId: number): boolean {
    return false; // Always returns false for a null favorite list.
  }

  // Override transformation methods
  public override toResumen(): IFavoritoResumen {
    return {
      idFavorito: 0,
      idUsuario: 0,
      totalItems: 0,
      productos: [] // Returns an empty summary for a null favorite list.
    };
  }

  public override toCompleto(): IFavorito {
    return {
      idFavorito: 0,
      idUsuario: 0,
      itemsFavoritos: [] // Returns an empty complete object for a null favorite list.
    };
  }
}