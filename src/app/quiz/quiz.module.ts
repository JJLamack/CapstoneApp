import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuizPage } from './quiz.page';
import { QuestionComponent } from './question/question.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { SharedModule } from '../shared/shared.module';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
const routes: Routes = [
  {
    path: 'question/:uid',
    component: QuestionComponent,
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent,
  },
  {
    path: '',
    component: QuizPage,
  },
  {
    path: ':id',
    component: QuizPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [
    QuizPage,
    QuestionComponent,
    LeaderboardComponent,
    QuestionDetailComponent,
    UserDetailComponent,
  ],
})
export class QuizPageModule {}
