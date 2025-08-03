import RouterExpressInterface from "../../../Express/domain/RouterExpressInterface";
import { MySQLUsuarioQueries } from "../../../Mysql/infrastructura/Queries/MySQLUsuarioQueries";
import UsuarioUseCase from "../../application/UsuarioUseCase";
import UsuarioService from "../../application/service/UsuarioService";
import UsuarioServiceInterface from "../../Domain/interfaces/UsuarioServiceInterface";
import { IUsuarioRepository } from "../../Domain/Port/Driven/IUsuarioRepository";
import UsuarioControladorExpress from "../Controller/CarritoControladorExpress";
import { MySQLUsuarioRepository } from "../Repository/MySQLUsuarioRepository";
import UsuarioRouterExpress from "../router/UsuarioRouterExpress";

/**
 * UsuarioRouterFactory is a factory class responsible for creating
 * the necessary components for the user feature,
 * including the repository, service, use case, controller, and router.
 */
export default class UsuarioRouterFactory {

  /**
   * Creates and returns a RouterExpressInterface instance configured
   * with the user controller.
   * 
   * @returns {RouterExpressInterface} - A configured router for handling user routes.
   */
  public static create(): RouterExpressInterface {
    // Obtain the database connection
    const mysqlUsuarioQueries = new MySQLUsuarioQueries();

    // Create the user repository
    const usuarioRepository: IUsuarioRepository = new MySQLUsuarioRepository(mysqlUsuarioQueries);

    // Create the user service
    const usuarioService: UsuarioServiceInterface = new UsuarioService(usuarioRepository);

    // Create the user use case
    const usuarioUseCase = new UsuarioUseCase(usuarioService);

    // Create the user controller
    const usuarioController = new UsuarioControladorExpress(usuarioUseCase);

    // Return the router with the controller
    return new UsuarioRouterExpress(usuarioController);
  }
}