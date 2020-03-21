import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ManagmentPage} from './managment.page';
import {ComponentModule} from '../../../components/component.module';
import {PipesModule} from '../../../pipes/pipes.module';

const routes: Routes = [
    {
        path: '',
        component: ManagmentPage
    }
];

@NgModule({
    imports: [
        PipesModule,
        ComponentModule,
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ManagmentPage]
})
export class ManagmentPageModule {
}
