import {Component, Input, OnInit} from '@angular/core';
import {Articulo} from '../../classes/mensajeria/Articulo';

@Component({
    selector: 'app-card-image',
    templateUrl: './card-image.component.html',
    styleUrls: ['./card-image.component.scss'],
})
export class CardImageComponent implements OnInit {

    @Input() objArticulo: Articulo;

    slideSoloOpts = {
        allowSlideNext: false,
        allowSlidePrev: false
    };

    constructor() {
    }

    ngOnInit() {
    }
}
