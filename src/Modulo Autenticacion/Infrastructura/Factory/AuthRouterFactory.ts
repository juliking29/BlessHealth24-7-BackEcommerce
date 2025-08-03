import AuthUseCase from "../../application/UseCase/ProductoUseCase";
import AuthService from "../../application/service/AuthService";
import AuthServiceInterface from "../../Domain/Interfaces/AuthServiceInterface";
import { IAuthRepository } from "../../Domain/Port/Driven/IAuthRepository";
import AuthControllerExpress from "../Controller/AuthControllerExpress";
import { MySQLAuthRepositoryWithBcryptandJwt } from "../Repository/MySQLAuthRepositoryWithBcryptandJwt";
import AuthRouterExpress from "../router/AuthRouterExpress";
import { IBcryptService } from "../../../Bycript/Domain/IBcryptService";
import { BcryptService } from "../../../Bycript/Infrastructura/BcryptService";
import RouterExpressInterface from "../../../Express/domain/RouterExpressInterface";
import { JWTService } from "../../../jwt/Infrastructura/JWTService";
import { MySQLAuthQueries } from "../../../Mysql/infrastructura/Queries/MySQLAuthQueries";

/**
 * AuthRouterFactory is a factory class responsible for creating
 * instances of the authentication router and its dependencies.
 */
export default class AuthRouterFactory {
  
  /**
   * Creates and returns an instance of AuthRouterExpress.
   * 
   * @returns {RouterExpressInterface} - An instance of the authentication router.
   */
  public static create(): RouterExpressInterface {
  
    const authQueries = new MySQLAuthQueries(); // Create an instance of MySQLAuthQueries
    const jWTService = new JWTService(); // Create an instance of JWTService
    const bcryptService: IBcryptService = new BcryptService(); // Create an instance of BcryptService
    const authRepository: IAuthRepository = new MySQLAuthRepositoryWithBcryptandJwt(authQueries, jWTService, bcryptService); // Create an instance of the auth repository
    const authService: AuthServiceInterface = new AuthService(authRepository); // Create an instance of AuthService
    const authUseCase = new AuthUseCase(authService); // Create an instance of AuthUseCase
    const authController = new AuthControllerExpress(authUseCase); // Create an instance of AuthControllerExpress

    return new AuthRouterExpress(authController); // Return the authentication router
  }
}