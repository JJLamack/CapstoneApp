import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DbService } from '../../services/db.service';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { switchMap, take, map } from 'rxjs/operators';
import { QuizService } from '../../services/quiz.service';
import { QuestionSelectWrapperComponent } from '../question-select-wrapper/question-select-wrapper.component';

@Component({
  selector: 'app-lobby-form',
  templateUrl: './lobby-form.component.html',
  styleUrls: ['./lobby-form.component.scss'],
})
export class LobbyFormComponent implements OnInit {
  constructor(
    private db: DbService,
    private auth: AuthService,
    private qs: QuizService,
    private fb: FormBuilder,
    public modalController: ModalController,
    public router: Router,
  ) {}

  get qidForms() {
    return this.lobbyForm.get('qids') as FormArray;
  }

  questions: Array<string> = new Array();
  lobbyForm: FormGroup;
  userForm: FormGroup;
  user: any;
  actionOptions: any = {
    header: 'Select Questions',
  };
  compareQuestions = (q1, q2) => {
    return q1 && q2 ? q1.id === q2.id : q1 === q2;
  }

  ngOnInit() {
    const data = {
      title: '',
      status: 'pending',
      timer: 15,
    };
    this.lobbyForm = this.fb.group({
      title: [
        data.title,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(250),
        ],
      ],
      status: [data.status, [Validators.required]],
      questionTimerLength: [
        data.timer,
        [Validators.required, Validators.min(0), Validators.max(500)],
      ],
      qids: [false, [Validators.requiredTrue]],
    });
    this.auth.user$
      .pipe(
        take(1),
        map(u => u),
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
          Validators.maxLength(100),
        ],
      ],
    });
  }

  addQid(questionID: string) {
    this.qidForms.push(this.fb.control(questionID, Validators.required));
  }

  setQuestions(evt) {
    this.questions = evt.slice(0);
    console.log(this.questions);
  }

  async openQuestionSelect() {
    console.log(`open Question Select`);
    const ques = this.questions.slice(0);
    try {
      const modal = await this.modalController.create({
        component: QuestionSelectWrapperComponent,
        componentProps: { ques },
        backdropDismiss: false,
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      console.table(data);
      if (data !== null) {
        this.lobbyForm.get('qids').setValue(true);
        this.questions = data.qids.slice(0);
      } else {
        this.lobbyForm.get('qids').setValue(false);
        this.questions = new Array<string>();
      }
      console.table(this.questions);
    } catch (err) {
      console.log(err);
    }
  }

  async createLobby() {
    const uid = this.user.uid;
    const id = '';
    console.table(this.questions);
    const data = {
      creator: uid,
      createdAt: Date.now(),
      currentQuestion: 0,
      uids: [uid],
      title: this.lobbyForm.get('title').value,
      questionTimerLength: this.lobbyForm.get('questionTimerLength').value,
      status: this.lobbyForm.get('status').value,
      qids: this.questions,
    };
    const userData = {
      ...this.user,
      userName: this.userForm.get('uName').value,
    };
    this.db.updateAt(`users/${this.user.uid}`, userData);
    const result = await this.db.updateAt(`lobbies/${id}`, data);
    console.log(result.id);
    this.router.navigate([`/quiz/${result.id}`]).catch(err => console.log(err));
    this.modalController.dismiss();
  }

  async closeModal() {
    this.modalController.dismiss();
  }
}
