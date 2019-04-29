import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  quiz$: Observable<any>;

  constructor(private db: DbService) {}

  public newQuizObs(id: string) {
    console.log(`attemping to init new observable quiz: ${id}`);
    const obs = this.db.doc$(`lobbies/${id}`);
    this.quiz$ = obs;
  }
}
