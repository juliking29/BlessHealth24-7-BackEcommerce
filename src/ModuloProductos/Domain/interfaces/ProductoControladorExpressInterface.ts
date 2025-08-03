import { Request, Response } from "express";
import ControllerExpressInterface from "../../../Express/domain/ControllerExpressInterface";

/**
 * ProductoControladorExpressInterface extends the ControllerExpressInterface,
 * defining methods for handling product-related HTTP requests in an Express application.
 * 
 * @extends ControllerExpressInterface
 */
export default interface ProductoControladorExpressInterface extends ControllerExpressInterface {
  
  /**
   * obtenerProductoPorId
   * 
   * Handles the request to retrieve a product's details based on its ID.
   * 
   * @param {Request} req - The Express request object containing the product ID in the parameters.
   * @param {Response} res - The Express response object used to send the product details.
   * @returns {void} - This method does not return a value.
   */
  obtenerProductoPorId(req: Request, res: Response): void;

  /**
   * obtenerProductoPorNombre
   * 
   * Handles the request to retrieve a product's details based on its name.
   * 
   * @param {Request} req - The Express request object containing the product name in the parameters.
   * @param {Response} res - The Express response object used to send the product details.
   * @returns {void} - This method does not return a value.
   */
  obtenerProductoPorNombre(req: Request, res: Response): void;

  /**
   * obtenerProductosPorRangoDePrecio
   * 
   * Handles the request to retrieve products within a specified price range.
   * 
   * @param {Request} req - The Express request object containing the price range in the parameters.
   * @param {Response} res - The Express response object used to send the list of products.
   * @returns {void} - This method does not return a value.
   */
  obtenerProductosPorRangoDePrecio(req: Request, res: Response): void;

  /**
   * buscarProductos
   * 
   * Handles the request to search for products based on a search term.
   * 
   * @param {Request} req - The Express request object containing the search term in the parameters.
   * @param {Response} res - The Express response object used to send the list of matching products.
   * @returns {void} - This method does not return a value.
   */
  buscarProductos(req: Request, res: Response): void;

  /**
   * obtenerVitrina
   * 
   * Handles the request to retrieve a showcase view of products.
   * 
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object used to send the showcase of products.
   * @returns {void} - This method does not return a value.
   */
  obtenerVitrina(req: Request, res: Response): void;

  obtenerVitrina1(req: Request, res: Response): void;

  /**
   * obtenerVitrina2
   * 
   * Handles the request to retrieve the second showcase view of products.
   * 
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object used to send the showcase of products.
   * @returns {void} - This method does not return a value.
   */
  obtenerVitrina2(req: Request, res: Response): void;

  /**
   * obtenerVitrina3
   * 
   * Handles the request to retrieve the third showcase view of products.
   * 
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object used to send the showcase of products.
   * @returns {void} - This method does not return a value.
   */
  obtenerVitrina3(req: Request, res: Response): void;
}