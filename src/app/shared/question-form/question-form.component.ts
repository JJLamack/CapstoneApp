import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DbService } from '../../services/db.service';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  constructor(
    private db: DbService,
    private auth: AuthService,
    private fb: FormBuilder,
    public modal: ModalController,
    public tc: ToastController,
  ) {}

  question: any;
  questionForm: FormGroup;

  ngOnInit() {
    // TODO: Take out default answers
    const data = {
      question: '',
      correct: null,
      answers: ['', '', '', ''],
      photoURL: '',
      ...this.question,
    };
    // TODO: Add regex for a Question Mark at end of question or auto put there?
    this.questionForm = this.fb.group({
      question: [
        data.question,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(250),
        ],
      ],
      correct: [data.correct, [Validators.required]],
      answers: this.fb.array([], [Validators.required]),
    });

    let i = 0;
    for (const ans of data.answers) {
      this.addAnswer(ans, i);
      i++;
    }
  }

  get answerForms() {
    return this.questionForm.get('answers') as FormArray;
  }

  private addAnswer(answer?: string, index?: number) {
    this.answerForms.push(
      this.fb.group({
        ans: [
          answer,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(100),
          ],
        ],
        idx: [index, []],
      }),
    );
  }

  setCorrect(val: { detail: { value: string } }) {
    if (typeof val.detail.value === 'number') {
      this.questionForm.get('correct').setValue(val.detail.value);
    }
  }

  async createQuestion() {
    const uid = await this.auth.uid();
    const id = this.question ? this.question.id : '';
    const data = {
      creator: uid,
      createdAt: Date.now(),
      ...this.question,
      correct: this.questionForm.get('correct').value,
      answers: [
        this.answerForms.at(0).get('ans').value,
        this.answerForms.at(1).get('ans').value,
        this.answerForms.at(2).get('ans').value,
        this.answerForms.at(3).get('ans').value,
      ],
      question: this.questionForm.get('question').value,
      photoURL: '',
    };

    await this.db.updateAt(`questions/${id}`, data);
    this.modal.dismiss();
    this.presentToast('Question is uploaded');
  }

  async closeModal() {
    this.modal.dismiss();
  }

  async presentToast(mes: string) {
    const toast = await this.tc.create({
      message: mes,
      duration: 2000,
      keyboardClose: true,
    });
    toast.present();
  }

  getPhoto() {
    console.log('Uploading a photo');
  }
}
