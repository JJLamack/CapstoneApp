import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { QuestionItemComponent } from './question-item/question-item.component';
@NgModule({
  declarations: [QuestionItemComponent],
  imports: [CommonModule, IonicModule],
  exports: [QuestionItemComponent]
})
export class SharedModule {}
