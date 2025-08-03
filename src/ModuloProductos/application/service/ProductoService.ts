import { IProductoDetalle, IProductoVitrina } from "../../Domain/Producto/interfaces/productoIntefaces";
import { IProductoRepository } from "../../Domain/Port/Driven/IProductoRepository";
import AbstractProducto from "../../Domain/Producto/AbstractProducto";
import ProductoServiceInterface from "../../Domain/interfaces/ProductoServiceInterface";

/**
 * ProductoService implements the ProductoServiceInterface,
 * providing methods for product-related operations by interacting
 * with the product repository.
 */
export default class ProductoService implements ProductoServiceInterface {
  
  /**
   * Constructor for ProductoService.
   * 
   * @param {IProductoRepository} productoRepository - An instance of the product repository for data access.
   */
  constructor(private readonly productoRepository: IProductoRepository) {}

  /**
   * obtenerProductoPorId
   * 
   * Retrieves the details of a product based on its ID.
   * 
   * @param {number} id - The ID of the product to be retrieved.
   * @returns {Promise<IProductoDetalle>} - A promise that resolves to the product details.
   */
  async obtenerProductoPorId(id: number): Promise<IProductoDetalle> {
    return await this.productoRepository.findById(id);
  }

  /**
   * obtenerProductoPorNombre
   * 
   * Retrieves a product based on its name.
   * 
   * @param {string} nombre - The name of the product to be retrieved.
   * @returns {Promise<AbstractProducto>} - A promise that resolves to the product object.
   */
  async obtenerProductoPorNombre(nombre: string): Promise<AbstractProducto> {
    return await this.productoRepository.findByName(nombre);
  }

  /**
   * obtenerProductosPorRangoDePrecio
   * 
   * Retrieves products within a specified price range.
   * 
   * @param {number} min - The minimum price of the products to be retrieved.
   * @param {number} max - The maximum price of the products to be retrieved.
   * @returns {Promise<AbstractProducto[]>} - A promise that resolves to an array of product objects.
   */
  async obtenerProductosPorRangoDePrecio(min: number, max: number): Promise<AbstractProducto[]> {
    return await this.productoRepository.findByPriceRange(min, max);
  }

  /**
   * buscarProductos
   * 
   * Searches for products based on a search term.
   * 
   * @param {string} termino - The search term to find products.
   * @returns {Promise<AbstractProducto[]>} - A promise that resolves to an array of matching product objects.
   */
  async buscarProductos(termino: string): Promise<AbstractProducto[]> {
    return await this.productoRepository.search(termino);
  }

  /**
   * obtenerVitrina
   * 
   * Retrieves a showcase view of products.
   * 
   * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products in showcase format.
   */
  async obtenerVitrina(): Promise<IProductoVitrina[]> {
    return await this.productoRepository.getShowcase();
  }

  /**
   * obtenerVitrina1
   * 
   * Retrieves the first set of products (from 1 to 12).
   * 
   * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products from 1 to 12.
   */
  async obtenerVitrina1(): Promise<IProductoVitrina[]> {
    return await this.productoRepository.getShowcase1();
  }

  /**
   * obtenerVitrina2
   * 
   * Retrieves the second set of products (from 13 to 24).
   * 
   * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products from 13 to 24.
   */
  async obtenerVitrina2(): Promise<IProductoVitrina[]> {
    return await this.productoRepository.getShowcase2();
  }

  /**
   * obtenerVitrina3
   * 
   * Retrieves the third set of products (from 25 to 36).
   * 
   * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products from 25 to 36.
   */
  async obtenerVitrina3(): Promise<IProductoVitrina[]> {
    return await this.productoRepository.getShowcase3();
  }
}
