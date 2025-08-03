/**
 * ICarritoQueries defines the methods for interacting with the shopping cart
 * in the application, including operations for managing cart items and totals.
 */
export interface ICarritoQueries {
  
  /**
   * Calculates the total amounts for the user's shopping cart.
   * 
   * @param {number} idUsuario - The ID of the user whose cart totals are to be calculated.
   * @returns {Promise<any>} - A promise that resolves to the total amounts.
   */
  calcularTotalesCarrito(idUsuario: number): Promise<any>;

  /**
   * Retrieves the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user whose cart is to be retrieved.
   * @returns {Promise<any[]>} - A promise that resolves to an array of items in the cart.
   */
  verMiCarrito(usuarioId: number): Promise<any[]>;

  /**
   * Adds a product to the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to add.
   * @param {number} cantidad - The quantity of the product to add.
   * @returns {Promise<void>} - A promise that resolves when the product is added.
   */
  agregarProductoAlCarrito(usuarioId: number, productoId: number, cantidad: number): Promise<void>;

  /**
   * Removes a product from the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to remove.
   * @returns {Promise<void>} - A promise that resolves when the product is removed.
   */
  eliminarProductoDelCarrito(usuarioId: number, productoId: number): Promise<void>;

  /**
   * Increases the quantity of a product in the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to increase.
   * @returns {Promise<number>} - A promise that resolves to the new quantity of the product.
   */
  aumentarCantidadProducto(usuarioId: number, productoId: number): Promise<number>;

  /**
   * Decreases the quantity of a product in the user's shopping cart.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @param {number} productoId - The ID of the product to decrease.
   * @returns {Promise<number>} - A promise that resolves to the new quantity of the product.
   */
  disminuirCantidadProducto(usuarioId: number, productoId: number): Promise<number>;

  /**
   * Retrieves the complete shopping cart for the user.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @returns {Promise<any>} - A promise that resolves to the complete cart details.
   */
  verCarritoCompleto(usuarioId: number): Promise<any>;

  /**
   * Executes a stored procedure with the given parameters.
   * 
   * @param {string} procedure - The name of the stored procedure to execute.
   * @param {any[]} params - The parameters to pass to the stored procedure.
   * @returns {Promise<any>} - A promise that resolves to the result of the stored procedure.
   */
  executeStoredProcedure(procedure: string, params: any[]): Promise<any>;

  /**
   * Retrieves the cart ID for the specified user.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @returns {Promise<number>} - A promise that resolves to the cart ID.
   */
  obtenerIdCarrito(usuarioId: number): Promise<number>;

  /**
   * Creates a new shopping cart for the specified user.
   * 
   * @param {number} usuarioId - The ID of the user.
   * @returns {Promise<void>} - A promise that resolves when the cart is created.
   */
  crearNuevoCarrito(usuarioId: number): Promise<void>;

  /**
   * Retrieves the products in the specified shopping cart.
   * 
   * @param {number} carritoId - The ID of the cart.
   * @returns {Promise<any[]>} - A promise that resolves to an array of products in the cart.
   */
  verProductosEnCarrito(carritoId: number): Promise<any[]>;

  /**
   * Calculates the total amounts for the complete shopping cart of the user.
   * 
   * @param {number} idUsuario - The ID of the user whose complete cart totals are to be calculated.
   * @returns {Promise<any>} - A promise that resolves to the total amounts for the complete cart.
   */
  calcularTotalesCarritoCompleto(idUsuario: number): Promise<any>;
}