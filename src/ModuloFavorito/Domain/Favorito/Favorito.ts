import AbstractItemFavorito from "../ItemFavorito/AbstractItemFavorito";
import AbstractFavorito from "./AbstractFavorito";
import { IFavorito } from "./interfaces/FavoritoInterface";

/**
 * Favorito extends the AbstractFavorito class,
 * representing a favorite list in the system. It provides specific
 * implementations for the abstract methods defined in the base class.
 */
export default class Favorito extends AbstractFavorito {
  
  /**
   * Constructor for Favorito.
   * 
   * @param {IFavorito} favoritoInterface - An object containing favorite list information.
   */
  constructor(favoritoInterface: IFavorito) {
    super(favoritoInterface);
  }

  /**
   * Checks if the favorite list is a null object.
   * 
   * @returns {boolean} - Always returns false, indicating this is a valid favorite list.
   */
  public isNull(): boolean {
    return false;
  }

  /**
   * Converts the Favorito object to a string representation.
   * 
   * @returns {string} - A string detailing the favorite list's properties.
   */
  public override toString(): string {
    return `Favorito: { 
      idFavorito: ${this.getIdFavorito()}, 
      usuarioId: ${this.getIdUsuario()}, 
      cantidadItems: ${this.getItemsFavoritos().length}
    }`;
  }

  /**
   * Adds an item to the favorite list if it does not already exist.
   * 
   * @param {AbstractItemFavorito} item - The item to be added to the favorite list.
   */
  public override agregarItem(item: AbstractItemFavorito): void {
    const itemExistente = this.itemsFavoritos.find(
      i => i.getProducto().getId() === item.getProducto().getId()
    );

    if (!itemExistente) {
      this.itemsFavoritos.push(item); // Adds the item if it does not already exist.
    }
  }

  /**
   * Removes an item from the favorite list by product ID.
   * 
   * @param {number} idProducto - The ID of the product to be removed.
   */
  public override eliminarItem(idProducto: number): void {
    this.itemsFavoritos = this.itemsFavoritos.filter(
      item => item.getProducto().getId() !== idProducto // Filters out the item with the specified ID.
    );
  }

  /**
   * Empties the favorite list, removing all items.
   */
  public vaciar(): void {
    this.itemsFavoritos = []; // Clears the list of favorite items.
  }

  /**
   * Checks if the favorite list contains any products.
   * 
   * @returns {boolean} - Returns true if there are products in the list, otherwise false.
   */
  public tieneProductos(): boolean {
    return this.itemsFavoritos.length > 0; // Checks if the list has any items.
  }
}