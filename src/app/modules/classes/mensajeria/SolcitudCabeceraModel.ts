import {ModeloUsuario} from '../persona/TipoUsuarioPersona';

export class SolcitudCabeceraModel {
    _id: string;
    usuario: string;
    estado: number;
    lstSolcitudDetalle: SolcitudDetalleModel[];

    constructor(id: string, usuario: string, estado: number, lstSolcitudDetalle?: SolcitudDetalleModel[]) {
        this._id = id;
        this.usuario = usuario;
        this.estado = estado;
        this.lstSolcitudDetalle = lstSolcitudDetalle;
    }
}

export class SolicitudCabeceraDto {
    public _id: string;
    public usuario: ModeloUsuario;
    public estado: number;
    public fechaCreacion: Date;

    constructor(id: string, usuario: ModeloUsuario, estado: number, fechaCreacion: Date) {
        this._id = id;
        this.usuario = usuario;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
    }
}


export class SolcitudDetalleModel {
    _id: string;
    articulo: string;
    estado: number;
    nombreArticulo: string;
    cantidad: number;
    unidadAlmacenada: number;
    unidadCosto: number;


    constructor(idArticulo: string, estado: number, nombreArticulo: string, cantidad: number, unidadAlmacenada: number, unidadCosto: number) {
        this.articulo = idArticulo;
        this.estado = estado;
        this.nombreArticulo = nombreArticulo;
        this.cantidad = cantidad;
        this.unidadAlmacenada = unidadAlmacenada;
        this.unidadCosto = unidadCosto;
    }
}
