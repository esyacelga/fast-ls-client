import {Component, Input, OnInit} from '@angular/core';
import {VehiculoRutaService} from '../../services/ruta/vehiculo-ruta.service';
import {IntegranteRuta, ModeloDisponibilidad, RutaDto, RutaIntegranteDto} from '../../classes/ruta/vehiculo/DsiponibilidadVehiculo';
import {ModeloTipoUsuarioPersona} from '../../classes/persona/TipoUsuarioPersona';
import {StorageAppService} from '../../system/generic/service/storage-app.service';

@Component({
    selector: 'app-solicitud-ruta',
    templateUrl: './solicitud-ruta.component.html',
    styleUrls: ['./solicitud-ruta.component.scss'],
})
export class SolicitudRutaComponent implements OnInit {
    @Input() modeloDisponibilidad: ModeloDisponibilidad = new ModeloDisponibilidad();


    lstIntegrantes: IntegranteRuta[] = [];

    constructor(private svrRuta: VehiculoRutaService, private svrStorage: StorageAppService) {

    }

    async ngOnInit() {
        this.lstIntegrantes = await this.svrRuta.obtenerIntegrantesPorDisponibilidad(this.modeloDisponibilidad._id);
        console.log(this.lstIntegrantes);
    }


    async solicitudServicio() {
        const lstIntegrantes: RutaIntegranteDto[] = [];
        const usuarioActual = (await this.svrStorage.loadStorageObject('usuario')) as ModeloTipoUsuarioPersona;
        const objRutaIntegrante = new RutaIntegranteDto(null, usuarioActual._id, 1);
        lstIntegrantes.push(objRutaIntegrante);
        const objRuta: RutaDto = new RutaDto(this.modeloDisponibilidad, false, false, false, 1, lstIntegrantes);
        await this.svrRuta.registar(objRuta);
        this.lstIntegrantes = await this.svrRuta.obtenerIntegrantesPorDisponibilidad(this.modeloDisponibilidad._id);
    }


}
