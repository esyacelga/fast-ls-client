import {OnChanges, Pipe, PipeTransform, SimpleChanges} from '@angular/core';
import {SolcitudDetalleModel} from '../classes/mensajeria/SolcitudCabeceraModel';

@Pipe({
    name: 'sumatoriaArticulos'
})
export class SumatoriaArticulosPipe implements PipeTransform, OnChanges {

    transform(lstDetalle: SolcitudDetalleModel[], filter: any): number {
        let sumatoria = 0;
        for (const entry of lstDetalle) {
            sumatoria = (entry.cantidad + entry.unidadCosto) + sumatoria;
        }
        sumatoria.toFixed(2);
        return sumatoria;
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('hola');
    }

}
