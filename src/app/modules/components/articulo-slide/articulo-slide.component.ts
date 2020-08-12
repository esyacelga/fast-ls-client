import {Component, Input, OnInit} from '@angular/core';
import {Segmento} from '../../classes/mensajeria/Segmento';
import {Articulo} from '../../classes/mensajeria/Articulo';
import {SolcitudDetalleModel} from '../../classes/mensajeria/SolcitudCabeceraModel';
import {SolicitudService} from '../../services/mensajeria/solicitud.service';
import {Util} from '../../system/generic/classes/util';
import {StorageAppService} from '../../system/generic/service/storage-app.service';
import {COLOR_TOAST_MORADO, COLOR_TOAST_WARNING} from '../../system/generic/classes/constant';
import {CommentComponentComponent} from '../comment-component/comment-component.component';
import {ModalController} from '@ionic/angular';
import {ModeloTipoUsuarioPersona} from '../../classes/persona/TipoUsuarioPersona';
import {LikeDislikeService} from '../../services/common/likeDislike.service';
import {LikeDislike} from '../../classes/common/LikeDislike';

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


    constructor(private svrSolicitud: SolicitudService, private utilSvr: Util,
                private svrStorage: StorageAppService, private modalCtrl: ModalController,
                private  svrLike: LikeDislikeService) {
    }

    public async abrirModal(item: Articulo) {
        const modal = await this.modalCtrl.create({
            component: CommentComponentComponent,
            componentProps: {
                objArticulo: item,
                objTipoUsuarioPersona: this.modeloPersonaTipoUsuario
            }
        });
        await modal.present();
        const {data} = await modal.onDidDismiss();
    }

    public async actualizarLike(item: Articulo, like: boolean) {
        let objLike: LikeDislike = new LikeDislike(this.modeloPersonaTipoUsuario.persona, item, like, true);
        objLike = (await this.svrLike.registar(objLike) as LikeDislike);
        console.log(objLike.articulo);
    }


    async seleccionarArticulo(item: Articulo) {
        this.objArticulo = item;
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
