import {Component, OnInit} from '@angular/core';
import {Articulo} from '../../../classes/mensajeria/Articulo';
import {TipoArticulo} from '../../../classes/mensajeria/tipo-articulo';
import {TipoArticuloClientService} from '../../../services/mensajeria/tipo-articulo-client.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    articulo: Articulo;
    tipoArticulo: TipoArticulo;
    lstTipoArticulo: any[];


    constructor(private svcTipoArticulo: TipoArticuloClientService) {
    }

    async ngOnInit() {
        this.lstTipoArticulo = (await this.svcTipoArticulo.obtenerTipoArticulos()) as [];
    }

    ionViewWillEnter() {
        this.tipoArticulo = null;
    }

    selecionar(item: TipoArticulo) {
        this.tipoArticulo = item;
    }


}
