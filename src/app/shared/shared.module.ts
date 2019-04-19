import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { QuestionItemComponent } from './question-item/question-item.component';
import { UserItemComponent } from './user-item/user-item.component';
@NgModule({
  declarations: [QuestionItemComponent, UserItemComponent],
  imports: [CommonModule, IonicModule],
  exports: [QuestionItemComponent, UserItemComponent]
})
export class SharedModule {}
