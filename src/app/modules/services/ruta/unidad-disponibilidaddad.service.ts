import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../system/generic/service/execute-call-procedure.service';
import {Util} from '../../system/generic/classes/util';
import {Disponibilidad, ModeloDisponibilidad, Vehiculo} from '../../classes/ruta/vehiculo/DsiponibilidadVehiculo';
import {RequestOptions} from '../../system/generic/classes/RequestOptions';
import {CRUD_DISPONIBILIDAD} from '../../constantes/ConstanteTransaccional';
import {OBTENER_TODOS_DISPONIBILIDAD, OBTENER_TODOS_OBTENER_DISPONIBILIDAD} from '../../constantes/ConstanteConsulta';

@Injectable({
    providedIn: 'root'
})
export class UnidadDisponibilidaddadService {

    constructor(private genericService: ExecuteCallProcedureService, private utils: Util) {

    }

    async registar(disponibilidad: Disponibilidad) {
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoPost(disponibilidad, CRUD_DISPONIBILIDAD, requestOptions) as Vehiculo;
    }


    async obtenerTodos() {
        const requestOptions = new RequestOptions();
        return (await this.genericService.servicioRestGenericoGet({}, OBTENER_TODOS_DISPONIBILIDAD, requestOptions)) as Disponibilidad[];
    }


    async obtenerDisponibilidad() {
        const requestOptions = new RequestOptions();
        return (await this.genericService.servicioRestGenericoGet({}, OBTENER_TODOS_OBTENER_DISPONIBILIDAD, requestOptions)) as ModeloDisponibilidad[];
    }

}
