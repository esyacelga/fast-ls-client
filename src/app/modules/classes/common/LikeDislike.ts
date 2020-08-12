import {Persona} from '../persona/ObjetoTipoUsuarioPersona';
import {Articulo} from '../mensajeria/Articulo';

export class LikeDislike {

    public persona: Persona;
    public articulo: Articulo;
    public like: boolean;
    public creacionFecha: Date;
    public estado: boolean;

    constructor(persona: Persona, articulo: Articulo, like: boolean, estado: boolean) {
        this.persona = persona;
        this.articulo = articulo;
        this.like = like;
        this.creacionFecha = new Date();
        this.estado = estado;
    }
}
