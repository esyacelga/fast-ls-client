import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TipoUsuarioPersonaService} from '../../../services/persona/tipo-usuario-persona.service';
import {ModeloTipoUsuarioPersona} from '../../../classes/persona/TipoUsuarioPersona';
import {NavController, Platform} from '@ionic/angular';
import {PushNotificationService} from '../../../system/generic/service/push-notification.service';
import {StorageAppService} from '../../../system/generic/service/storage-app.service';

@Component({
    selector: 'app-rol-usuario',
    templateUrl: './rol-usuario.page.html',
    styleUrls: ['./rol-usuario.page.scss'],
})
export class RolUsuarioPage implements OnInit {
    idPersona: string;
    lstTipoUsuarioPersona: ModeloTipoUsuarioPersona[] = [];

    constructor(private svrActiv: ActivatedRoute, private navCtrl: NavController,
                private platform: Platform,
                private svrStorage: StorageAppService,
                private svtNotificacion: PushNotificationService,
                private svrTipoUsuarioPesona: TipoUsuarioPersonaService) {

    }

    setearRol(modeloPersonaUsuario: ModeloTipoUsuarioPersona) {
        this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
        if (this.platform.is('cordova')) {
            this.svtNotificacion.configuracionInicial();
        }
        this.svrStorage.setStorageObject(modeloPersonaUsuario, 'usuario');
    }

    async ngOnInit() {
        this.idPersona = this.svrActiv.snapshot.paramMap.get('idPersona');
        this.lstTipoUsuarioPersona = await this.svrTipoUsuarioPesona.obtenerPorPersona(this.idPersona);
        console.log(this.lstTipoUsuarioPersona, 'Esta es la persona');


    }

}
