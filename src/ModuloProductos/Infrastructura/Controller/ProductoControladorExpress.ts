import { Request, Response } from "express";
import ProductoUseCasePort from "../../Domain/Port/Driver/ProductoUseCasePort";
import ProductoControladorExpressInterface from "../../Domain/interfaces/ProductoControladorExpressInterface";

/**
 * ProductoControladorExpress implements the ProductoControladorExpressInterface,
 * providing methods to handle product-related HTTP requests in an Express application.
 */
export default class ProductoControladorExpress implements ProductoControladorExpressInterface {
  
  /**
   * Constructor for ProductoControladorExpress.
   * 
   * @param {ProductoUseCasePort} productoCasoUso - An instance of the product use case for business logic.
   */
  constructor(private readonly productoCasoUso: ProductoUseCasePort) {}

  /**
   * obtenerProductoPorId
   * 
   * Handles the request to retrieve a product's details based on its ID.
   * 
   * @param {Request} req - The Express request object containing the product ID in the parameters.
   * @param {Response} res - The Express response object used to send the product details.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async obtenerProductoPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const producto = await this.productoCasoUso.obtenerProductoPorId(Number(id));

      if (!producto) {
        res.status(404).send("Producto no encontrado");
        return;
      }

      res.status(200).json(producto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error desconocido' });
      }
    }
  }

  /**
   * obtenerProductoPorNombre
   * 
   * Handles the request to retrieve a product's details based on its name.
   * 
   * @param {Request} req - The Express request object containing the product name in the parameters.
   * @param {Response} res - The Express response object used to send the product details.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async obtenerProductoPorNombre(req: Request, res: Response): Promise<void> {
    try {
      const { nombre } = req.params as { nombre: string };
      const producto = await this.productoCasoUso.obtenerProductoPorNombre(nombre);
      
      if (!producto) {
        res.status(404).send("Producto no encontrado");
        return;
      }

      res.status(200).json(producto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error desconocido' });
      }
    }
  }

  /**
   * obtenerProductosPorRangoDePrecio
   * 
   * Handles the request to retrieve products within a specified price range.
   * 
   * @param {Request} req - The Express request object containing the price range in the parameters.
   * @param {Response} res - The Express response object used to send the list of products.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async obtenerProductosPorRangoDePrecio(req: Request, res: Response): Promise<void> {
    try {
      const { precioMin, precioMax } = req.params;
      const min = Number(precioMin);
      const max = Number(precioMax);

      if (isNaN(min) || isNaN(max)) {
        res.status(400).json({ error: "Los valores de precioMin y precioMax deben ser números válidos." });
        return;
      }

      const productos = await this.productoCasoUso.obtenerProductosPorRangoDePrecio(min, max);

      if (!productos || productos.length === 0) {
        res.status(404).send("No se encontraron productos en el rango de precios.");
        return;
      }

      res.status(200).json(productos);
    } catch (error: unknown) {
      console.error("Error en obtenerProductosPorRangoDePrecio:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }

  /**
   * buscarProductos
   * 
   * Handles the request to search for products based on a search term.
   * 
   * @param {Request} req - The Express request object containing the search term in the parameters.
   * @param {Response} res - The Express response object used to send the list of matching products.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async buscarProductos(req: Request, res: Response): Promise<void> {
    try {
      const { termino } = req.params;
      const productos = await this.productoCasoUso.buscarProductos(String(termino));

      if (!productos || productos.length === 0) {
        res.status(404).send("No se encontraron productos para la búsqueda.");
        return;
      }

      res.status(200).json(productos);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error desconocido' });
      }
    }
  }

  /**
   * obtenerVitrina
   * 
   * Handles the request to retrieve a showcase view of products.
   * 
   * @param {Request} _req - The Express request object.
   * @param {Response} res - The Express response object used to send the showcase of products.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async obtenerVitrina(_req: Request, res: Response): Promise<void> {
    try {
      const productos = await this.productoCasoUso.obtenerVitrina();

      if (!productos || productos.length === 0) {
        res.status(404).send("No hay productos en la vitrina.");
        return;
      }

      res.status(200).json(productos);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error desconocido' });
      }
    }
  }

   /**
   * obtenerVitrina1
   * 
   * Retrieves the first batch of products for the showcase (products 1 to 12).
   * 
   * @param {Request} _req - The Express request object.
   * @param {Response} res - The Express response object used to send the first batch of products.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
   async obtenerVitrina1(_req: Request, res: Response): Promise<void> {
    try {
      const productos = await this.productoCasoUso.obtenerVitrina1();

      if (!productos || productos.length === 0) {
        res.status(404).send("No hay productos en la vitrina 1.");
        return;
      }

      res.status(200).json(productos);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error desconocido' });
      }
    }
  }

  /**
   * obtenerVitrina2
   * 
   * Retrieves the second batch of products for the showcase (products 13 to 24).
   * 
   * @param {Request} _req - The Express request object.
   * @param {Response} res - The Express response object used to send the second batch of products.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async obtenerVitrina2(_req: Request, res: Response): Promise<void> {
    try {
      const productos = await this.productoCasoUso.obtenerVitrina2();

      if (!productos || productos.length === 0) {
        res.status(404).send("No hay productos en la vitrina 2.");
        return;
      }

      res.status(200).json(productos);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error desconocido' });
      }
    }
  }

  /**
   * obtenerVitrina3
   * 
   * Retrieves the third batch of products for the showcase (products 25 to 36).
   * 
   * @param {Request} _req - The Express request object.
   * @param {Response} res - The Express response object used to send the third batch of products.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async obtenerVitrina3(_req: Request, res: Response): Promise<void> {
    try {
      const productos = await this.productoCasoUso.obtenerVitrina3();

      if (!productos || productos.length === 0) {
        res.status(404).send("No hay productos en la vitrina 3.");
        return;
      }

      res.status(200).json(productos);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error desconocido' });
      }
    }
  }
}