import {Component, OnInit} from '@angular/core';
import {StorageAppService} from '../../../system/generic/service/storage-app.service';
import {ModalController, NavController} from '@ionic/angular';
import {ProfileComponent} from '../../../components/profile/profile.component';

@Component({
    selector: 'app-tab3',
    templateUrl: 'settings.page.html',
    styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit {

    panelActivo = true;

    constructor(private svrStorage: StorageAppService,
                private modalCtrl: ModalController,
                private navCtrl: NavController) {
    }

    async activarPanel(opcion: boolean) {
        const modal = await this.modalCtrl.create({
            component: ProfileComponent,
            componentProps: {title: 's', tipoError: 's', mensaje: 'mensajeError'}
        });
        await modal.present();
        const {data} = await modal.onDidDismiss();

    }

    salirSesion() {
        this.svrStorage.eliminarTodo();
        this.navCtrl.navigateRoot('login');
    }

    ngOnInit() {
    }

}
