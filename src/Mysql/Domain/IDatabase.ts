import { Pool } from "mysql2/promise";

/**
 * IDatabase defines the methods for interacting with the database.
 */
export default interface IDatabase {
  
  /**
   * Retrieves the connection pool for the database.
   * 
   * @returns {Pool} - The connection pool for the database.
   */
  getPool(): Pool;
}