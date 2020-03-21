import {Component, OnInit} from '@angular/core';
import {EstadoRuta, Vehiculo} from '../../../classes/ruta/vehiculo/DsiponibilidadVehiculo';
import {EstadoRutaService} from '../../../services/ruta/estado-ruta.service';

@Component({
    selector: 'app-estado-ruta',
    templateUrl: './estado-ruta.page.html',
    styleUrls: ['./estado-ruta.page.scss'],
})
export class EstadoRutaPage implements OnInit {
    lstEstadoRuta: EstadoRuta[] = [];
    objjEstadoRua: EstadoRuta;

    constructor(private svrEstado: EstadoRutaService) {
    }


    crearNuevo() {
        this.objjEstadoRua = new EstadoRuta();
    }

    async ngOnInit() {
        this.lstEstadoRuta = (await this.svrEstado.obtenerTodos()) as EstadoRuta[];
    }

    async eliminar(estadoRuta: EstadoRuta) {
        estadoRuta.estado = 0;
        await this.svrEstado.registar(estadoRuta);
        this.lstEstadoRuta = (await this.svrEstado.obtenerTodos()) as EstadoRuta[];
    }

    async registrar(estadoRuta: EstadoRuta) {
        estadoRuta.estado = 1;
        await this.svrEstado.registar(estadoRuta);
        this.lstEstadoRuta = (await this.svrEstado.obtenerTodos()) as EstadoRuta[];
        this.objjEstadoRua = null;
    }

}
