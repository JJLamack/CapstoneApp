import { Component, OnInit, Input } from '@angular/core';
import { DbService } from '../../services/db.service';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() questionId;
  question$;
  constructor(private db: DbService) {}

  ngOnInit() {
    this.question$ = this.db.doc$(`questions/${this.questionId}`);
  }
}
