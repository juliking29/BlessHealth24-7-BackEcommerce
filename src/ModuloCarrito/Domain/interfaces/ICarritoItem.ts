export interface ICarritoItem {
    idItemCarrito: number;
    idProducto: number;
    nombreProducto: string;
    tallaProducto: string;
    marca?: string;
    precioProducto: string; 
    cantidad: number;
    imgProducto?: string;
  }