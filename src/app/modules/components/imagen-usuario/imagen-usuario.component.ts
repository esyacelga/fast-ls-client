import {Component, OnInit} from '@angular/core';
import {StorageAppService} from '../../system/generic/service/storage-app.service';
import {ModeloTipoUsuarioPersona} from '../../classes/persona/TipoUsuarioPersona';

@Component({
    selector: 'app-imagen-usuario',
    templateUrl: './imagen-usuario.component.html',
    styleUrls: ['./imagen-usuario.component.scss'],
})
export class ImagenUsuarioComponent implements OnInit {
    modeloPersonaTipoUsuario: ModeloTipoUsuarioPersona;
    photo = '';
    displayName = '';

    constructor(private svrStorage: StorageAppService) {
    }

    async ngOnInit() {
        this.modeloPersonaTipoUsuario = (await this.svrStorage.loadStorageObject('usuario')) as ModeloTipoUsuarioPersona;
        this.photo = this.modeloPersonaTipoUsuario.persona.picture;
        this.displayName = this.modeloPersonaTipoUsuario.persona.displayName;
    }

}
