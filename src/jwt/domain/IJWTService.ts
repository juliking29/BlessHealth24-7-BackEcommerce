/**
 * IJWTService defines the methods for handling JSON Web Tokens (JWT).
 */
export interface IJWTService {
  
    /**
     * Generates a JWT token based on the provided payload.
     * 
     * @param {any} payload - The data to be encoded in the token.
     * @returns {string} - The generated JWT token.
     */
    generateToken(payload: any): string;
  
    /**
     * Verifies the provided JWT token and decodes its payload.
     * 
     * @param {string} token - The JWT token to verify.
     * @returns {any} - The decoded payload of the token if valid, otherwise an error.
     */
    verifyToken(token: string): any;
  }