// interfaces/DecodedToken.ts

/**
 * DecodedToken represents the structure of a decoded JWT token.
 */
export interface DecodedToken {
  
    /**
     * The role of the user associated with the token.
     * 
     * @type {string}
     */
    rol: string;
  }