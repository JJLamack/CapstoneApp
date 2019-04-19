import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss']
})
export class QuestionItemComponent implements OnInit {
  @Input() questionId: string;
  question$: any;

  constructor() {}

  ngOnInit() {
    console.log(`User: ${this.questionId} initialized`);
  }
}
