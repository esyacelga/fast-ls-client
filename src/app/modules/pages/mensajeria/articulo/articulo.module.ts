import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ArticuloPage } from './articulo.page';
import {PipesModule} from '../../../pipes/pipes.module';
import {ComponentModule} from '../../../components/component.module';

const routes: Routes = [
  {
    path: '',
    component: ArticuloPage
  }
];

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ArticuloPage]
})
export class ArticuloPageModule {}
