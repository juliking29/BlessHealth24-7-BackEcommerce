import { Router } from 'express';
import ErrorControllerExpressInterface from '../../../domain/ErrorControllerExpressInterface';
import RouterExpressInterface from '../../../domain/RouterExpressInterface';

/**
 * ErrorExpressRouter implements the RouterExpressInterface,
 * defining a router for handling errors in an Express application.
 */
export default class ErrorExpressRouter implements RouterExpressInterface {
  
  router: Router; // Express router instance
  path: string; // Base path for the router

  /**
   * Initializes the ErrorExpressRouter with the provided error controller.
   * 
   * @param {ErrorControllerExpressInterface} errorController - The controller for handling errors.
   */
  constructor(private readonly errorController: ErrorControllerExpressInterface) {
    this.router = Router(); // Initialize the router
    this.path = '*'; // Set the base path to catch all routes
    this.routes(); // Define the routes
  }

  /**
   * Defines the routes for error handling.
   */
  public routes() {
    this.router.use('*', this.errorController.error.bind(this.errorController)); // Bind the error handling method to all routes
  }
}