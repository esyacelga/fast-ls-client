import {Component, Input, OnInit} from '@angular/core';

declare var mapboxgl: any;

@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
    @Input() coords: string;

    constructor() {
    }

    ngOnInit() {
        const latLang = this.coords.split(',');
        const lat = Number(latLang[0]);
        const lng = Number(latLang[1]);

        mapboxgl.accessToken = 'pk.eyJ1IjoiZXlhY2VsZ2EiLCJhIjoiY2p6aDU5NXk2MHNzNzNucWZ0NnA5bm45dSJ9._zIZoWC2jGcyZIyISxqTOw';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: 15
        });

        const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
    }

}
