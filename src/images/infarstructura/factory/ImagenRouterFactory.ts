// src/ModuloImagen/Infrastructura/Factory/ImagenFactory.ts

import path from "path";
import ImagenControladorExpress from "../Controller/ImagenControladorExpress";
import ImagenRouterExpress from "../router/ImagenRouterExpress";

/**
 * ImagenFactory is a factory class responsible for creating
 * instances of the image controller and router.
 */
export default class ImagenFactory {
  
  /**
   * Creates and returns an instance of ImagenRouterExpress.
   * 
   * @returns {ImagenRouterExpress} - An instance of the image router.
   */
  static create(): ImagenRouterExpress {
    
    const imagesDirectory = path.join(__dirname, '../../../images'); // Set the directory for images
    const controlador = new ImagenControladorExpress(imagesDirectory); // Create an instance of the image controller
    return new ImagenRouterExpress(controlador); // Return the image router
  }
}