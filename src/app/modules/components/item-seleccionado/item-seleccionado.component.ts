import {Component, Input, OnInit} from '@angular/core';
import {TipoArticulo} from '../../classes/mensajeria/tipo-articulo';
import {Segmento} from '../../classes/mensajeria/Segmento';
import {Articulo} from '../../classes/mensajeria/Articulo';
import {SegmentoService} from '../../services/mensajeria/segmento.service';
import {ArticuloService} from '../../services/mensajeria/articulo.service';


@Component({
    selector: 'app-item-seleccionado',
    templateUrl: './item-seleccionado.component.html',
    styleUrls: ['./item-seleccionado.component.scss'],
})
export class ItemSeleccionadoComponent implements OnInit {

    @Input() tipoArticulo: TipoArticulo;
    lstSegmento: Array<Segmento>;
    lstArticulo: Array<Articulo>;

    constructor(private svrSegmentoAticulo: SegmentoService, private svrArticulo: ArticuloService) {
    }

    async ngOnInit() {
        // @ts-ignore
        this.lstSegmento = await this.svrSegmentoAticulo.obtenerSegmentoPorArticulo(this.tipoArticulo._id);
        // @ts-ignore
        this.lstArticulo = await this.svrArticulo.obtenerArticulos();
    }


}
