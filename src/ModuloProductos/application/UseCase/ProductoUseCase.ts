import ProductoServiceInterface from "../../Domain/interfaces/ProductoServiceInterface";
import ProductoUseCasePort from "../../Domain/Port/Driver/ProductoUseCasePort";
import AbstractProducto from "../../Domain/Producto/AbstractProducto";
import { IProductoDetalle, IProductoVitrina } from "../../Domain/Producto/interfaces/productoIntefaces";
import NullProducto from "../../Domain/Producto/NullProducto";

/**
 * ProductoUseCase implements the ProductoUseCasePort interface,
 * providing use case methods for product-related operations.
 * It interacts with the ProductoService to perform actions related to products.
 */
export default class ProductoUseCase implements ProductoUseCasePort {
  
  /**
   * Constructor for ProductoUseCase.
   * 
   * @param {ProductoServiceInterface} productoService - An instance of the product service for business logic.
   */
  constructor(private readonly productoService: ProductoServiceInterface) {}

  /**
   * obtenerProductoPorId
   * 
   * Retrieves the details of a product based on its ID.
   * If the product is not found, returns a NullProducto object.
   * 
   * @param {number} id - The ID of the product to be retrieved.
   * @returns {Promise<IProductoDetalle>} - A promise that resolves to the product details or a NullProducto object.
   */
  public async obtenerProductoPorId(id: number): Promise<IProductoDetalle> {
    const producto = await this.productoService.obtenerProductoPorId(id);

    if (!producto) {
      return new NullProducto().toDetalle();
    }

    return producto;
  }

  /**
   * obtenerProductoPorNombre
   * 
   * Retrieves a product based on its name.
   * If the product is not found, returns a NullProducto object.
   * 
   * @param {string} nombre - The name of the product to be retrieved.
   * @returns {Promise<AbstractProducto>} - A promise that resolves to the product object or a NullProducto object.
   */
  public async obtenerProductoPorNombre(nombre: string): Promise<AbstractProducto> {
    const producto = await this.productoService.obtenerProductoPorNombre(nombre);

    if (!producto) {
      return new NullProducto();
    }

    return producto;
  }

  /**
   * obtenerProductosPorRangoDePrecio
   * 
   * Retrieves products within a specified price range.
   * If no products are found, returns an array containing a NullProducto object.
   * 
   * @param {number} min - The minimum price of the products to be retrieved.
   * @param {number} max - The maximum price of the products to be retrieved.
   * @returns {Promise<AbstractProducto[]>} - A promise that resolves to an array of product objects or a NullProducto object.
   */
  public async obtenerProductosPorRangoDePrecio(min: number, max: number): Promise<AbstractProducto[]> {
    const productos = await this.productoService.obtenerProductosPorRangoDePrecio(min, max);

    if (productos.length === 0) {
      return [new NullProducto()];
    }

    return productos;
  }

  /**
   * buscarProductos
   * 
   * Searches for products based on a search term.
   * If no products are found, returns an array containing a NullProducto object.
   * 
   * @param {string} termino - The search term to find products.
   * @returns {Promise<AbstractProducto[]>} - A promise that resolves to an array of matching product objects or a NullProducto object.
   */
  public async buscarProductos(termino: string): Promise<AbstractProducto[]> {
    const productos = await this.productoService.buscarProductos(termino);

    if (productos.length === 0) {
      return [new NullProducto()];
    }

    return productos;
  }

  /**
   * obtenerVitrina
   * 
   * Retrieves a showcase view of products.
   * If no products are found, returns an array containing a NullProducto object in showcase format.
   * 
   * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products in showcase format or a NullProducto object.
   */
  public async obtenerVitrina(): Promise<IProductoVitrina[]> {
    const productos = await this.productoService.obtenerVitrina();

    if (productos.length === 0) {
      return [new NullProducto().toVitrina()];
    }

    return productos;
  }

  /**
   * obtenerVitrina1
   * 
   * Retrieves the first set of products (from 1 to 12).
   * If no products are found, returns an array containing a NullProducto object in showcase format.
   * 
   * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products from 1 to 12.
   */
  public async obtenerVitrina1(): Promise<IProductoVitrina[]> {
    const productos = await this.productoService.obtenerVitrina1();

    if (productos.length === 0) {
      return [new NullProducto().toVitrina()];
    }

    return productos;
  }

  /**
   * obtenerVitrina2
   * 
   * Retrieves the second set of products (from 13 to 24).
   * If no products are found, returns an array containing a NullProducto object in showcase format.
   * 
   * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products from 13 to 24.
   */
  public async obtenerVitrina2(): Promise<IProductoVitrina[]> {
    const productos = await this.productoService.obtenerVitrina2();

    if (productos.length === 0) {
      return [new NullProducto().toVitrina()];
    }

    return productos;
  }

  /**
   * obtenerVitrina3
   * 
   * Retrieves the third set of products (from 25 to 36).
   * If no products are found, returns an array containing a NullProducto object in showcase format.
   * 
   * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products from 25 to 36.
   */
  public async obtenerVitrina3(): Promise<IProductoVitrina[]> {
    const productos = await this.productoService.obtenerVitrina3();

    if (productos.length === 0) {
      return [new NullProducto().toVitrina()];
    }

    return productos;
  }
}
