import {Component, Input, OnInit, Output} from '@angular/core';
import {PedidoResumen} from '../../classes/mensajeria/Pedido';
import {SolicitudService} from '../../services/mensajeria/solicitud.service';
import {TipoUsuarioPersonaService} from '../../services/persona/tipo-usuario-persona.service';

@Component({
    selector: 'app-pedidos',
    templateUrl: './pedidos.component.html',
    styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {
    @Input() lstPedidoRemen: PedidoResumen[] = [];
    @Output() contenedor: PedidoResumen = new PedidoResumen(null);


    constructor(private svrSolicitud: SolicitudService, private svrTps: TipoUsuarioPersonaService) {

    }

    ngOnInit() {

    }
}
