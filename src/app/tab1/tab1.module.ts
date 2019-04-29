import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Tab1Page } from './tab1.page';
import { LobbyFormComponent } from './lobby-form/lobby-form.component';
import { SharedModule } from '../shared/shared.module';
import { QuestionSelectWrapperComponent } from './question-select-wrapper/question-select-wrapper.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    SharedModule,
  ],
  declarations: [Tab1Page, LobbyFormComponent, QuestionSelectWrapperComponent],
  entryComponents: [LobbyFormComponent, QuestionSelectWrapperComponent],
})
export class Tab1PageModule {}
