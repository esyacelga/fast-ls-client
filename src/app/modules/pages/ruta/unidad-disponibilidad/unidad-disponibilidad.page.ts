import {Component, OnInit} from '@angular/core';
import {TipoUsuarioPersonaService} from '../../../services/persona/tipo-usuario-persona.service';
import {ModeloTipoUsuarioPersona} from '../../../classes/persona/TipoUsuarioPersona';
import {Disponibilidad, EstadoRuta, Vehiculo} from '../../../classes/ruta/vehiculo/DsiponibilidadVehiculo';
import {TipoUsuarioService} from '../../../services/persona/tipo-usuario.service';
import {TipoUsuario} from '../../../classes/persona/TipoUsuario';
import {PARAMETRO_CHOFER} from '../../../constantes/ConstanteParametros';
import {VehiculoService} from '../../../services/ruta/vehiculo.service';
import {UnidadDisponibilidaddadService} from '../../../services/ruta/unidad-disponibilidaddad.service';
import {Util} from '../../../system/generic/classes/util';
import {COLOR_TOAST_WARNING} from '../../../system/generic/classes/constant';
import {EstadoRutaService} from '../../../services/ruta/estado-ruta.service';

@Component({
    selector: 'app-unidad-disponibilidad',
    templateUrl: './unidad-disponibilidad.page.html',
    styleUrls: ['./unidad-disponibilidad.page.scss'],
})
export class UnidadDisponibilidadPage implements OnInit {
    lstTipoUsuarioPersona: ModeloTipoUsuarioPersona[];
    lstUnidadDisponible: Disponibilidad[];
    objDisponibilidad: Disponibilidad;
    objTipoUsuario: TipoUsuario;
    lstvehiculo: Vehiculo[];
    lstEstadoRuta: EstadoRuta[] = [];

    constructor(private svrTipoUsuarioPersona: TipoUsuarioPersonaService, private svrDisp: UnidadDisponibilidaddadService,
                private svrUtil: Util, private svrEstado: EstadoRutaService,
                private svtTipoUsuario: TipoUsuarioService, private svrVehiculo: VehiculoService) {
    }

    async eliminar(obj: Disponibilidad) {
        this.lstUnidadDisponible = [];
        //obj.estadoDiponibilidad = false;
        await this.svrDisp.registar(obj);
        this.lstUnidadDisponible = await this.svrDisp.obtenerTodos();
        this.objDisponibilidad = null;
    }


    crearNuevo() {
        this.objDisponibilidad = new Disponibilidad();
    }

    async registrar(obj: Disponibilidad) {
        if (!obj.tipoUsuarioPersona) {
            this.svrUtil.presentToast('No se ha seleccionado la persona', COLOR_TOAST_WARNING);
            return;
        }
        if (!obj.vehiculo) {
            this.svrUtil.presentToast('No se ha seleccionado el vehiculo', COLOR_TOAST_WARNING);
            return;
        }
        if (!obj.nombreAlias) {
            this.svrUtil.presentToast('No se ha ingresado el alias', COLOR_TOAST_WARNING);
            return;
        }
        await this.svrDisp.registar(obj);
        this.lstUnidadDisponible = await this.svrDisp.obtenerTodos();
        this.objDisponibilidad = null;
    }

    async ngOnInit() {
        this.lstEstadoRuta = await this.svrEstado.obtenerTodos();
        this.lstvehiculo = await this.svrVehiculo.obtenerTodos();
        this.objTipoUsuario = await this.svtTipoUsuario.obtenerPorCodigo(PARAMETRO_CHOFER);
        if (!this.objTipoUsuario) {
            this.svrUtil.presentToast('El parámetro: ' + PARAMETRO_CHOFER + ' NO ESTA CONFIGURADO', COLOR_TOAST_WARNING);
            return;
        }
        this.lstTipoUsuarioPersona = await this.svrTipoUsuarioPersona.obtenerPorTipoUsuario(this.objTipoUsuario._id);
        this.lstUnidadDisponible = await this.svrDisp.obtenerTodos();
        console.log(this.lstTipoUsuarioPersona);
    }

}
