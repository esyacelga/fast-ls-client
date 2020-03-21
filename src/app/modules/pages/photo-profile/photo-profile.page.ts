import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ModeloTipoUsuarioPersona} from '../../classes/persona/TipoUsuarioPersona';
import {StorageAppService} from '../../system/generic/service/storage-app.service';
import {TipoUsuarioPersonaService} from '../../services/persona/tipo-usuario-persona.service';

@Component({
    selector: 'app-photo-profile',
    templateUrl: './photo-profile.page.html',
    styleUrls: ['./photo-profile.page.scss'],
})
export class PhotoProfilePage implements OnInit {
    pathFotografia: string;
    nombreImagen: string;

    constructor(private modal: ModalController, private svrStorage: StorageAppService, private svrTipoUsuarioPersona: TipoUsuarioPersonaService) {
    }

    async ngOnInit() {
        const tipoUsuarioPersona: ModeloTipoUsuarioPersona = (await this.svrStorage.loadStorageObject('usuario')) as ModeloTipoUsuarioPersona;
        this.pathFotografia = tipoUsuarioPersona._id;
        this.nombreImagen = tipoUsuarioPersona.imagen;
    }

    async guardarFotografia() {
        await this.svrTipoUsuarioPersona.actualizarFotografia(this.pathFotografia);
        this.modal.dismiss();
    }

    salirModal() {
        this.modal.dismiss();
    }
}
