import {Component, OnInit} from '@angular/core';
import {Sector} from '../../../classes/persona/Sector';
import {SectorService} from '../../../services/persona/sector.service';

@Component({
    selector: 'app-sector',
    templateUrl: './sector.page.html',
    styleUrls: ['./sector.page.scss'],
})
export class SectorPage implements OnInit {

    objSector: Sector;
    lstSector: Array<Sector>;

    constructor(private svrSector: SectorService) {

    }


    crearNuevo() {
        this.objSector = new Sector();
    }

    async obtnerSectores() {
        // @ts-ignore
        this.lstSector = await this.svrSector.obtenerSectores();
    }

    ngOnInit() {
        this.obtnerSectores();
    }

    async eliminar(sector: Sector) {
        sector.estado = 0;
        await this.svrSector.registarSector(sector);
        await this.obtnerSectores();
    }

    async registrar(sector: Sector) {
        sector.estado = 1;
        sector.codigo = sector.codigo.toUpperCase();
        sector.descripcion = sector.descripcion.toUpperCase();
        await this.svrSector.registarSector(sector);
        await this.obtnerSectores();
        this.objSector = null;
    }
}
