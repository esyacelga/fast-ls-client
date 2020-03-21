import {Injectable} from '@angular/core';
import {ImageObject} from '../../system/generic/classes/ImageObject';
import {RequestOptions} from '../../system/generic/classes/RequestOptions';
import {URL_CRUD_ARTICULO_IMAGE_UPLOAD} from '../../constantes/ConstanteTransaccional';
import {ExecuteCallProcedureService} from '../../system/generic/service/execute-call-procedure.service';

@Injectable({
    providedIn: 'root'
})
export class ImageGeneratorService {

    constructor(private genericService: ExecuteCallProcedureService) {
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
