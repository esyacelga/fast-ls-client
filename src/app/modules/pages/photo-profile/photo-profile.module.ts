import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {PhotoProfilePage} from './photo-profile.page';
import {ImageGeneratorComponent} from '../../components/image-generator/image-generator.component';
import {PipesModule} from '../../pipes/pipes.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PipesModule,
    ],
    declarations: [PhotoProfilePage, ImageGeneratorComponent]
})
export class PhotoProfilePageModule {
}
