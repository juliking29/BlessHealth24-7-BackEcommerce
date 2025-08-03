
import { IProductoRepository } from "../../Domain/Port/Driven/IProductoRepository";
import AbstractProducto from "../../Domain/Producto/AbstractProducto";
import Producto from "../../Domain/Producto/Producto";
import { IProductoDetalle, IProductoVitrina } from "../../Domain/Producto/interfaces/productoIntefaces";
import IProductoData, { IDataProducto } from "../../Domain/interfaces/IProductoData";
import { IProductoQueries } from "../../../Mysql/Domain/IProductoQueries";
import NullProducto from "../../Domain/Producto/NullProducto";

/**
 * MySQLProductoRepository implements the IProductoRepository interface,
 * providing methods for accessing product data from a MySQL database.
 */
export class MySQLProductoRepository implements IProductoRepository {
  
  /**
   * Constructor for MySQLProductoRepository.
   * 
   * @param {IProductoQueries} queries - An instance of the product queries for database operations.
   */
  constructor(private readonly queries: IProductoQueries) {}

  /**
   * findById
   * 
   * Retrieves the details of a product based on its ID.
   * If the product is not found, returns a NullProducto object.
   * 
   * @param {number} id - The ID of the product to be retrieved.
   * @returns {Promise<IProductoDetalle>} - A promise that resolves to the product details or a NullProducto object.
   */
  async findById(id: number): Promise<IProductoDetalle> {
    try {
      const rows = await this.queries.findById(id);
      console.log("Filas obtenidas por ID:", rows);
      if (rows.length === 0) {
        return new NullProducto().toDetalle();
      }
      const producto = new Producto({
        idProducto: rows[0].idProducto,
        nombreProducto: rows[0].nombreProducto,
        descripcionProducto: rows[0].descripcionProducto,
        precioProducto: rows[0].precioProducto,
        stockProducto: rows[0].stockProducto,
        imagenProducto: rows[0].imgProducto, // Asegúrate de que este campo esté presente
        categoriaId: rows[0].categoriaId,
        enPromocion: rows[0].promocion === 'Tiene promoción', // Ajusta según tu lógica
        categoriaNombre: rows[0].categoriaNombre,
        marcaNombre: rows[0].marcaNombre,
        tallaNombre: rows[0].tallaNombre,
      });
    
      return producto.toDetalle(); // Asegúrate de que esto esté llamando al método correcto
    } catch (error) {
      console.error("Error al buscar producto por ID:", error);
      return new NullProducto().toDetalle();
    }
  }

  /**
   * findByName
   * 
   * Retrieves a product based on its name.
   * If the product is not found, returns a NullProducto object.
   * 
   * @param {string} nombre - The name of the product to be retrieved.
   * @returns {Promise<AbstractProducto>} - A promise that resolves to the product object or a NullProducto object.
   */
  async findByName(nombre: string): Promise<AbstractProducto> {
    try {
      const rows = await this.queries.findByName(nombre);
      if (rows.length === 0) {
        return new NullProducto();
      }
      return new Producto({
        idProducto: rows[0].idProducto,
        nombreProducto: rows[0].nombreProducto,
        descripcionProducto: rows[0].descripcionProducto,
        precioProducto: rows[0].precioProducto,
        stockProducto: rows[0].stockProducto,
        imagenProducto: rows[0].imgProducto, // Asegúrate de que este campo esté presente
        categoriaId: rows[0].categoriaId,
        enPromocion: rows[0].promocion === 'Tiene promoción', // Ajusta según tu lógica
        categoriaNombre: rows[0].categoriaNombre,
        marcaNombre: rows[0].marcaNombre,
        tallaNombre: rows[0].tallaNombre,
      });
    } catch (error) {
      console.error("Error al buscar producto por nombre:", error);
      return new NullProducto();
    }
  }

  async search(termino: string): Promise<AbstractProducto[]> {
    try {
      const rows: IDataProducto[] = await this.queries.search(termino);
      return rows.map((producto: IDataProducto) => new Producto({
        idProducto: producto.idProducto,
        nombreProducto: producto.nombreProducto,
        descripcionProducto: producto.descripcionProducto,
        precioProducto: producto.precioProducto,
        stockProducto: producto.stockProducto,
        imagenProducto: producto.imgProducto, // Asegúrate de que este campo esté presente
        categoriaId: producto.categoriaId,
        enPromocion: producto.promocion === 'Tiene promoción', // Ajusta según tu lógica
        categoriaNombre: producto.categoriaNombre,
        marcaNombre: producto.marcaNombre,
        tallaNombre: producto.tallaNombre,
      }));
    } catch (error) {
      console.error("Error al buscar productos:", error);
      return [new NullProducto()];
    }
  }

  async findByPriceRange(min: number, max: number): Promise<AbstractProducto[]> {
    try {
      console.log(`Buscando productos con precio entre ${min} y ${max}`);
      
      // Llamada a la base de datos
      const rows: IDataProducto[] = await this.queries.findByPriceRange(min, max);
      console.log("Productos obtenidos de la base de datos:", rows);
  
      if (rows.length === 0) {
        console.log("No hay productos, devolviendo NullProducto.");
        return [new NullProducto()];
      }
      
      // Mapeo de productos
      return rows.map((producto: IDataProducto) => {
        console.log("Producto recibido:", producto);
  
        const enPromocion = producto.promocion === 'En promoción';
        console.log(`Estado de promoción para el producto ${producto.nombreProducto}:`, enPromocion);
  
        return new Producto({
          idProducto: producto.idProducto,
          nombreProducto: producto.nombreProducto,
          descripcionProducto: producto.descripcionProducto,
          precioProducto: producto.precioProducto,
          stockProducto: producto.stockProducto,
          imagenProducto: producto.imgProducto, 
          categoriaId: producto.categoriaId,
          enPromocion: enPromocion,
          categoriaNombre: producto.categoriaNombre,
          marcaNombre: producto.marcaNombre,
          tallaNombre: producto.tallaNombre,
        });
      });
    } catch (error) {
      console.error("Error al buscar productos por rango de precios:", error);
      return [new NullProducto()];
    }
  }
  

  /**
   * getShowcase
   * 
   * Retrieves a showcase view of products.
   * If no products are found, returns an array containing a NullProducto object in showcase format.
   * 
   * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products in showcase format or a NullProducto object.
   */
  async getShowcase(): Promise<IProductoVitrina[]> {
    try {
      const result: any = await this.queries.getShowcase();
      const rows: IProductoData[] = result;
  
      // Verifica si rows es un array
      if (!Array.isArray(rows)) {
        return [new NullProducto().toVitrina()];
      }
  
      return rows.map((producto: IProductoData) => {
        
        const enPromocion = producto.enPromocion === 'Sí';  
  
        return new Producto({
          idProducto: producto.idProducto,
          nombreProducto: producto.nombreProducto,
          descripcionProducto: producto.descripcionProducto,
          precioProducto: producto.precioProducto,
          stockProducto: producto.stockProducto,
          imagenProducto: producto.imagenProducto,
          categoriaId: producto.categoriaId,
          enPromocion,  // Asigna el valor correctamente
          categoriaNombre: producto.categoriaNombre,
          marcaNombre: producto.marcaNombre,
          tallaNombre: producto.tallaNombre,
        }).toVitrina();
      });
    } catch (error) {
      console.error("Error al obtener productos destacados:", error);
      return [new NullProducto().toVitrina()];
    }
  }
  

/**
   * getShowcase1
   * 
   * Retrieves the first batch of products for the showcase (products 1 to 12).
   * If no products are found, returns an array containing a NullProducto object in showcase format.
   * 
   * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products in showcase format (1 to 12).
   */
async getShowcase1(): Promise<IProductoVitrina[]> {
  try {
    const result: any = await this.queries.getShowcase1();  // Fetching products 1 to 12
    const rows: IProductoData[] = result;

    // Verifies if rows is an array
    if (!Array.isArray(rows)) {
      return [new NullProducto().toVitrina()];
    }

    return rows.map((producto: IProductoData) =>
      new Producto({
        idProducto: producto.idProducto,
        nombreProducto: producto.nombreProducto,
        descripcionProducto: producto.descripcionProducto,
        precioProducto: producto.precioProducto,
        stockProducto: producto.stockProducto,
        imagenProducto: producto.imagenProducto,
        categoriaId: producto.categoriaId,
        enPromocion: producto.enPromocion === 'Sí',
        categoriaNombre: producto.categoriaNombre,
        marcaNombre: producto.marcaNombre,
        tallaNombre: producto.tallaNombre,
      }).toVitrina()
    );
  } catch (error) {
    console.error("Error al obtener productos destacados (1-12):", error);
    return [new NullProducto().toVitrina()];
  }
}

/**
 * getShowcase2
 * 
 * Retrieves the second batch of products for the showcase (products 12 to 24).
 * If no products are found, returns an array containing a NullProducto object in showcase format.
 * 
 * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products in showcase format (12 to 24).
 */
async getShowcase2(): Promise<IProductoVitrina[]> {
  try {
    const result: any = await this.queries.getShowcase2();  // Fetching products 12 to 24
    const rows: IProductoData[] = result;

    // Verifies if rows is an array
    if (!Array.isArray(rows)) {
      return [new NullProducto().toVitrina()];
    }

    return rows.map((producto: IProductoData) =>
      new Producto({
        idProducto: producto.idProducto,
        nombreProducto: producto.nombreProducto,
        descripcionProducto: producto.descripcionProducto,
        precioProducto: producto.precioProducto,
        stockProducto: producto.stockProducto,
        imagenProducto: producto.imagenProducto,
        categoriaId: producto.categoriaId,
        enPromocion: producto.enPromocion === 'Sí',
        categoriaNombre: producto.categoriaNombre,
        marcaNombre: producto.marcaNombre,
        tallaNombre: producto.tallaNombre,
      }).toVitrina()
    );
  } catch (error) {
    console.error("Error al obtener productos destacados (12-24):", error);
    return [new NullProducto().toVitrina()];
  }
}

/**
 * getShowcase3
 * 
 * Retrieves the third batch of products for the showcase (products 24 to 36).
 * If no products are found, returns an array containing a NullProducto object in showcase format.
 * 
 * @returns {Promise<IProductoVitrina[]>} - A promise that resolves to an array of products in showcase format (24 to 36).
 */
async getShowcase3(): Promise<IProductoVitrina[]> {
  try {
    const result: any = await this.queries.getShowcase3();  // Fetching products 24 to 36
    const rows: IProductoData[] = result;

    // Verifies if rows is an array
    if (!Array.isArray(rows)) {
      return [new NullProducto().toVitrina()];
    }

    return rows.map((producto: IProductoData) =>
      new Producto({
        idProducto: producto.idProducto,
        nombreProducto: producto.nombreProducto,
        descripcionProducto: producto.descripcionProducto,
        precioProducto: producto.precioProducto,
        stockProducto: producto.stockProducto,
        imagenProducto: producto.imagenProducto,
        categoriaId: producto.categoriaId,
        enPromocion: producto.enPromocion === 'Sí',
        categoriaNombre: producto.categoriaNombre,
        marcaNombre: producto.marcaNombre,
        tallaNombre: producto.tallaNombre,
      }).toVitrina()
    );
  } catch (error) {
    console.error("Error al obtener productos destacados (24-36):", error);
    return [new NullProducto().toVitrina()];
  }
}
}