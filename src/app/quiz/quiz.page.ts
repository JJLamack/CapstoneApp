import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { DbService } from '../services/db.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss']
})
export class QuizPage implements OnInit {
  userId: string;
  quizId: string;
  countdown$: Observable<any>;
  initiateTimer: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public qs: QuizService,
    private db: DbService,
    private auth: AuthService
  ) {
    this.initiateTimer = true;
  }

  ngOnInit() {
    this.quizId = this.route.snapshot.paramMap.get('id');
    this.qs.newQuizObs(this.quizId);
    this.auth.uid().then(val => {
      this.userId = val;
    });
  }

  reorderQuestions(evt, lobby) {
    console.table(lobby);
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
    console.table(lobby);
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

  async startQuiz(lobby: any) {
    const status = 'inGame';
    const startTime = Date.now() + 15000;
    const data = {
      ...lobby,
      status,
      startTime
    };
    await this.db.updateAt(`lobbies/${lobby.id}`, data);
  }

  initTimer(status: string, startTime: number) {
    if (status === 'inGame') {
      if (this.initiateTimer) {
        this.countdown$ = this.setupCountdown(1000, startTime);
        this.initiateTimer = false;
      }
      return true;
    } else {
      return false;
    }
  }

  setupCountdown(intervalTime: number, startTime: number) {
    return new Observable((observer: Observer<number>) => {
      const timer = setInterval(() => {
        const now = Date.now();
        const seconds = Math.floor((startTime - now) / 1000);
        if (seconds < 0) {
          observer.complete();
        }
        observer.next(seconds);
      }, intervalTime);

      return () => {
        clearInterval(timer);
        this.router.navigate([`/quiz`, this.quizId, `question`]);
      };
    });
  }
}
