import {ModeloUsuario} from '../persona/TipoUsuarioPersona';

export class Pedido {
    _id: string = '';
    estado: number = 0;
    solicitudDetalle: PedidoDetalle[] = [];
    usuario: string = '';
    tipoUsuarioPerona: TipoUsuarioPerona = new TipoUsuarioPerona();
    user: ModeloUsuario = new ModeloUsuario();
}


export class PedidoDetalle {
    _id: string = '';
    estado: number = 0;
    cantidad: number = 0;
    unidadCosto: number = 0;
    articulo: Artic = new Artic();
}


export class Artic {
    _id: string = '';
    descripcion: number = 0;
}

export class TipoUsuarioPerona {
    _id: string = '';
    persona: Persona = new Persona();
    usuario: ModeloUsuario = new ModeloUsuario();
}

export class Persona {
    _id: string = '';
    nombres: string = '';
    apellidos: string = '';
}

export class PedidoResumen {
    pedido: Pedido;
    usuario: string;
    total = 0;


    constructor(pedido: Pedido) {
        this.pedido = pedido;
        if (pedido !== null) {
            this.transform(pedido.solicitudDetalle);
        }
    }


    transform(lstDetalle: PedidoDetalle[]) {
        for (const entry of lstDetalle) {
            this.total = (entry.cantidad * entry.unidadCosto) + this.total;
        }
    }

}
