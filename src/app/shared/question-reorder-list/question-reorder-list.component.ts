import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-reorder-list',
  templateUrl: './question-reorder-list.component.html',
  styleUrls: ['./question-reorder-list.component.scss'],
})
export class QuestionReorderListComponent implements OnInit {
  @Input() disableReorder = false;
  @Input() questionIds: Array<string>;

  @Output() reordered = new EventEmitter<Array<string>>();
  constructor() {}

  ngOnInit() {
    console.log(`initial list given`);
    console.table(this.questionIds);
  }

  reorderItems(evt) {
    const length = this.questionIds.length;
    const from = evt.detail.from;
    const to = evt.detail.to;
    if (from < 0 || from >= length || to < 0 || to >= length) {
      console.log(
        `index's are out of bounds for length: ${length}, from: ${from} to: ${to}`,
      );
      return;
    }
    const temp = this.questionIds[from];
    this.questionIds.splice(from, 1);
    this.questionIds.splice(to, 0, temp);
    this.reordered.emit(this.questionIds.slice(0));
    evt.detail.complete();
  }
}
