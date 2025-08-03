/**
 * ExpressProvider is a singleton class responsible for managing
 * the configuration of the Express application, including host,
 * port, and protocol settings.
 */
export default class ExpressProvider {
  
  private static instance: ExpressProvider; // Singleton instance
  private static HOST: string; // Host address
  private static PORT: string; // Port number
  private static PROTOCOL: string; // Protocol (e.g., http, https)

  /**
   * Private constructor to prevent direct instantiation.
   * Initializes the host, port, and protocol from environment variables
   * or defaults to 'localhost', '3000', and 'http' respectively.
   */
  private constructor() {
    ExpressProvider.HOST = process.env['HOST'] ?? 'localhost';
    ExpressProvider.PORT = process.env['PORT'] ?? '3000';
    ExpressProvider.PROTOCOL = process.env['PROTOCOL'] ?? 'http';    
  }

  /**
   * Returns the singleton instance of ExpressProvider.
   * 
   * @returns {ExpressProvider} - The singleton instance of ExpressProvider.
   */
  public static getInstance(): ExpressProvider {
    if (ExpressProvider.instance === null || ExpressProvider.instance === undefined) {
      ExpressProvider.instance = new ExpressProvider(); // Create a new instance if it doesn't exist
    }
    return ExpressProvider.instance; // Return the singleton instance
  }

  /**
   * Retrieves the host address.
   * 
   * @returns {string} - The host address.
   */
  public static getHost(): string {
    ExpressProvider.getInstance(); // Ensure the instance is initialized
    return ExpressProvider.HOST; // Return the host
  }

  /**
   * Retrieves the port number.
   * 
   * @returns {string} - The port number.
   */
  public static getPort(): string {
    ExpressProvider.getInstance(); // Ensure the instance is initialized
    return ExpressProvider.PORT; // Return the port
  }

  /**
   * Retrieves the protocol.
   * 
   * @returns {string} - The protocol (e.g., http, https).
   */
  public static getProtocol(): string {
    ExpressProvider.getInstance(); // Ensure the instance is initialized
    return ExpressProvider.PROTOCOL; // Return the protocol
  }

  /**
   * Constructs and retrieves the full API domain URL.
   * 
   * @returns {string} - The full API domain URL.
   */
  public static getAPIDomain(): string {
    ExpressProvider.getInstance(); // Ensure the instance is initialized
    return `${ExpressProvider.PROTOCOL}://${ExpressProvider.HOST}:${ExpressProvider.PORT}`; // Return the API domain
  }
}