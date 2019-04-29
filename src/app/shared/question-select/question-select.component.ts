import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ModalController } from '@ionic/angular';
import { QuestionFormComponent } from '../question-form/question-form.component';

@Component({
  selector: 'app-question-select',
  templateUrl: './question-select.component.html',
  styleUrls: ['./question-select.component.scss'],
})
export class QuestionSelectComponent implements OnInit {
  @Input() selectable = false;
  @Input() editable = false;
  @Input() addable = false;
  @Input() preSelected: Array<string>;
  @Output() checkedItemsEvent = new EventEmitter<Array<string>>();
  items;
  @Input() checkedItems: Array<string> = new Array();
  constructor(private db: DbService, private modal: ModalController) {}

  ngOnInit() {
    this.items = this.db.collection$('questions', ref => ref.limit(25));
  }

  trackbyId(idx: any, item: { id: any }) {
    return item.id;
  }

  updateChecked(evt: any) {
    if (evt.detail.checked) {
      this.checkedItems.push(evt.detail.value);
    } else {
      const loc = this.checkedItems.indexOf(evt.detail.value);
      if (loc !== -1) {
        this.checkedItems.splice(loc, 1);
      }
    }
    this.checkedItemsEvent.emit(this.checkedItems.slice(0));
  }

  async presentEditForm(question?: any) {
    console.log(`Inside present Edit Form`);
    const modal = await this.modal.create({
      component: QuestionFormComponent,
      componentProps: { question },
      backdropDismiss: false,
    });
    return await modal.present();
  }

  deleteItem(item: any) {
    console.log(`Inside delete Item`);
    this.db.delete(`questions/${item.id}`);
  }
}
