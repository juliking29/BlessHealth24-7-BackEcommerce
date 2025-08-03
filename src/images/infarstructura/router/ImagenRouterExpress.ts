// src/ModuloImagen/Infrastructura/Factory/ImagenRouterExpress.ts

import { Router } from 'express';
import ImagenControladorExpress from '../Controller/ImagenControladorExpress';
import ImagesRouterExpressInterface from '../../domain/interfaces/ImagesRouterExpressInterface';

/**
 * ImagenRouterExpress implements the ImagesRouterExpressInterface,
 * defining the routes for handling image-related operations in an Express application.
 */
export default class ImagenRouterExpress implements ImagesRouterExpressInterface {
  
  router: Router; // Express router instance
  path: string; // Base path for the router

  constructor(private readonly imagenControlador: ImagenControladorExpress) {
    this.router = Router(); // Initialize the router
    this.path = '/imagenes'; // Set the base path
    this.routes(); // Define the routes
  }

  /**
   * Defines the routes for image-related operations.
   */
  public routes(): void {
    this.verImagen(); // Define the route for retrieving an image
  }

  /**
   * Defines the route for retrieving an image by its name.
   */
  public verImagen(): void {
    this.router.get('/:nombre', this.imagenControlador.VerIamgen.bind(this.imagenControlador)); // Bind the controller method to the route
  }
}