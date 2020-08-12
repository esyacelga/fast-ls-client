import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CommentComponentComponent} from './comment-component.component';
import {PipesModule} from '../../pipes/pipes.module';


@NgModule({
    imports: [
        CommonModule,
        PipesModule,
        FormsModule,
        IonicModule,
    ],
    declarations: [CommentComponentComponent]
})
export class ItemCommentModule {
}
