import mysql, { Pool } from "mysql2/promise";
import dotenv from "dotenv";
import IDatabase from "../../Domain/IDatabase";

dotenv.config();

/**
 * MySQLDatabase is a singleton class responsible for managing
 * the MySQL database connection pool.
 */
class MySQLDatabase implements IDatabase {

  private static instance: MySQLDatabase; // Singleton instance
  private pool: Pool; // MySQL connection pool

  /**
   * Private constructor to prevent direct instantiation.
   * Initializes the connection pool with configuration from environment variables.
   */
  private constructor() {
    this.pool = mysql.createPool({
      host: process.env["DB_HOST"] || "ecomerce-fernandojvega-6a9d.e.aivencloud.com", // Database host
      user: process.env["DB_USER"] || "avnadmin", // Database user
      password: process.env["DB_PASSWORD"] || "buenavidaparcialfinal", // Database password
      database: process.env["DB_NAME"] || "test", // Database name
      port: parseInt(process.env["DB_PORT"] || "18946"), // Database port
      waitForConnections: true, // Wait for connections
      connectionLimit: 10, // Maximum number of connections
      ssl: {
         rejectUnauthorized: false
      }
    });
  }

  /**
   * Returns the singleton instance of MySQLDatabase.
   * 
   * @returns {MySQLDatabase} - The singleton instance of MySQLDatabase.
   */
  public static getInstance(): MySQLDatabase {
    if (!MySQLDatabase.instance) {
      MySQLDatabase.instance = new MySQLDatabase(); // Create a new instance if it doesn't exist
    }
    return MySQLDatabase.instance; // Return the singleton instance
  }

  /**
   * Retrieves the connection pool for the database.
   * 
   * @returns {Pool} - The connection pool for the database.
   */
  public getPool(): Pool {
    return this.pool; // Return the connection pool
  }
}

// Export the singleton instance of MySQLDatabase
export default MySQLDatabase.getInstance();


