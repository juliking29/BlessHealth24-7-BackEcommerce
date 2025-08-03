import RouterExpressInterface from "../../../Express/domain/RouterExpressInterface";
import { MySQLPagoQueries } from "../../../Mysql/infrastructura/Queries/MySQLPagoQueries";
import PagoService from "../../application/service/PagoService";
import PagoUseCase from "../../application/UseCase/UsuarioUseCase";
import PagoServiceInterface from "../../Domain/interfaces/PagoServiceInterface";
import { IPagoRepository } from "../../Domain/Port/Driven/IUsuarioRepository";
import PagoControladorExpress from "../Controller/CarritoControladorExpress";
import { MySQLPagoRepository } from "../Repository/MySQLUsuarioRepository";
import PagoRouterExpress from "../router/PagoRouterExpress";

/**
 * PagoRouterFactory is responsible for creating instances of the router,
 * controller, service, and repository for managing payment operations.
 */
export default class PagoRouterFactory {
  
  /**
   * Creates and configures the PagoRouterExpress instance.
   * 
   * @returns {RouterExpressInterface} - An instance of RouterExpressInterface configured for payment operations.
   */
  public static create(): RouterExpressInterface {
    const mysqlPagoQueries = new MySQLPagoQueries(); // Create MySQL queries for payments

    const pagoRepository: IPagoRepository = new MySQLPagoRepository(mysqlPagoQueries); // Create the payment repository

    const pagoService: PagoServiceInterface = new PagoService(pagoRepository); // Create the payment service

    const pagoUseCase = new PagoUseCase(pagoService); // Create the payment use case

    const pagoController = new PagoControladorExpress(pagoUseCase); // Create the payment controller

    return new PagoRouterExpress(pagoController); // Return the configured payment router
  }
}