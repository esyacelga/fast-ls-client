import {Component, OnInit} from '@angular/core';
import {UnidadDisponibilidaddadService} from '../../../services/ruta/unidad-disponibilidaddad.service';
import {ModeloDisponibilidad, RutaDto, RutaIntegranteDto} from '../../../classes/ruta/vehiculo/DsiponibilidadVehiculo';
import {ModeloTipoUsuarioPersona} from '../../../classes/persona/TipoUsuarioPersona';
import {StorageAppService} from '../../../system/generic/service/storage-app.service';
import {VehiculoRutaService} from '../../../services/ruta/vehiculo-ruta.service';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
    lstUnidadDisponible: ModeloDisponibilidad[];
    objDisponibilidad: ModeloDisponibilidad;

    constructor(private svrDisponibilidad: UnidadDisponibilidaddadService, private svrStorage: StorageAppService, private svrRuta: VehiculoRutaService) {
    }

    async ngOnInit() {
        this.lstUnidadDisponible = await this.svrDisponibilidad.obtenerDisponibilidad();
        console.log(this.lstUnidadDisponible);
    }

    ionViewWillEnter() {
        this.objDisponibilidad = null;
    }

    async solicitudServicio() {
        const lstIntegrantes: RutaIntegranteDto[] = [];
        const usuarioActual = (await this.svrStorage.loadStorageObject('usuario')) as ModeloTipoUsuarioPersona;
        const objRutaIntegrante = new RutaIntegranteDto(null, usuarioActual._id, 1);
        lstIntegrantes.push(objRutaIntegrante);
        const objRuta: RutaDto = new RutaDto(null, false, false, false, 1, lstIntegrantes);
        await this.svrRuta.registrarSolicitud(objRuta);
   //     this.lstIntegrantes = await this.svrRuta.obtenerIntegrantesPorDisponibilidad(this.modeloDisponibilidad._id);
    }


}
