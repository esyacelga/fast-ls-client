import {ArticuloSegmento} from './articulo-segmento';

export class Articulo {
    _id: string;
    descripcion: string;
    unidadAlmacenada: number;
    unidadCosto: number;
    articuloSegmento: string;
    estado: number;
    posicion: false;
    portada: string;
    coords: string;
    imgs?: string[];
}


export class ObjetoArticulo {
    _id: string;
    descripcion: string;
    unidadAlmacenada: number;
    unidadCosto: number;
    articuloSegmento: ArticuloSegmento = new ArticuloSegmento();
    estado: number;
    posicion: false;
    portada: string;
    imagenEditada: string;
    coords: string;
    imgs?: string[];
}
