import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuizPage } from './quiz.page';
import { QuestionComponent } from './question/question.component';

const routes: Routes = [
  {
    path: ':id',
    component: QuizPage,
    children: [
      {
        path: 'question',
        children: [
          {
            path: ':id',
            component: QuestionComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuizPage, QuestionComponent]
})
export class QuizPageModule {}
