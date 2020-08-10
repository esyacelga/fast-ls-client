import {Component} from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {StorageAppService} from './modules/system/generic/service/storage-app.service';
import {PushNotificationService} from './modules/system/generic/service/push-notification.service';
import {ModeloTipoUsuarioPersona} from './modules/classes/persona/TipoUsuarioPersona';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    usuario: any;
    modeloPersonaTipoUsuario: ModeloTipoUsuarioPersona;

    /*public simInfo: any;
    public cards: any;*/

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private navCtrl: NavController,
        private svrStorage: StorageAppService,
        private svtNotificacion: PushNotificationService
    ) {
        this.initializeApp();
    }

    /*
        async obtencionInformacionTelefono() {
            try {
                const simPermission = await this.sim.requestReadPermission();
                if (simPermission === 'OK') {
                    const simData = await this.sim.getSimInfo();
                    this.simInfo = simData;
                    this.cards = simData.cards;
                    console.log(simData);
                }
            } catch (error) {
                console.log(error);
            }
        }*/

    initializeApp() {
        this.platform.ready().then(async () => {
            this.iniciaPulginCordova();
            this.modeloPersonaTipoUsuario = (await this.svrStorage.loadStorageObject('usuario')) as ModeloTipoUsuarioPersona;
            if (this.modeloPersonaTipoUsuario && this.modeloPersonaTipoUsuario.usuario && this.modeloPersonaTipoUsuario.usuario.clave) {
                this.navCtrl.navigateRoot('main');
            } else {
                this.navCtrl.navigateRoot('login');
            }
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    iniciaPulginCordova() {
        if (this.platform.is('cordova')) {
            // this.obtencionInformacionTelefono();
            this.svtNotificacion.configuracionProcesoNotificacion();
        }
    }

}
