import {Component, OnInit} from '@angular/core';
import {TipoUsuarioService} from '../../../services/persona/tipo-usuario.service';
import {TipoUsuario} from '../../../classes/persona/TipoUsuario';
import {NotificacionModel} from '../../../classes/notificacion/NotificacionModel';
import {NotificacionMasivaService} from '../../../services/notificacion/notificacion-masiva.service';

@Component({
    selector: 'app-notificacion-masiva',
    templateUrl: './notificacion-masiva.page.html',
    styleUrls: ['./notificacion-masiva.page.scss'],
})
export class NotificacionMasivaPage implements OnInit {
    lstTipoUsuario: TipoUsuario[] = [];
    lstNotificacionModel: NotificacionModel[] = [];
    objNotificacion: NotificacionModel;

    constructor(private svtTipoUsuario: TipoUsuarioService, private svrNotificacion: NotificacionMasivaService) {
    }

    async ngOnInit() {
        this.lstTipoUsuario = (await this.svtTipoUsuario.listarTodos()) as TipoUsuario[];
        this.lstNotificacionModel = (await this.svrNotificacion.obtenerTodos()) as NotificacionModel[];
        console.log(this.lstNotificacionModel);
    }

    async crearNuevo() {
        this.objNotificacion = new NotificacionModel();
    }

    async registrar(notificacion: NotificacionModel) {
        await this.svrNotificacion.registar(notificacion);
        this.lstNotificacionModel = (await this.svrNotificacion.obtenerTodos()) as NotificacionModel[];
        this.objNotificacion = undefined;
    }

    async eliminar(notificacion: NotificacionModel) {
        notificacion.estado = 0;
        await this.svrNotificacion.actualizar(notificacion);
        this.lstNotificacionModel = (await this.svrNotificacion.obtenerTodos()) as NotificacionModel[];

    }

    async notificar(notificacion: NotificacionModel) {
        notificacion.estado = 2;
        await this.svrNotificacion.actualizar(notificacion);
        this.objNotificacion = undefined;
    }

}
