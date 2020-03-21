export interface SolcitudCabeceraModel {
    _id: string;
    usuario: string;
    estado: number;
    lstSolcitudDetalle: [SolcitudDetalleModel];
}


export interface SolcitudDetalleModel {
    _id: string;
    articulo: string;
    estado: number;
}
