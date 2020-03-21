import {ModeloPersona, ModeloTipoUsuarioPersona, TipoUsuarioPersona} from '../../persona/TipoUsuarioPersona';
import {Sector} from '../../persona/Sector';

export class Vehiculo {
    _id: string;
    modelo: string;
    placa: string;
    color: string;
    marca: string;
    tipo: string;
    estado: number;

}

export class EstadoRuta {
    _id: string;
    nombre: string;
    codigo: string;
    color: string;
    estado: number;

}

export class Disponibilidad {
    _id: string;
    nombreAlias: string;
    tipoUsuarioPersona: TipoUsuarioPersona = new TipoUsuarioPersona();
    vehiculo: Vehiculo = new Vehiculo();
    numeroTurno: number;
    enTurno: boolean;
    estadoDiponibilidad: EstadoRuta = new EstadoRuta();
}


export class ModeloDisponibilidad {
    _id: string;
    nombreAlias: string;
    tipoUsuarioPersona: ModeloTipoUsuarioPersona = new ModeloTipoUsuarioPersona();
    vehiculo: Vehiculo = new Vehiculo();
    numeroTurno: number;
    enTurno: boolean;
    estadoDiponibilidad: EstadoRuta = new EstadoRuta();
}


export class RutaDto {
    _id: string = '';
    sectorIncial: Sector = new Sector();
    sectorFinal: Sector = new Sector();
    disponibilidad: ModeloDisponibilidad = new ModeloDisponibilidad();
    finalizado: boolean = false;
    espacioTotal: boolean = false;
    espacioCompartido: boolean = false;
    estado: Number = 0;
    lstIntegrantes: RutaIntegranteDto[] = [];


    constructor(disponibilidad: ModeloDisponibilidad, finalizado: boolean, espacioTotal: boolean, espacioCompartido: boolean, estado: Number, lstIntegrantes: RutaIntegranteDto[]) {
        this.disponibilidad = disponibilidad;
        this.finalizado = finalizado;
        this.espacioTotal = espacioTotal;
        this.espacioCompartido = espacioCompartido;
        this.estado = estado;
        this.lstIntegrantes = lstIntegrantes;
    }
}

export class RutaIntegranteDto {
    rutaModeloPersistencia: string = '';
    tipoUsuarioPersona: string = '';
    estado: number = 0;

    constructor(rutaModeloPersistencia: string, tipoUsuarioPersona: string, estado: number) {
        this.rutaModeloPersistencia = rutaModeloPersistencia;
        this.tipoUsuarioPersona = tipoUsuarioPersona;
        this.estado = estado;
    }
}

/**
 * Clase generada para la obtencion de intgrantes de un vehiulo disponible
 */
export class IntegranteRuta {
    estado: number = null;
    _id: string = null;
    persona: ModeloPersona = new ModeloPersona();
    imagen: string;

}
