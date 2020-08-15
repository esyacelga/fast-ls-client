import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Articulo} from '../../classes/mensajeria/Articulo';
import {ModeloTipoUsuarioPersona} from '../../classes/persona/TipoUsuarioPersona';
import {ComentarioService} from '../../services/common/comentario.service';
import {ItemComment} from '../../classes/common/ItemComment';

@Component({
    selector: 'app-comment-component',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

    @Input() public objArticulo: Articulo;
    @Input() public objTipoUsuarioPersona: ModeloTipoUsuarioPersona;
    private objComent: ItemComment;
    public message: string;
    public lsComentarios: ItemComment[] = [];


    constructor(private modal: ModalController, private svrComment: ComentarioService) {
    }

    ngOnInit() {
        this.obtenerComentarios();
    }

    public async registrarComentario(comentario) {
        const objComentario: ItemComment = new ItemComment(this.objTipoUsuarioPersona.persona, this.objArticulo, comentario, true);
        this.objComent = await this.svrComment.registar(objComentario);
        await this.obtenerComentarios();
        comentario = null;
    }

    public cerrarMoal() {
        if (this.objComent && this.objComent.articulo) {
            this.modal.dismiss({objArt: this.objComent.articulo});
        } else {
            this.modal.dismiss({objArt: {}});
        }
    }


    public async obtenerComentarios() {
        this.lsComentarios = await this.svrComment.obtenerComentariosPorArticulo(this.objArticulo);
    }


}
