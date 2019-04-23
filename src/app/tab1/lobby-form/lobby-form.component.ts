import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DbService } from '../../services/db.service';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { switchMap, take, map } from 'rxjs/operators';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-lobby-form',
  templateUrl: './lobby-form.component.html',
  styleUrls: ['./lobby-form.component.scss']
})
export class LobbyFormComponent implements OnInit {
  constructor(
    private db: DbService,
    private auth: AuthService,
    private qs: QuizService,
    private fb: FormBuilder,
    public modal: ModalController,
    public router: Router
  ) {}

  get qidForms() {
    return this.lobbyForm.get('qids') as FormArray;
  }

  questions;
  lobbyForm: FormGroup;
  userForm: FormGroup;
  user: any;
  actionOptions: any = {
    header: 'Select Questions'
  };
  compareQuestions = (q1, q2) => {
    return q1 && q2 ? q1.id === q2.id : q1 === q2;
  }

  ngOnInit() {
    this.questions = this.auth.user$.pipe(
      switchMap(user => this.db.collection$('questions', ref => ref.limit(25)))
    );
    const data = {
      title: '',
      status: 'pending',
      timer: 15
    };
    this.lobbyForm = this.fb.group({
      title: [
        data.title,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(250)
        ]
      ],
      status: [data.status, [Validators.required]],
      questionTimerLength: [
        data.timer,
        [Validators.required, Validators.min(0), Validators.max(500)]
      ],
      qids: this.fb.array([], Validators.required)
    });
    this.auth.user$
      .pipe(
        take(1),
        map(u => u)
      )
      .toPromise()
      .then(obj => {
        this.user = obj;
        console.log({ obj });
        this.userForm.get('uName').setValue(obj.userName);
      });
    this.userForm = this.fb.group({
      uName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100)
        ]
      ]
    });
  }

  addQid(questionID: string) {
    this.qidForms.push(this.fb.control(questionID, Validators.required));
  }

  setQuestions(evt) {
    const questionIds = evt.detail.value;
    for (const questionId of questionIds) {
      this.addQid(questionId);
    }
  }

  async createLobby() {
    const uid = this.user.uid;
    const id = '';
    const data = {
      creator: uid,
      createdAt: Date.now(),
      currentQuestion: 0,
      uids: [uid],
      ...this.lobbyForm.value
    };
    const userData = {
      ...this.user,
      userName: this.userForm.get('uName').value
    };
    this.db.updateAt(`users/${this.user.uid}`, userData);
    const result = await this.db.updateAt(`lobbies/${id}`, data);
    console.log(result.id);
    this.modal.dismiss();
    this.router.navigate([`/quiz`, result.id]);
  }

  async closeModal() {
    this.modal.dismiss();
  }
}
