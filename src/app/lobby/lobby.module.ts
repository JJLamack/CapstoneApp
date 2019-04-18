import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LobbyPage } from './lobby.page';
import { QuestionItemComponent } from '../shared/question-item/question-item.component';

const routes: Routes = [
  {
    path: ':id',
    component: LobbyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LobbyPage, QuestionItemComponent]
})
export class LobbyPageModule {}
