import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Articulo} from '../../classes/mensajeria/Articulo';
import {ExecuteCallProcedureService} from '../../system/generic/service/execute-call-procedure.service';
import {RequestOptions} from '../../system/generic/classes/RequestOptions';
import {CRUD_COMENTARIO, OBTENER_COMENTARIOS} from '../../constantes/ConstanteTransaccional';
import {ItemComment} from '../../classes/common/ItemComment';


const URL = environment.url;

@Injectable({
    providedIn: 'root'
})
export class ComentarioService {


    constructor(private genericService: ExecuteCallProcedureService) {

    }

    async registar(comentario: ItemComment) {
        const requestOptions = new RequestOptions();
        const data = await this.genericService.servicioRestGenericoPost(comentario, CRUD_COMENTARIO, requestOptions) as Articulo;
        return data;
    }


    async obtenerComentariosPorArticulo(objArticulo: Articulo) {
        const requestOptions = new RequestOptions();
        return (await this.genericService.servicioRestGenericoGet(objArticulo, OBTENER_COMENTARIOS, requestOptions) as ItemComment[]);
    }


}
