import { Component, OnInit } from '@angular/core';
import {ArticuloSegmento} from '../../../classes/mensajeria/articulo-segmento';
import {TipoArticulo} from '../../../classes/mensajeria/tipo-articulo';
import {TipoArticuloClientService} from '../../../services/mensajeria/tipo-articulo-client.service';
import {SegmentoService} from '../../../services/mensajeria/segmento.service';

@Component({
  selector: 'app-segmento',
  templateUrl: './segmento.page.html',
  styleUrls: ['./segmento.page.scss'],
})
export class SegmentoPage implements OnInit {

  segmentoArticulo: ArticuloSegmento;
  lstSegmento: Array<ArticuloSegmento>;
  lstTipoArticulos: Array<TipoArticulo>;

  constructor(private svcTipoArticulo: TipoArticuloClientService, private svcArticuloSegmento: SegmentoService) {
  }

  async ngOnInit() {
    await this.obtenerTipoArticuloTodos();
    await this.obtenerSegmentos();
  }

  crearNuevo() {
    this.segmentoArticulo = new ArticuloSegmento();
  }

  async registrarNuevo(objGuardar: ArticuloSegmento) {
    // @ts-ignore}
    objGuardar.estado = 1;
    await this.svcArticuloSegmento.registarSegmento(objGuardar);
    await this.obtenerSegmentos();
    this.segmentoArticulo = null;
  }

  async obtenerTipoArticuloTodos() {
    // @ts-ignore
    this.lstTipoArticulos = await this.svcTipoArticulo.obtenerTipoArticulos();
  }


  async obtenerSegmentos() {
    // @ts-ignore
    this.lstSegmento = await this.svcArticuloSegmento.obtenerSegmentos();
  }

  async eliminar(articuloSegmento: ArticuloSegmento) {
    articuloSegmento.estado = 0;
    await this.svcArticuloSegmento.registarSegmento(articuloSegmento);
    this.obtenerSegmentos();
    this.segmentoArticulo = null;
  }

}
