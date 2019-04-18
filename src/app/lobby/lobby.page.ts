import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss']
})
export class LobbyPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public qs: QuizService,
    private db: DbService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.qs.newQuizObs(id);
  }

  log(lob) {
    console.log(lob);
  }

  reorderQuestions(evt) {
    console.log(`Moving item from ${evt.detail.from} to ${evt.detail.to}`);
    if (this.qs.move(evt.detail.from, evt.detail.to)) {
      evt.detail.complete();
      return;
    } else {
      console.log(`failed to reorder Questions`);
    }
  }

  deleteQuiz(id: string) {
    this.db.delete(`lobbies/${id}`);
  }
}
