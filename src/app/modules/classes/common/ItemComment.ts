import {Persona} from '../persona/ObjetoTipoUsuarioPersona';
import {Articulo} from '../mensajeria/Articulo';

export class ItemComment {

    public persona: Persona;
    public articulo: Articulo;
    public comentario: string;
    public creacionFecha: Date;
    public estado: boolean;

    constructor(persona: Persona, articulo: Articulo, comentario: string, estado: boolean) {
        this.persona = persona;
        this.articulo = articulo;
        this.comentario = comentario;
        this.creacionFecha = new Date();
        this.estado = estado;
    }
}
