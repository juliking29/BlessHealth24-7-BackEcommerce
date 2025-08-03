import RouterExpressInterface from '../../domain/RouterExpressInterface';
import ErrorExpressController from '../error/controller/ErrorExpressController';
import ErrorExpressRouter from '../error/router/ErrorExpressRouter';
import Server from '../sever/Server';

/**
 * ServerFactory is a factory class responsible for creating
 * instances of the server and its associated routers.
 */
export default class ServerFactory {
  
  /**
   * Creates and returns an instance of the Server with the provided routers.
   * 
   * @param {RouterExpressInterface[]} routers - An array of routers to be used by the server.
   * @returns {Server} - An instance of the Server.
   */
  public static readonly create = (
    routers: RouterExpressInterface[]
  ): Server => {
    const errorController = new ErrorExpressController(); // Create an instance of the error controller
    const errorRouter = new ErrorExpressRouter(errorController); // Create an instance of the error router
    return new Server(routers, errorRouter); // Return the server instance with the routers
  }
}