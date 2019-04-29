import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss'],
})
export class QuestionDetailComponent implements OnInit {
  @Input() questionId: string;
  question$: Observable<any>;
  disable = false;
  @Output() selectedEvent = new EventEmitter<any>();
  constructor(private db: DbService) {}

  ngOnInit() {
    this.question$ = this.db.doc$(`questions/${this.questionId}`);
  }

  ansSelected(question: any, ans: number) {
    this.disable = true;
    console.log(`Answer selected: ${this}`);
    const timeAns = Date.now();
    let correct;
    if (ans === question.answers[question.correct]) {
      correct = true;
    } else {
      correct = false;
    }
    this.selectedEvent.emit({ correct, timeAns });
  }
}
