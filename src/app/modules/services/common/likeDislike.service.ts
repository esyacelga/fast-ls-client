import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ExecuteCallProcedureService} from '../../system/generic/service/execute-call-procedure.service';
import {RequestOptions} from '../../system/generic/classes/RequestOptions';
import {CRUD_LIKE_DISLIKE} from '../../constantes/ConstanteTransaccional';
import {COLOR_TOAST_SUCCESS} from '../../system/generic/classes/constant';
import {LikeDislike} from '../../classes/common/LikeDislike';


const URL = environment.url;

@Injectable({
    providedIn: 'root'
})
export class LikeDislikeService {

    constructor(private genericService: ExecuteCallProcedureService) {

    }

    async registar(comentario: LikeDislike) {
        const requestOptions = new RequestOptions();
        requestOptions.successMessaje = 'Like Agregado';
        requestOptions.toastColor = COLOR_TOAST_SUCCESS;
        requestOptions.presentarToast = false;
        const data = await this.genericService.servicioRestGenericoPost(comentario, CRUD_LIKE_DISLIKE, requestOptions) as LikeDislike;
        return data;
    }


}
