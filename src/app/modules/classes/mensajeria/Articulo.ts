import {ArticuloSegmento} from './articulo-segmento';

export class Articulo {
    public _id: string;
    public descripcion: string;
    public unidadAlmacenada: number;
    public unidadCosto: number;
    public articuloSegmento: string;
    public estado: number;
    public posicion: false;
    public portada: string;
    public coords: string;
    public esServicio: false;
    public permiteComentar: false;
    public imgs?: string[];
}


export class ObjetoArticulo {
    public _id: string;
    public descripcion: string;
    public unidadAlmacenada: number;
    public unidadCosto: number;
    public articuloSegmento: ArticuloSegmento = new ArticuloSegmento();
    public estado: number;
    public posicion: false;
    public portada: string;
    public imagenEditada: string;
    public esServicio: false;
    public permiteComentar: false;
    public coords: string;
    public imgs?: string[];
}
