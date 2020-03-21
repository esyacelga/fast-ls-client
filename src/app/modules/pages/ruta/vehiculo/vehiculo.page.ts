import {Component, OnInit} from '@angular/core';
import {Vehiculo} from '../../../classes/ruta/vehiculo/DsiponibilidadVehiculo';
import {VehiculoService} from '../../../services/ruta/vehiculo.service';

@Component({
    selector: 'app-vehiculo',
    templateUrl: './vehiculo.page.html',
    styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {

    objVehiculo: Vehiculo;
    lstVehiculo: Vehiculo[];

    constructor(private svrVehiculo: VehiculoService) {

    }


    crearNuevo() {
        this.objVehiculo = new Vehiculo();
    }

    async obtnerVehiculos() {
        // @ts-ignore
        this.lstVehiculo = await this.svrVehiculo.obtenerTodos();
        console.log(this.lstVehiculo);
    }

    ngOnInit() {
        this.obtnerVehiculos();
    }

    async eliminar(vehiculo: Vehiculo) {
        vehiculo.estado = 0;
        await this.svrVehiculo.registar(vehiculo);
        await this.obtnerVehiculos();
    }

    async registrar(vehiculo: Vehiculo) {
        vehiculo.estado = 1;
        await this.svrVehiculo.registar(vehiculo);
        await this.obtnerVehiculos();
        this.objVehiculo = null;
    }

}
