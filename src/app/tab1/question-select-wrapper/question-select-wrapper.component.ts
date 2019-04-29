import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-question-select-wrapper',
  templateUrl: './question-select-wrapper.component.html',
  styleUrls: ['./question-select-wrapper.component.scss'],
})
export class QuestionSelectWrapperComponent implements OnInit {
  selectedQuestions: Array<string> = new Array();
  @Input() ques: Array<string> = new Array();
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.selectedQuestions = this.ques.slice(0);
  }

  onChecked(qid: string) {
    for (const id of this.selectedQuestions) {
    }
  }

  selectQuestions(evt) {
    this.selectedQuestions = evt.slice(0);
    console.table(this.selectedQuestions);
  }

  updateSelected() {
    this.modalController.dismiss({ qids: this.selectedQuestions.slice(0) });
  }

  cancel() {
    this.modalController.dismiss();
  }
}
