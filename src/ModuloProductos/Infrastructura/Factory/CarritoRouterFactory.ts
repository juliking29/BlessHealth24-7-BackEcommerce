import { MySQLProductoRepository } from '../Repository/MySQLProductoRepository';
import { IProductoRepository } from '../../Domain/Port/Driven/IProductoRepository';
import ProductoServiceInterface from '../../Domain/interfaces/ProductoServiceInterface';
import ProductoService from '../../application/service/ProductoService';
import ProductoControladorExpress from '../Controller/ProductoControladorExpress';
import RouterExpressInterface from '../../../Express/domain/RouterExpressInterface';
import ProductoUseCase from '../../application/UseCase/ProductoUseCase';
import ProductoRouterExpress from '../router/ProductoRouterExpress';
import { MySQLProductoQueries } from '../../../Mysql/infrastructura/Queries/MySQLProductoQueries';

/**
 * ProductoRouterFactory is a factory class responsible for creating
 * the necessary components for the product feature,
 * including the repository, service, use case, controller, and router.
 */
export default class ProductoRouterFactory {

  /**
   * Creates and returns a RouterExpressInterface instance configured
   * with the product controller.
   * 
   * @returns {RouterExpressInterface} - A configured router for handling product routes.
   */
  public static create(): RouterExpressInterface {
    // Obtain the database connection
    const mysqlProductoQueries = new MySQLProductoQueries();

    // Create the product repository
    const productoRepository: IProductoRepository = new MySQLProductoRepository(mysqlProductoQueries);
    
    // Create the product service
    const productoService: ProductoServiceInterface = new ProductoService(productoRepository);
    
    // Create the product use case
    const productoUseCase = new ProductoUseCase(productoService);
    
    // Create the product controller
    const productoController = new ProductoControladorExpress(productoUseCase);
    
    // Return the router with the controller
    return new ProductoRouterExpress(productoController);
  }
}