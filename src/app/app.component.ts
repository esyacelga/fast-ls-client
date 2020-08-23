import {Component} from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {StorageAppService} from './modules/system/generic/service/storage-app.service';
import {PushNotificationService} from './modules/system/generic/service/push-notification.service';
import {ModeloTipoUsuarioPersona} from './modules/classes/persona/TipoUsuarioPersona';
import {Facebook} from '@ionic-native/facebook/ngx';
import {COLOR_TOAST_ERROR, COLOR_TOAST_PRIMARY} from './modules/system/generic/classes/constant';
import {Util} from './modules/system/generic/classes/util';

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
        private svrFB: Facebook,
        private navCtrl: NavController,
        private util: Util,
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
            this.svrFB.logout().then(data => {
                console.log(data);
                this.util.presentToast('Ha cerrardo sesion', COLOR_TOAST_PRIMARY);
            }, (error) => {
                console.log(error);
                this.util.presentToast(error, COLOR_TOAST_ERROR);
            });
        }
    }

}
