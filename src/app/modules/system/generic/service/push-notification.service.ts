import {EventEmitter, Injectable} from '@angular/core';
import {StorageAppService} from './storage-app.service';
import {OneSignal, OSNotification, OSNotificationPayload} from '@ionic-native/onesignal/ngx';
import {ExecuteCallProcedureService} from './execute-call-procedure.service';
import {OBTENER_EVIO_NOTIFICACION} from '../../../constantes/ConstanteConsulta';
import {MensajeOneSignal} from '../classes/MensajeOneSignal';
import {RequestOptions} from '../classes/RequestOptions';
import {NavController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class PushNotificationService {
    playerId: string;
    mensajes: OSNotificationPayload[] = [];
    pushLitener = new EventEmitter<OSNotificationPayload>(

    );

    async getMensajes() {
        await this.cargarMensajes();
        return [...this.mensajes];
    }

    constructor(private genericService: ExecuteCallProcedureService,
                private nav: NavController,
                private oneSignal: OneSignal, private svrSorage: StorageAppService) {
        this.cargarMensajes();
    }

    async enviarNotificacion(mensaje: MensajeOneSignal, mensajeExito) {
        const options = new RequestOptions();
        options.successMessaje = mensajeExito;
        const data = await this.genericService.servicioRestGenericoGet(mensaje, OBTENER_EVIO_NOTIFICACION, options);
        return data;
    }


    reenvioPantalla(payload: OSNotificationPayload) {
        console.log('Payload pantalla: ', payload);
        if (payload.additionalData && payload.additionalData.key && payload.additionalData.key === 'ruta') {
            this.nav.navigateForward(payload.additionalData.valor);
        }

    }

    async notificacionRecibida(notifcacion: OSNotification) {
        await this.cargarMensajes();
        const payload = notifcacion.payload;
        console.log('Payload Generado', payload);
        const existePush = this.mensajes.find(mensaje =>
            mensaje.notificationID === payload.notificationID);
        if (existePush) {
            return;
        }
        this.mensajes.unshift(payload);
        this.pushLitener.emit(payload);
        await this.guardarMensajes(this.mensajes);
        this.reenvioPantalla(notifcacion.payload);
    }


    guardarMensajes(lstObj: any) {
        this.svrSorage.setStorageObject('mensajes', lstObj);
    }

    configuracionInicial() {
        this.oneSignal.startInit('7aefa706-f4b4-47cf-9c8f-7f1d9830fcda', '872578811835');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationReceived().subscribe((noti) => {
            // do something when notification is received
            console.log('Notificacion recivida: ', noti);
            this.notificacionRecibida(noti);
        });

        this.oneSignal.handleNotificationOpened().subscribe(async (noti) => {
            // do something when a notification is opened
            console.log('Notificacion abierta: ', noti);
            await this.notificacionRecibida(noti.notification);
        });

        console.log('Inicializando ID');
        this.oneSignal.getIds().then(info => {
            console.log(info);
            this.playerId = info.userId;

        });
        this.oneSignal.endInit();
    }

    async cargarMensajes() {
        // @ts-ignore
        this.mensajes = await this.svrSorage.loadStorageObject('mensajes') || [];
        return this.mensajes;
    }
}

