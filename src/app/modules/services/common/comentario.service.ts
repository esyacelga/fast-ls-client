import {Injectable} from '@angular/core';
import {Articulo} from '../../classes/mensajeria/Articulo';
import {ExecuteCallProcedureService} from '../../system/generic/service/execute-call-procedure.service';
import {RequestOptions} from '../../system/generic/classes/RequestOptions';
import {CRUD_COMENTARIO, OBTENER_COMENTARIOS} from '../../constantes/ConstanteTransaccional';
import {ItemComment} from '../../classes/common/ItemComment';
import {COLOR_TOAST_SUCCESS} from '../../system/generic/classes/constant';


@Injectable({
    providedIn: 'root'
})
export class ComentarioService {


    constructor(private genericService: ExecuteCallProcedureService) {

    }

    async registar(comentario: ItemComment) {
        const requestOptions = new RequestOptions();
        requestOptions.successMessaje = 'Comentario Agregado';
        requestOptions.toastColor = COLOR_TOAST_SUCCESS;
        requestOptions.presentarToast = true;
        const data = await this.genericService.servicioRestGenericoPost(comentario, CRUD_COMENTARIO, requestOptions) as ItemComment;
        return data;
    }

    async obtenerComentariosPorArticulo(objArticulo: Articulo) {
        const requestOptions = new RequestOptions();
        return (await this.genericService.servicioRestGenericoGet(objArticulo, OBTENER_COMENTARIOS, requestOptions) as ItemComment[]);
    }

}
