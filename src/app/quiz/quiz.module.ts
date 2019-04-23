import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuizPage } from './quiz.page';
import { QuestionComponent } from './question/question.component';
import { QuestionItemComponent } from '../shared/question-item/question-item.component';
import { UserItemComponent } from '../shared/user-item/user-item.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

const routes: Routes = [
  {
    path: ':id',
    component: QuizPage,
    children: [
      {
        path: 'question',
        children: [
          {
            path: ':uid',
            component: QuestionComponent
          }
        ]
      }
    ]
  },
  {
    path: '',
    component: QuizPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    QuizPage,
    QuestionComponent,
    QuestionItemComponent,
    UserItemComponent,
    LeaderboardComponent
  ]
})
export class QuizPageModule {}
