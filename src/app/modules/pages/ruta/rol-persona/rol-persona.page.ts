import {Component, OnInit} from '@angular/core';
import {ModeloPersona, ModeloTipoUsuario, ModeloTipoUsuarioPersona, TipoUsuarioPersona} from '../../../classes/persona/TipoUsuarioPersona';
import {PersonaService} from '../../../services/persona/persona.service';
import {TipoUsuarioPersonaService} from '../../../services/persona/tipo-usuario-persona.service';
import {TipoUsuarioService} from '../../../services/persona/tipo-usuario.service';
import {Util} from '../../../system/generic/classes/util';
import {COLOR_TOAST_WARNING} from '../../../system/generic/classes/constant';

@Component({
    selector: 'app-rol-persona',
    templateUrl: './rol-persona.page.html',
    styleUrls: ['./rol-persona.page.scss'],
})
export class RolPersonaPage implements OnInit {
    objPersona: ModeloPersona;
    lstPersona: ModeloPersona[];
    lstTipoUsuario: ModeloTipoUsuario[];
    objTipoUsuario: ModeloTipoUsuario;
    lstTipoUsuarioPersona: ModeloTipoUsuarioPersona[];

    constructor(private svrUtil: Util, private svrPersona: PersonaService, private svrPersonaUsuario: TipoUsuarioPersonaService, private svrTipoUsuario: TipoUsuarioService) {
    }

    async crearRol(objTipoUsuario: ModeloTipoUsuario) {
        const data = this.lstTipoUsuarioPersona.find(x => x.tipoUsuario._id === objTipoUsuario._id);
        if (data) {
            this.svrUtil.presentToast('El rol ya existe', COLOR_TOAST_WARNING);
            return;
        }
        const tipoUsuarioPersona = new TipoUsuarioPersona();
        tipoUsuarioPersona.usuario = this.lstTipoUsuarioPersona[0].usuario._id;
        tipoUsuarioPersona.persona = this.lstTipoUsuarioPersona[0].persona._id;
        tipoUsuarioPersona.tipoUsuario = objTipoUsuario._id;
        await this.svrPersonaUsuario.insertar(tipoUsuarioPersona);
        this.lstTipoUsuarioPersona = await this.svrPersonaUsuario.obtenerPorPersona(tipoUsuarioPersona.persona);
    }

    /**
     * Al seleccionar la persona de la pantalla obtiene los roles por el
     * id_persona
     * @param persona
     */
    async selecionPersona(persona: string) {
        this.lstTipoUsuarioPersona = await this.svrPersonaUsuario.obtenerPorPersona(persona);
    }

    /**
     * Al iniciar la pantalla obtiene las personas rgistradas
     */
    async ngOnInit() {
        this.lstPersona = await this.svrPersona.obtenerTodos();
        this.lstTipoUsuario = (await this.svrTipoUsuario.listarTodos()) as ModeloTipoUsuario[];
        console.log(this.lstTipoUsuario);
    }

}
