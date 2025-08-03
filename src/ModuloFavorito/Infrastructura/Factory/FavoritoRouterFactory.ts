import { IFavoritoRepository } from '../../Domain/Port/Driven/IFavoritoRepository';
import FavoritoServiceInterface from '../../Domain/interfaces/FavoritoServiceInterface';
import FavoritoService from '../../application/service/FavoritoService';
import FavoritoControladorExpress from '../Controller/FavoritoControladorExpress';
import RouterExpressInterface from '../../../Express/domain/RouterExpressInterface';
import FavoritoUseCase from '../../application/UseCase/FavoritoUseCase';
import FavoritoRouterExpress from '../router/FavoritoRouterExpress';
import { MySQLFavoritoRepository } from '../Repository/MySQLFavoritoRepository';
import { MySQLFavoritoQueries } from '../../../Mysql/infrastructura/Queries/MySQLFavoritoQueries';

/**
 * FavoritoRouterFactory is a factory class responsible for creating
 * the necessary components for the favorite items feature,
 * including the repository, service, use case, controller, and router.
 */
export default class FavoritoRouterFactory {
  
  /**
   * Creates and returns a RouterExpressInterface instance configured
   * with the favorite items controller.
   * 
   * @returns {RouterExpressInterface} - A configured router for handling favorite item routes.
   */
  public static create(): RouterExpressInterface {
    // Obtain the database connection
    const mysqlProductoQueries = new MySQLFavoritoQueries();

    // Create the favorite repository
    const favoritoRepository: IFavoritoRepository = new MySQLFavoritoRepository(mysqlProductoQueries);

    // Create the favorite service
    const favoritoService: FavoritoServiceInterface = new FavoritoService(favoritoRepository);

    // Create the favorite use case
    const favoritoUseCase = new FavoritoUseCase(favoritoService);

    // Create the favorite controller
    const favoritoController = new FavoritoControladorExpress(favoritoUseCase);

    // Return the router with the controller
    return new FavoritoRouterExpress(favoritoController);
  }
}