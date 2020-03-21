import {Injectable} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {ExecuteCallProcedureService} from '../../system/generic/service/execute-call-procedure.service';
import {OBTENER_TIPO_USUARIO_PERSONA_LOGIN, OBTENER_TODOS_USUARIOS} from '../../constantes/ConstanteConsulta';
import {RequestOptions} from '../../system/generic/classes/RequestOptions';
import {CRUD_USUARIO} from '../../constantes/ConstanteTransaccional';
import {PushNotificationService} from '../../system/generic/service/push-notification.service';
import {ModeloUsuario} from '../../classes/persona/TipoUsuarioPersona';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    token: string = null;
    playerId: string = null;

    constructor(private genericService: ExecuteCallProcedureService,
                private svrPush: PushNotificationService,
                private storage: Storage, private navCtrl: NavController,
    ) {
        this.playerId = this.svrPush.playerId;
    }

    async obtenerTodos() {
        const requestOptions = new RequestOptions();
        const lstUsuarios = await this.genericService.servicioRestGenericoGet({}, OBTENER_TODOS_USUARIOS, requestOptions);
        return lstUsuarios;
    }

    async loginUsuario(correo: string, clave: string) {
        const requestOptions = new RequestOptions();
        const usuario = {
            correo, clave
        };
        const data = await this.genericService.servicioRestGenericoGet(usuario, OBTENER_TIPO_USUARIO_PERSONA_LOGIN, requestOptions);
        /*    // @ts-ignore
            if (data && data.le) {
                // @ts-ignore
                data.usuario.playerId = this.svrPush.playerId;
                // @ts-ignore

            }*/
        return data;
    }

    async actualizarPlayerId(usuario: ModeloUsuario) {
        usuario.playerId = this.svrPush.playerId;
        const requestOptions = new RequestOptions();
        console.error('Esto es el objeto Usuario', usuario);
        await this.genericService.servicioRestGenericoGet(usuario, CRUD_USUARIO, requestOptions);
    }


    async guardarToken(token: string) {
        this.token = token;
        await this.storage.set('token', token);
        await this.validaToken();

    }


    async cargarToken() {
        this.token = await this.storage.get('token') || null;
    }

    async validaToken(): Promise<boolean> {
        await this.cargarToken();
        if (!this.token) {
            this.navCtrl.navigateRoot('/login');
            return Promise.resolve(false);
        } else {
            this.navCtrl.navigateRoot('/main/tabs/tab1');
            return Promise.resolve(true);
        }
    }

}
