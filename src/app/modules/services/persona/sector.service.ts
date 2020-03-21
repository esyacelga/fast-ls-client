import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../system/generic/service/execute-call-procedure.service';
import {Util} from '../../system/generic/classes/util';
import {RequestOptions} from '../../system/generic/classes/RequestOptions';
import {Sector} from '../../classes/persona/Sector';
import {CRUD_SECTOR} from '../../constantes/ConstanteTransaccional';
import {OBTENER_TODOS_SECTOR} from '../../constantes/ConstanteConsulta';


@Injectable({
    providedIn: 'root'
})
export class SectorService {

    constructor(private genericService: ExecuteCallProcedureService, private utils: Util) {

    }

    async registarSector(sector: Sector) {
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoPost(sector, CRUD_SECTOR, requestOptions) as Sector;
    }


    async obtenerSectores() {
        const requestOptions = new RequestOptions();
        return (await this.genericService.servicioRestGenericoGet({}, OBTENER_TODOS_SECTOR, requestOptions)) as Sector[];
    }

}
