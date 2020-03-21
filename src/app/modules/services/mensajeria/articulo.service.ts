import {EventEmitter, Injectable} from '@angular/core';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';
import {environment} from '../../../../environments/environment';
import {Articulo} from '../../classes/mensajeria/Articulo';
import {ExecuteCallProcedureService} from '../../system/generic/service/execute-call-procedure.service';
import {RequestOptions} from '../../system/generic/classes/RequestOptions';
import {CRUD_ARTICULO, URL_CRUD_ARTICULO_IMAGE_UPLOAD} from '../../constantes/ConstanteTransaccional';
import {OBTENER_TODOS_ARTICULOS} from '../../constantes/ConstanteConsulta';
import {ImageObject} from '../../system/generic/classes/ImageObject';


const URL = environment.url;

@Injectable({
    providedIn: 'root'
})
export class ArticuloService {
    nuevoArticulo = new EventEmitter<Articulo>();

    constructor(private genericService: ExecuteCallProcedureService, private fileTransfer: FileTransfer) {

    }

    async registarArticulo(segmento: Articulo) {
        const requestOptions = new RequestOptions();
        const data = await this.genericService.servicioRestGenericoPost(segmento, CRUD_ARTICULO, requestOptions) as Articulo;
        return data;
    }


    async obtenerArticulos() {
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoGet({}, OBTENER_TODOS_ARTICULOS, requestOptions);
    }


    /**
     * Servicio de envio de imagenes al servidor
     * @param img
     * @param path
     */
    async subirImagen(img: string, path: string) {
        const dataImage = new ImageObject(img, path);
        const requestOptions = new RequestOptions();
        requestOptions.successMessaje = 'Archivo cargado exitosamente';
        requestOptions.errorMessage = 'Hubo un error al cargar la imagen';
        requestOptions.loadingMessage = 'Cargando imagen';
        return await this.genericService.fileTransferService(dataImage, URL_CRUD_ARTICULO_IMAGE_UPLOAD, requestOptions);

    }


}
