// src/ModuloImagen/Infrastructura/Controlador/ImagenControladorExpress.ts

import { Request, Response } from "express";
import path from "path";
import ImagenControladorExpressInterface from "../../domain/interfaces/ImagenControladorExpressInterface";

/**
 * ImagenControladorExpress implements the ImagenControladorExpressInterface,
 * providing methods for handling image-related operations in an Express application.
 */
export default class ImagenControladorExpress implements ImagenControladorExpressInterface {
  
  constructor(private readonly imagesDirectory: string) {
    // Initialize with the directory where images are stored
  }

  /**
   * Retrieves and sends an image based on the provided image name in the request parameters.
   * 
   * @param {Request} req - The HTTP request object containing the image name.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async VerIamgen(req: Request, res: Response): Promise<void> {
    try {
      const { nombre } = req.params as { nombre: string }; // Extract the image name from request parameters
      const rutaImagen = path.join(this.imagesDirectory, nombre); // Construct the full path to the image

      // Send the image file
      res.sendFile(rutaImagen, (err) => {
        if (err) {
          res.status(404).send("Imagen no encontrada"); // Return 404 if the image is not found
        }
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message }); // Return error message if an error occurs
      } else {
        res.status(500).json({ error: "Error desconocido" }); // Return generic error message
      }
    }
  }
}