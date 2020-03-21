import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../system/generic/service/execute-call-procedure.service';
import {TipoArticulo} from '../../classes/mensajeria/tipo-articulo';
import {RequestOptions} from '../../system/generic/classes/RequestOptions';
import {URL_CREAR_TIPO_ARTICULO, URL_OBTENER_TODOS_ARTICULO} from '../../system/generic/classes/UrlPostRestService';

@Injectable({
    providedIn: 'root'
})
export class TipoArticuloClientService {


    constructor(private genericService: ExecuteCallProcedureService) {
    }

    async registarTipoArticulo(tipoArticulo: TipoArticulo) {
        const requestOptions = new RequestOptions();
        tipoArticulo.nombre = tipoArticulo.nombre.toUpperCase();
        tipoArticulo.descripcion = tipoArticulo.descripcion.toUpperCase();
        tipoArticulo.codigo = tipoArticulo.codigo.toUpperCase();
        return await this.genericService.servicioRestGenericoPost(tipoArticulo, URL_CREAR_TIPO_ARTICULO, requestOptions) as TipoArticulo;
    }


    async obtenerTipoArticulos() {
        const requestOptions = new RequestOptions();
        requestOptions.mostrar = 0;
        return await this.genericService.servicioRestGenericoGet({}, URL_OBTENER_TODOS_ARTICULO, requestOptions);
    }

}
