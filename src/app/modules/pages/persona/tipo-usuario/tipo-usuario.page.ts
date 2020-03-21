import { Component, OnInit } from '@angular/core';
import {TipoUsuario} from '../../../classes/persona/TipoUsuario';
import {TipoUsuarioService} from '../../../services/persona/tipo-usuario.service';
import {Sector} from '../../../classes/persona/Sector';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.page.html',
  styleUrls: ['./tipo-usuario.page.scss'],
})
export class TipoUsuarioPage implements OnInit {

  objTipoUsuario: TipoUsuario;
  lstTipoUsuario: Array<TipoUsuario>;

  constructor(private svrTipoUsuario: TipoUsuarioService) {

  }

  crearNuevo() {
    this.objTipoUsuario = new Sector();
  }

  async listarTodos() {
    // @ts-ignore
    this.lstTipoUsuario = await this.svrTipoUsuario.listarTodos();
    console.log(this.lstTipoUsuario);
  }

  ngOnInit() {
    this.listarTodos();
  }

  async eliminar(tipoUsuario: TipoUsuario) {
    tipoUsuario.estado = 0;
    await this.svrTipoUsuario.registar(tipoUsuario);
    await this.listarTodos();
  }

  async registrar(tipoUsuario: TipoUsuario) {
    tipoUsuario.estado = 1;
    await this.svrTipoUsuario.registar(tipoUsuario);
    await this.listarTodos();
    this.objTipoUsuario = null;
  }

}
