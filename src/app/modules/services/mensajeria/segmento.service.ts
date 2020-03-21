import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../system/generic/service/execute-call-procedure.service';
import {RequestOptions} from '../../system/generic/classes/RequestOptions';
import {ArticuloSegmento} from '../../classes/mensajeria/articulo-segmento';
import {Util} from '../../system/generic/classes/util';
import {CRUD_SEGMENTO} from '../../constantes/ConstanteTransaccional';
import {Sector} from '../../classes/persona/Sector';
import {OBTENER_TODOS_POR_TIPO_ARTICULO, OBTENER_TODOS_SEGMENTOS} from '../../constantes/ConstanteConsulta';

@Injectable({
    providedIn: 'root'
})
export class SegmentoService {

    constructor(private genericService: ExecuteCallProcedureService, private utils: Util) {

    }

    async registarSegmento(segmento: ArticuloSegmento) {
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoPost(segmento, CRUD_SEGMENTO, requestOptions) as Sector;
    }


    async obtenerSegmentos() {
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoGet({}, OBTENER_TODOS_SEGMENTOS, requestOptions);
    }

    async obtenerSegmentoPorArticulo(tipoArticulo) {
        const filtro = {
            tipoArticulo
        };
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoGet(filtro, OBTENER_TODOS_POR_TIPO_ARTICULO, requestOptions);
    }

}
