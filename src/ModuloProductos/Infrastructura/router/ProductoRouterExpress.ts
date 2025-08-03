import { Router } from 'express';
import ProductoControladorExpressInterface from '../../Domain/interfaces/ProductoControladorExpressInterface';
import ProductoRouterExpressInterface from '../../Domain/interfaces/ProductoRouterExpressInterface';

/**
 * ProductoRouterExpress implements the ProductoRouterExpressInterface,
 * defining the routes related to product operations in an Express application.
 */
export default class ProductoRouterExpress implements ProductoRouterExpressInterface {
  router: Router;
  path: string;

  /**
   * Constructor for ProductoRouterExpress.
   * 
   * @param {ProductoControladorExpressInterface} productoControlador - An instance of the product controller for handling requests.
   */
  constructor(private readonly productoControlador: ProductoControladorExpressInterface) {
    this.router = Router();
    this.path = '/producto';
    this.routes();
  }

  /**
   * Initializes the routes for product operations.
   */
  public routes(): void {
    this.obtenerProductoPorId();
    this.obtenerProductoPorNombre();
    this.obtenerProductosPorRangoDePrecio();
    this.buscarProductos();
    this.obtenerVitrina();
    this.obtenerVitrina1();  // Nueva ruta para vitrina 1
    this.obtenerVitrina2();  // Nueva ruta para vitrina 2
    this.obtenerVitrina3();  // Nueva ruta para vitrina 3
  }

  /**
   * Defines the route for retrieving a product's details based on its ID.
   */
  public obtenerProductoPorId(): void {
    this.router.get('/id/:id', this.productoControlador.obtenerProductoPorId.bind(this.productoControlador));
  }

  /**
   * Defines the route for retrieving a product's details based on its name.
   */
  public obtenerProductoPorNombre(): void {
    this.router.get('/nombre/:nombre', this.productoControlador.obtenerProductoPorNombre.bind(this.productoControlador));
  }

  /**
   * Defines the route for retrieving products within a specified price range.
   */
  public obtenerProductosPorRangoDePrecio(): void {
    this.router.get('/rango-precio/:precioMin/:precioMax', this.productoControlador.obtenerProductosPorRangoDePrecio.bind(this.productoControlador));
  }

  /**
   * Defines the route for searching for products based on a search term.
   */
  public buscarProductos(): void {
    this.router.get('/buscar/:termino', this.productoControlador.buscarProductos.bind(this.productoControlador));
  }

  /**
   * Defines the route for retrieving a showcase view of products.
   */
  public obtenerVitrina(): void {
    this.router.get('/obtenervitrina', this.productoControlador.obtenerVitrina.bind(this.productoControlador));
  }

  /**
   * Defines the route for retrieving a showcase view of products (vitrina 1).
   */
  public obtenerVitrina1(): void {
    this.router.get('/obtenervitrina1', this.productoControlador.obtenerVitrina1.bind(this.productoControlador));
  }

  /**
   * Defines the route for retrieving a showcase view of products (vitrina 2).
   */
  public obtenerVitrina2(): void {
    this.router.get('/obtenervitrina2', this.productoControlador.obtenerVitrina2.bind(this.productoControlador));
  }

  /**
   * Defines the route for retrieving a showcase view of products (vitrina 3).
   */
  public obtenerVitrina3(): void {
    this.router.get('/obtenervitrina3', this.productoControlador.obtenerVitrina3.bind(this.productoControlador));
  }
}
