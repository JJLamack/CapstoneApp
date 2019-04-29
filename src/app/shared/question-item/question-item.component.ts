import { Component, OnInit, Input } from '@angular/core';
import { DbService } from '../../services/db.service';
@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss'],
})
export class QuestionItemComponent implements OnInit {
  @Input() questionId: any;
  question$: any;

  constructor(private db: DbService) {}

  ngOnInit() {
    this.question$ = this.db.doc$(`questions/${this.questionId}`);
  }
}
