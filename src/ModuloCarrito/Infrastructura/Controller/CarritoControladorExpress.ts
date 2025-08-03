import { Request, Response } from 'express';
import CarritoControladorExpressInterface from '../../Domain/interfaces/CarritoControladorExpressInterface';
import CarritoUseCasePort from '../../Domain/Port/Driver/CarritoUseCasePort';

/**
 * CarritoControladorExpress implements the CarritoControladorExpressInterface,
 * providing methods for handling HTTP requests related to shopping cart operations.
 */
export default class CarritoControladorExpress implements CarritoControladorExpressInterface {
  
  constructor(private readonly carritoCasoUso: CarritoUseCasePort) {}

  /**
   * Retrieves the complete shopping cart for a user.
   * 
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async verCarrito(req: Request, res: Response): Promise<void> {
    try {
      const { usuarioId } = req.params;
      const carrito = await this.carritoCasoUso.verMiCarritoCompleto(Number(usuarioId));

      if (!carrito) {
        res.status(404).send('Carrito no encontrado');
        return;
      }

      res.status(200).json(carrito);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Retrieves a summary of the user's shopping cart.
   * 
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async verCarritoResumido(req: Request, res: Response): Promise<void> {
    try {
      const { usuarioId } = req.params;
      const carrito = await this.carritoCasoUso.verMiCarritoId(Number(usuarioId));

      if (!carrito || carrito.length === 0) {
        res.status(404).send('Carrito vacío o no encontrado');
        return;
      }

      res.status(200).json(carrito);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Calculates the totals for the user's shopping cart.
   * 
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async calcularTotales(req: Request, res: Response): Promise<void> {
    try {
      const { usuarioId } = req.params;
      const totales = await this.carritoCasoUso.calcularTotalesCarrito(Number(usuarioId));

      if (!totales) {
        res.status(404).send('No se pudieron calcular los totales');
        return;
      }

      res.status(200).json(totales);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Calculates the totals for the complete shopping cart.
   * 
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async calcularTotalesCarritoCompleto(req: Request, res: Response): Promise<void> {
    try {
      const { usuarioId } = req.params;
      const totales = await this.carritoCasoUso.calcularTotalesCarritoCompleto(Number(usuarioId));

      if (!totales) {
        res.status(404).send('No se pudieron calcular los totales del carrito completo');
        return;
      }

      res.status(200).json(totales);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Adds a product to the user's shopping cart.
   * 
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async agregarProducto(req: Request, res: Response): Promise<void> {
    try {
      const { usuarioId, productoId, cantidad } = req.body;
      await this.carritoCasoUso.agregarProductoAlCarrito(usuarioId, productoId, cantidad);
      res.status(200).json({ mensaje: 'Producto agregado al carrito correctamente' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Removes a product from the user's shopping cart.
   * 
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async eliminarProducto(req: Request, res: Response): Promise<void> {
    try {
      const { usuarioId, productoId } = req.body;
      await this.carritoCasoUso.eliminarProductoDelCarrito(usuarioId, productoId);
      
      res.status(200).json({ mensaje: 'Producto eliminado del carrito' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Increases the quantity of a product in the user's shopping cart.
   * 
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async aumentarCantidad(req: Request, res: Response): Promise<void> {
    try {
      const { usuarioId, productoId } = req.body;
      const cantidadActualizada = await this.carritoCasoUso.aumentarCantidadProducto(usuarioId, productoId);
      res.status(200).json({ mensaje: 'Cantidad aumentada', cantidad: cantidadActualizada });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Decreases the quantity of a product in the user's shopping cart.
   * 
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async disminuirCantidad(req: Request, res: Response): Promise<void> {
    try {
      const { usuarioId, productoId } = req.body;
      const cantidadActualizada = await this.carritoCasoUso.disminuirCantidadProducto(usuarioId, productoId);
      res.status(200).json({ mensaje: 'Cantidad disminuida', cantidad: cantidadActualizada });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}