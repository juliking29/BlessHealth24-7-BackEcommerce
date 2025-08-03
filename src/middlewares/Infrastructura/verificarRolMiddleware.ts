import { Request, Response, NextFunction } from 'express';
// Ensure to import the service
import { DecodedToken } from '../domain/DecodedToken';
import { JWTService } from '../../jwt/Infrastructura/JWTService';

const jwtService = new JWTService();

/**
 * Middleware to verify user roles for protected routes.
 * 
 * @param {string[]} rolesPermitidos - An array of allowed roles for accessing the route.
 * @returns {Function} - A middleware function that checks the user's role.
 */
export const verificarRolMiddleware = (rolesPermitidos: string[]) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const token = req.headers['authorization']?.split(' ')[1]; // Extract token from authorization header

            if (!token) {
                return res.status(401).json({ error: 'Token no proporcionado.' }); // Return error if token is missing
            }

            const decoded = jwtService.verifyToken(token) as DecodedToken; // Decode the token
            const rolUsuarioSolicitante = decoded.rol; // Get the user's role from the decoded token
           
            if (!rolesPermitidos.includes(rolUsuarioSolicitante)) {
                return res.status(403).json({ error: 'No tienes permisos para realizar esta acción.' }); // Return error if role is not allowed
            }

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error('Error en el middleware de verificación de rol:', error);
            return res.status(500).json({ error: error instanceof Error ? error.message : 'Error desconocido' }); // Return error in case of an exception
        }
    };
};