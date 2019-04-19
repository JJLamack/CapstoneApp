import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { DbService } from '../services/db.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss']
})
export class QuizPage implements OnInit {
  userId: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public qs: QuizService,
    private db: DbService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.qs.newQuizObs(id);
    this.auth.uid().then(val => {
      this.userId = val;
    });
  }

  reorderQuestions(evt, lobby) {
    const length = lobby.qids.length;
    const from = evt.detail.from;
    const to = evt.detail.to;
    if (from < 0 || from >= length || to < 0 || to >= length) {
      console.log(
        `index's are out of bounds for length: ${length}, from: ${from}, to: ${to}`
      );
      return;
    }
    const temp = lobby.qids[from];
    lobby.qids.splice(from, 1);
    lobby.qids.splice(to, 0, temp);
    evt.detail.complete();
  }

  async leaveLobby(lobby: any) {
    if (lobby.creator === this.userId) {
      this.db.delete(`lobbies/${lobby.id}`);
    } else {
      const userIndex = lobby.uids.indexOf(this.userId);
      if (userIndex !== -1) {
        lobby.uids.splice(userIndex, 1);
        this.db.updateAt(`lobbies/${lobby.id}`, lobby);
      }
    }
    this.router.navigate([`/tabs/lobbies`]);
  }
}
