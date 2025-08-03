import bcrypt from "bcrypt";
import { IBcryptService } from '../Domain/IBcryptService'; 

/**
 * BcryptService implements the IBcryptService interface,
 * providing methods for hashing and comparing passwords using bcrypt.
 */
export class BcryptService implements IBcryptService {
  
  private readonly saltRounds: number; // Number of salt rounds for hashing

  /**
   * Initializes the BcryptService with the specified number of salt rounds.
   * 
   * @param {number} saltRounds - The number of salt rounds for hashing (default is 10).
   */
  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds; // Set the salt rounds
  }

  /**
   * Hashes a plain text password.
   * 
   * @param {string} password - The plain text password to hash.
   * @returns {Promise<string>} - A promise that resolves to the hashed password.
   */
  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds); // Hash the password with the specified salt rounds
  }

  /**
   * Compares a plain text password with a hashed password.
   * 
   * @param {string} password - The plain text password to compare.
   * @param {string} hashedPassword - The hashed password to compare against.
   * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, otherwise false.
   */
  public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword); // Compare the plain text password with the hashed password
  }
}