import {Component, OnInit} from '@angular/core';
import {ArticuloSegmento} from '../../../classes/mensajeria/articulo-segmento';
import {Articulo, ObjetoArticulo} from '../../../classes/mensajeria/Articulo';
import {TipoArticulo} from '../../../classes/mensajeria/tipo-articulo';
import {TipoArticuloClientService} from '../../../services/mensajeria/tipo-articulo-client.service';
import {ArticuloService} from '../../../services/mensajeria/articulo.service';
import {SegmentoService} from '../../../services/mensajeria/segmento.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {Util} from '../../../system/generic/classes/util';
import {COLOR_TOAST_WARNING} from '../../../system/generic/classes/constant';

@Component({
    selector: 'app-articulo',
    templateUrl: './articulo.page.html',
    styleUrls: ['./articulo.page.scss'],
})
export class ArticuloPage implements OnInit {
    articulo: ObjetoArticulo;
    lstSegmento: Array<ArticuloSegmento>;
    lstTipoArticulo: Array<TipoArticulo>;
    lstArticulo: Array<ObjetoArticulo>;
    result: Array<ArticuloSegmento> = [];

    constructor(private srvTipoArticulo: TipoArticuloClientService, private svcSegmento: SegmentoService,
                private svcArticulo: ArticuloService,
                private geolocation: Geolocation,
                private util: Util,
                private camera: Camera
    ) {
    }

    async ngOnInit() {
        await this.obtenerArticuloTodos();
        await this.obtenerTipoArticulo();
        await this.obtenerSegementos();
    }


    async obtenerSegementos() {
        // @ts-ignore
        this.lstSegmento = await this.svcSegmento.obtenerSegmentos();
    }

    async obtenerTipoArticulo() {
        // @ts-ignore
        this.lstTipoArticulo = await this.srvTipoArticulo.obtenerTipoArticulos();
    }

    camara() {
        const options: CameraOptions = {
            quality: 60,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.CAMERA
        };
        console.log('Entro a camara procesar camara');
        this.procesarImagen(options);
    }

    libreria() {
        const options: CameraOptions = {
            quality: 60,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.procesarImagen(options);
    }

    procesarImagen(options: CameraOptions) {

        this.camera.getPicture(options).then((imageData) => {
            // @ts-ignore
            const img = window.Ionic.WebView.convertFileSrc(imageData);
            this.articulo.imagenEditada = img;
            this.svcArticulo.subirImagen(imageData, this.articulo.articuloSegmento._id);
        }, (err) => {
            // Handle error
        });
    }


    crearNuevo() {
        this.articulo = new ObjetoArticulo();
    }


    async registrarNuevo(objGuardar) {
        // @ts-ignore}
        objGuardar.estado = 1;
        if (objGuardar.articuloSegmento === undefined || objGuardar.articuloSegmento._id === undefined) {
            this.util.presentToast('Debe seleccionar un segmento y tipo articulo ', COLOR_TOAST_WARNING);
            return;
        }
        objGuardar.articuloSegmento = objGuardar.articuloSegmento._id;
        await this.svcArticulo.registarArticulo(objGuardar);
        await this.obtenerArticuloTodos();
        this.articulo = null;
    }


    async obtenerArticuloTodos() {
        // @ts-ignore
        this.lstArticulo = await this.svcArticulo.obtenerArticulos();
        const map = new Map();
        for (const item of this.lstArticulo) {
            if (!map.has(item.articuloSegmento._id)) {
                map.set(item.articuloSegmento._id, true);    // set any value to Map
                const articuloSegmento = new ArticuloSegmento();
                articuloSegmento._id = item.articuloSegmento._id;
                articuloSegmento.descripcion = item.articuloSegmento.descripcion;
                this.result.push(articuloSegmento);
            }
        }
        console.log(this.result);
    }


    async eliminar(articulo: Articulo) {
        articulo.estado = 0;
        await this.svcArticulo.registarArticulo(articulo);
        this.obtenerArticuloTodos();
        this.articulo = null;
    }
}
