import { Router } from 'express';

/**
 * RouterExpressInterface defines the structure for routers in an Express application.
 */
export default interface RouterExpressInterface {
  
  /**
   * The Express router instance.
   */
  router: Router;

  /**
   * The base path for the router.
   */
  path: string;

  /**
   * Defines the routes for the router.
   */
  routes(): void;
}