import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TipoArticuloPage } from './tipo-articulo.page';

const routes: Routes = [
  {
    path: '',
    component: TipoArticuloPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TipoArticuloPage]
})
export class TipoArticuloPageModule {}
