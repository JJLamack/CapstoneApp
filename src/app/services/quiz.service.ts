import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quiz$: { data: any; questions: any };

  constructor(private db: DbService) {
    const data = null;
    const questions = [];
    this.quiz$ = {
      data,
      questions
    };
  }

  public newQuizObs(id: string) {
    console.log(`attemping to init new observable quiz: ${id}`);
    const obs = this.db.doc$(`lobbies/${id}`);
    this.quiz$.data = obs;
  }

  public addQuestionObs(identity: string) {
    console.log(`attempting to init new observable question: ${identity}`);
    const observable = this.db.doc$(`questions/${identity}`);
    this.quiz$.questions.push({ id: identity, obs: observable });
  }

  public move(from: number, to: number) {
    const length = this.quiz$.questions.length;
    if (from < 0 || from >= length || to < 0 || to >= length) {
      console.log(
        `index's are out of bounds for length: ${length}, from: ${from}, to: ${to}`
      );
      return false;
    }
    console.table(this.quiz$.questions);
    const temp = this.quiz$.questions[from];
    this.quiz$.questions.splice(from, 1);
    this.quiz$.questions.splice(to, 0, temp);
    console.table(this.quiz$.questions);
    return true;
  }
}
