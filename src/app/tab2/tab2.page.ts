import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { ModalController } from '@ionic/angular';
import { QuestionFormComponent } from './question-form/question-form.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  questions;

  constructor(
    public auth: AuthService,
    public db: DbService,
    public modal: ModalController
  ) {}

  ngOnInit() {
    this.questions = this.auth.user$.pipe(
      switchMap(user => this.db.collection$('questions', ref => ref.limit(25)))
    );
  }

  trackbyId(idx: any, question: { id: any }) {
    return question.id;
  }

  async presentQuestionForm(question?: any) {
    console.log('presenting question form...');
    const modal = await this.modal.create({
      component: QuestionFormComponent,
      componentProps: { question },
      backdropDismiss: false
    });
    return await modal.present();
  }

  deleteQuestion(question: any) {
    this.db.delete(`questions/${question.id}`);
  }

  catFilter() {
    console.log('adding a category filter');
  }
}
