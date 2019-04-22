import { Component, OnInit, Input } from '@angular/core';
import { DbService } from '../../services/db.service';
@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss']
})
export class QuestionItemComponent implements OnInit {
  @Input() questionId: string;
  question$: any;

  constructor(private db: DbService) {}

  ngOnInit() {
    console.log(`User: ${this.questionId} initialized`);
    this.question$ = this.db.doc$(`questions/${this.questionId}`);
  }
}
