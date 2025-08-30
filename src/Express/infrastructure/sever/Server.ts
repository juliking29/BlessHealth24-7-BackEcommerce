import express, { Application } from 'express';
import http from 'http';
import cors from 'cors';
import ExpressProvider from '../provider/ExpressProvider';
import RouterExpressInterface from '../../domain/RouterExpressInterface';
import ErrorRouterExpressInterface from '../error/router/ErrorExpressRouter';

export default class Server {
  private readonly app: Application;

  constructor(
    private readonly routesExpress: RouterExpressInterface[],
    private readonly error: ErrorRouterExpressInterface
  ) {
    this.app = express();
    this.configure();
    this.routes();
    this.addHealthCheck();
  }

  /**
   * Configuración mejorada de middleware con CORS
   */
  public configure() {
    // Configuración detallada de CORS
    const corsOptions = {
      origin: [
        'http://127.0.0.1:5501',
        'http://localhost:5501',
        'http://127.0.0.1:3000',
        'http://localhost:3000',
        
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      optionsSuccessStatus: 200
    };

    // Middlewares
    this.app.use(cors(corsOptions)); // Usa la configuración personalizada
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    // Manejo explícito de OPTIONS para CORS preflight
    this.app.options('*', cors(corsOptions));
  }

  public routes() {
    this.routesExpress.forEach((route) => {
      this.app.use(route.path, route.router);
    });

    this.app.use(this.error.path, this.error.router);
  }
    private addHealthCheck() {
    this.app.get('/health', (_req, res) => {
      res.status(200).json({ status: 'OK', message: 'Server is running' });
    });
  }

  public start() {
    const HOST = ExpressProvider.getHost();
    const PORT = ExpressProvider.getPort();

    // Start HTTP server only
    http.createServer(this.app).listen(PORT, () => {
      console.log(`✅ HTTP Server running at http://${HOST}:${PORT}`);
    });
  }
}