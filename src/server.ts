import CarritoRouterFactory from './ModuloCarrito/Infrastructura/Factory/CarritoRouterFactory';

import ServerFactory from './Express/infrastructure/factory/ServerFactory';
import FavoritoRouterFactory from './ModuloFavorito/Infrastructura/Factory/FavoritoRouterFactory';
import UsuarioRouterFactory from './ModuloUsuario/Infrastructura/Factory/UsuarioRouterFactory';
 // Corregido el nombre
import ImagenFactory from './images/infarstructura/factory/ImagenRouterFactory';
import AuthRouterFactory from './Modulo Autenticacion/Infrastructura/Factory/AuthRouterFactory';
import ProductoRouterFactory from './ModuloProductos/Infrastructura/Factory/CarritoRouterFactory';
import PagoRouterFactory from './Modulo Pago/Infrastructura/Factory/PagoRouterFactory';

// Create instances of the routers using their respective factories
const carritoRouter = CarritoRouterFactory.create();
const productoRouter = ProductoRouterFactory.create();
const favoritoRouter = FavoritoRouterFactory.create();
const usuarioRouter = UsuarioRouterFactory.create();
const authRouter = AuthRouterFactory.create(); 
const pagoRouter = PagoRouterFactory.create(); 
const imagenRouter = ImagenFactory.create(); // Create the image router

// Aggregate all routers into an array
const routers = [
  carritoRouter, 
  productoRouter, 
  favoritoRouter, 
  usuarioRouter, 
  authRouter,
  pagoRouter,
  imagenRouter
];

// Create the server with the aggregated routers
const server = ServerFactory.create(routers);

// Start the server
server.start();