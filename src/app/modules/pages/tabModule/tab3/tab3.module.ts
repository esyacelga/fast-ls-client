import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab3Page} from './tab3.page';
import {PipesModule} from '../../../pipes/pipes.module';
import {ComponentModule} from '../../../components/component.module';

@NgModule({
    imports: [
        IonicModule,
        ComponentModule,
        CommonModule,
        FormsModule,
        PipesModule,
        RouterModule.forChild([{path: '', component: Tab3Page}])
    ],
    declarations: [Tab3Page]
})
export class Tab3PageModule {
}
