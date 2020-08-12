import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvatarSelectorComponent} from './avatar-selector/avatar-selector.component';
import {IonicModule} from '@ionic/angular';
import {MapaComponent} from './mapa/mapa.component';
import {CardImageComponent} from './card-image/card-image.component';
import {ItemSeleccionadoComponent} from './item-seleccionado/item-seleccionado.component';
import {ArticuloSlideComponent} from './articulo-slide/articulo-slide.component';
import {PipesModule} from '../pipes/pipes.module';
import {PedidosComponent} from './pedidos/pedidos.component';
import {ProfileComponent} from './profile/profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PhotoProfilePageModule} from '../pages/photo-profile/photo-profile.module';
import {PhotoProfilePage} from '../pages/photo-profile/photo-profile.page';
import {SolicitudRutaComponent} from './solicitud-ruta/solicitud-ruta.component';
import {ImagenUsuarioComponent} from './imagen-usuario/imagen-usuario.component';
import {CommentComponentComponent} from './comment-component/comment-component.component';
import {ItemCommentModule} from './comment-component/item-comment.module';


@NgModule({
    declarations: [AvatarSelectorComponent, MapaComponent, ProfileComponent, SolicitudRutaComponent, ImagenUsuarioComponent,
        CardImageComponent, ItemSeleccionadoComponent, ArticuloSlideComponent, PedidosComponent],
    exports: [
        AvatarSelectorComponent, MapaComponent, ProfileComponent, SolicitudRutaComponent, ImagenUsuarioComponent,
        CardImageComponent, ItemSeleccionadoComponent, ArticuloSlideComponent, PedidosComponent
    ],
    imports: [
        ItemCommentModule,
        CommonModule,
        PipesModule,
        FormsModule,
        IonicModule,
        PhotoProfilePageModule,
        ReactiveFormsModule,
    ], entryComponents: [PhotoProfilePage, CommentComponentComponent]
})
export class ComponentModule {
}
