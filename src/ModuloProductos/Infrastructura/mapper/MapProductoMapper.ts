import { ProductoInterface } from "../../Domain/Producto/interfaces/productoIntefaces";
import Producto from "../../Domain/Producto/Producto";

/**
 * MapProductoMapper provides static methods for mapping product data
 * from the data layer to the domain model (Producto).
 */
export default class MapProductoMapper {
  
  /**
   * mapToProducto
   * 
   * Maps a single product data object to a Producto instance.
   * 
   * @param {ProductoInterface} productoData - The product data to be mapped.
   * @returns {Producto} - A new instance of Producto created from the provided data.
   */
  public static mapToProducto(productoData: ProductoInterface): Producto {
    return new Producto(productoData);
  }

  /**
   * mapToProductos
   * 
   * Maps an array of product data objects to an array of Producto instances.
   * 
   * @param {ProductoInterface[]} productosData - The array of product data to be mapped.
   * @returns {Producto[]} - An array of Producto instances created from the provided data.
   */
  public static mapToProductos(productosData: ProductoInterface[]): Producto[] {
    return productosData.map(producto => new Producto(producto));
  }
}