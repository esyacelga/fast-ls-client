import {Pipe, PipeTransform} from '@angular/core';
import {PedidoResumen} from '../classes/mensajeria/Pedido';

@Pipe({
    name: 'filtroPedido'
})
export class FiltroPedidoPipe implements PipeTransform {
    transform(items: PedidoResumen[], filter: any): PedidoResumen[] {
        const data: PedidoResumen[] = [];
        if (!items) {
            return items;
        }

        for (const obj of items) {
            if (obj.pedido.estado === filter) {
                data.push(obj);
            }
        }

        return data;
    }

}
