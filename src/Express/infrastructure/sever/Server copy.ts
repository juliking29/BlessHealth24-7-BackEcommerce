import express, { Application } from 'express';
import https from 'https';
import http from 'http'; // Importación para HTTP
import fs from 'fs';
import ExpressProvider from '../provider/ExpressProvider';
import RouterExpressInterface from '../../domain/RouterExpressInterface';
import ErrorRouterExpressInterface from '../error/router/ErrorExpressRouter';

/**
 * Server class is responsible for setting up and running the Express application,
 * including configuring routes and handling errors.
 */
export default class Server {

  private readonly app: Application; // Express application instance

  /**
   * Initializes the Server with the provided routes and error handler.
   * 
   * @param {RouterExpressInterface[]} routesExpress - An array of router instances for the application.
   * @param {ErrorRouterExpressInterface} error - The error router instance for handling errors.
   */
  constructor(
    private readonly routesExpress: RouterExpressInterface[],
    private readonly error: ErrorRouterExpressInterface
  ) {
    this.app = express(); // Create an Express application
    this.configure(); // Configure middleware
    this.routes(); // Set up routes
  }

  /**
   * Sets up the routes for the application.
   */
  public routes() {
    this.routesExpress.forEach((route) => {
      this.app.use(route.path, route.router);
    });

    this.app.use(this.error.path, this.error.router);
  }

  /**
   * Configures middleware for the application.
   */
  public configure() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  /**
   * Starts the server and listens for incoming requests on both HTTP and HTTPS.
   */
  public start() {
    const HOST = ExpressProvider.getHost();
    const PORT = ExpressProvider.getPort();
    const HTTP_PORT = 3001; 
    const PROTOCOL = ExpressProvider.getProtocol();

    // HTTPS options
    const httpsOptions = {
      key: fs.readFileSync('C:/Users/cpsab/Desktop/Nueva carpeta (5)/parcailProyecto-back/certificates/buenavida-key.pem'),
      cert: fs.readFileSync('C:/Users/cpsab/Desktop/Nueva carpeta (5)/parcailProyecto-back/certificates/buenavida-cert.pem'),
    };

    // Start HTTPS server
    https.createServer(httpsOptions, this.app).listen(PORT, () => {
      console.log(`✅ HTTPS Server running at ${PROTOCOL}://${HOST}:${PORT}`);
    });

    // Start HTTP server
    http.createServer(this.app).listen(HTTP_PORT, () => {
      console.log(`✅ HTTP Server running at http://${HOST}:${HTTP_PORT}`);
    });
  }
}
