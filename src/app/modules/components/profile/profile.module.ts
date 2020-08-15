import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {PipesModule} from '../../pipes/pipes.module';
import {ProfileComponent} from './profile.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule,
    ],
    declarations: [ProfileComponent]
})
export class ProfileModule {
}
