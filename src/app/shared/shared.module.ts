import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { QuestionItemComponent } from './question-item/question-item.component';
import { UserItemComponent } from './user-item/user-item.component';
import { QuestionSelectComponent } from './question-select/question-select.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuestionReorderListComponent } from './question-reorder-list/question-reorder-list.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    QuestionItemComponent,
    UserItemComponent,
    QuestionSelectComponent,
    QuestionFormComponent,
    QuestionReorderListComponent,
  ],
  imports: [CommonModule, IonicModule],
  entryComponents: [QuestionFormComponent],
  exports: [
    QuestionItemComponent,
    UserItemComponent,
    QuestionSelectComponent,
    QuestionFormComponent,
    QuestionReorderListComponent,
    CommonModule,
    IonicModule,
    FormsModule,
  ],
})
export class SharedModule {}
