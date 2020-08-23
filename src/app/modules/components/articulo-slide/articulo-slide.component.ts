import {Component, Input, OnInit} from '@angular/core';
import {Segmento} from '../../classes/mensajeria/Segmento';
import {Articulo} from '../../classes/mensajeria/Articulo';
import {SolcitudDetalleModel} from '../../classes/mensajeria/SolcitudCabeceraModel';
import {SolicitudService} from '../../services/mensajeria/solicitud.service';
import {Util} from '../../system/generic/classes/util';
import {StorageAppService} from '../../system/generic/service/storage-app.service';
import {COLOR_TOAST_MORADO, COLOR_TOAST_PRIMARY, COLOR_TOAST_WARNING} from '../../system/generic/classes/constant';
import {CommentComponent} from '../comment-component/comment.component';
import {ModalController} from '@ionic/angular';
import {ModeloTipoUsuarioPersona} from '../../classes/persona/TipoUsuarioPersona';
import {LikeDislikeService} from '../../services/common/likeDislike.service';
import {LikeDislike} from '../../classes/common/LikeDislike';
import {Observable} from 'rxjs';
import {ArticuloService} from '../../services/mensajeria/articulo.service';
import {ProfileComponent} from '../profile/profile.component';
import {Pedido} from '../../classes/mensajeria/Pedido';

@Component({
    selector: 'app-articulo-slide',
    templateUrl: './articulo-slide.component.html',
    styleUrls: ['./articulo-slide.component.scss'],
})
export class ArticuloSlideComponent implements OnInit {
    @Input() segmento: Segmento;
    @Input() lstArticulo: Array<Articulo>;

    public lstDetalle: SolcitudDetalleModel[] = [];
    public comentarioActivado = false;
    public modeloPersonaTipoUsuario: ModeloTipoUsuarioPersona;
    private objArticulo: Articulo;
    private conteoLike: Observable<number>;
    private conteoDisLike: Observable<number>;
    private conteoComentarios: Observable<number>;


    constructor(private svrSolicitud: SolicitudService,
                private utilSvr: Util,
                private svrArticulo: ArticuloService,
                private svrStorage: StorageAppService,
                private modalCtrl: ModalController,
                private  svrLike: LikeDislikeService) {
    }

    public async abrirModal(item: Articulo) {
        const modal = await this.modalCtrl.create({
            component: CommentComponent,
            componentProps: {
                objArticulo: item,
                objTipoUsuarioPersona: this.modeloPersonaTipoUsuario
            }
        });
        await modal.present();
        const {data} = await modal.onDidDismiss();
        this.lstArticulo = (await this.svrArticulo.obtenerArticulos() as Array<Articulo>);
        /*   if (data && data.objArt && data.objArt.conteoComentarios) {
               this.conteoComentarios = new Observable<number>((observer: Subscriber<number>) => {
                   observer.next(data.objArt.conteoComentarios);
               });
           }*/
        /*     if (data && data.objArt && data.objArt.conteoComentarios) {
                 for (let i = 0; this.lstArticulo.length > 0; i++) {
                     if (this.lstArticulo[i]._id === data.objArt._id) {
                         this.lstArticulo[i] = data.objArt;
                     }
                 }
             }*/
    }

    public async actualizarLike(item: Articulo, like: boolean) {
        let objLike: LikeDislike = new LikeDislike(this.modeloPersonaTipoUsuario.persona, item, like, true);
        objLike = (await this.svrLike.registar(objLike) as LikeDislike);
        this.lstArticulo = (await this.svrArticulo.obtenerArticulos() as Array<Articulo>);
        /*   this.conteoLike = new Observable<number>((observer: Subscriber<number>) => {
               observer.next(objLike.articulo.conteoLike);
           });
           this.conteoDisLike = new Observable<number>((observer: Subscriber<number>) => {
               observer.next(objLike.articulo.conteoDisLike);
           });*/
        return objLike.articulo;
    }

    async activarPanel() {
        const modal = await this.modalCtrl.create({
            component: ProfileComponent,
            componentProps: {title: 's', tipoError: 's', mensaje: 'mensajeError'}
        });
        await modal.present();
        const {data} = await modal.onDidDismiss();
    }


    async seleccionarArticulo(item: Articulo) {
        this.objArticulo = item;
        const lstPedido: Pedido[] = (await this.svrSolicitud.obtenerPedidoPorUsuario(this.modeloPersonaTipoUsuario.usuario._id) as Pedido[]);
        this.modeloPersonaTipoUsuario = (await this.svrStorage.loadStorageObject('usuario')) as ModeloTipoUsuarioPersona;
        if (lstPedido.length === 0 && !(this.modeloPersonaTipoUsuario.persona.fechaNacimiento)) {
            this.utilSvr.presentToast('Para generar su primer pedido y mejorar nuestro servicio debe actualizar la informacion solicitada', COLOR_TOAST_PRIMARY);
            this.activarPanel();
            return;
        }
        await this.svrSolicitud.getDetalleSolicitud();
        // @ts-ignore
        this.lstDetalle = await this.svrSolicitud.lstDetalle;
        const data = this.utilSvr.listarObjetoPorCampo(this.lstDetalle, 'articulo', item._id);
        if (data && data.length > 0) {
            this.utilSvr.presentToast('Este artículo ya sido seleccionado', COLOR_TOAST_WARNING);
            return;
        }

        const art = new SolcitudDetalleModel(item._id, item.estado, item.descripcion, 1, item.unidadAlmacenada, item.unidadCosto);

        art.nombreArticulo = item.descripcion;
        this.svrSolicitud.setDetalleSolcitud(art);
        this.utilSvr.presentToast('Este artículo se ha agregado a su orden de compra', COLOR_TOAST_MORADO);
    }

    async ngOnInit() {
        this.modeloPersonaTipoUsuario = (await this.svrStorage.loadStorageObject('usuario')) as ModeloTipoUsuarioPersona;
    }

}
