/**
 * IBcryptService defines the methods for handling password hashing
 * and comparison using bcrypt.
 */
export interface IBcryptService {
  
    /**
     * Hashes a plain text password.
     * 
     * @param {string} password - The plain text password to hash.
     * @returns {Promise<string>} - A promise that resolves to the hashed password.
     */
    hashPassword(password: string): Promise<string>;
  
    /**
     * Compares a plain text password with a hashed password.
     * 
     * @param {string} password - The plain text password to compare.
     * @param {string} hashedPassword - The hashed password to compare against.
     * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, otherwise false.
     */
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
  }