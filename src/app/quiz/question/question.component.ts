import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { DbService } from '../../services/db.service';
import { AuthService } from '../../services/auth.service';
import { QuizService } from '../../services/quiz.service';
import { Observable, Observer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  quiz$: Observable<any>;
  user$: Observable<any>;
  timer$: Observable<any>;
  quizId: string;
  questionId: string;
  userId: string;
  leaderboard = false;
  last = false;
  constructor(
    private route: ActivatedRoute,
    private db: DbService,
    private rtr: Router,
    private auth: AuthService,
    public qs: QuizService,
  ) {}

  ngOnInit() {
    this.quizId = this.route.snapshot.paramMap.get('id');
    this.questionId = this.route.snapshot.paramMap.get('uid');
    console.log(`Quiz Id: ${this.quizId} QuestionId: ${this.questionId}`);
    this.user$ = this.auth.user$.pipe(
      switchMap(user => this.db.doc$(`users/${user.uid}`)),
    );
    this.auth
      .uid()
      .then(uid => {
        this.userId = uid;
        console.log(`UserId: ${uid}`);
      })
      .catch(err => console.log(err));
    this.quiz$ = this.db.doc$(`lobbies/${this.quizId}`);
  }

  exitQuiz(lobby: any) {
    try {
      if (lobby.creator === this.userId) {
        this.db.delete(`lobbies/${this.quizId}`);
      } else {
        const index = lobby.qids.indexOf(this.quizId);
        if (index !== -1) {
          const qids = lobby.qids.splice(index, 1);
          const answers = lobby.answers.splice(index, 1);
          const data = {
            ...lobby,
            qids,
            answers,
          };
          this.db.updateAt(`lobbies/${this.quizId}`, data);
        }
      }
      this.rtr.navigate(['/tabs/lobbies']);
      console.log(`User: ${this.userId} is exiting game`);
    } catch (err) {
      console.log(err);
    }
  }

  ansSelected(evt: any, lobby: any, user: any) {
    const len = lobby.qids.length;
    if (lobby.currentQuestion + 1 === len) {
      this.last = true;
    }
    this.leaderboard = true;
    const idx = lobby.uids.indexOf(this.userId);
    const sec = Math.abs(Math.floor((lobby.startTime - evt.timeAns) / 1000));
    console.log(sec);
    console.log(lobby.questionTimerLength);
    const inc = Math.floor(
      ((lobby.questionTimerLength - sec) / lobby.questionTimerLength) * 1000,
    );

    console.log(inc);
    lobby.answers[idx] = true;
    lobby.points[idx] = lobby.points[idx] + inc;
    const data = {
      ...lobby,
    };
    this.db.updateAt(`lobbies/${this.quizId}`, data);
  }

  async setNextQuestion(evt: any, lobby: any) {
    const currentQuestion = lobby.currentQuestion + 1;
    const data = {
      ...lobby,
      currentQuestion,
      status: 'inGame',
      startTime: evt.newStartTime,
    };
    await this.db.updateAt(`lobbies/${this.quizId}`, data);
    this.leaderboard = false;
  }

  setupCountdown(intervalTime: number, lobby: any) {
    return new Observable((observer: Observer<number>) => {
      const newData = {
        ...lobby,
        status: 'question',
      };
      this.db.updateAt(`lobbies/${lobby.id}`, newData);
      const timer = setInterval(() => {
        const now = Date.now();
        const seconds = Math.floor((lobby.startTime - now) / 1000);
        if (seconds < 0) {
          observer.complete();
        }
        observer.next(seconds);
      }, intervalTime);

      return () => {
        clearInterval(timer);
        const status = 'inGame';
        const data = {
          ...lobby,
          status,
        };
        this.db.updateAt(`lobbies/${lobby.id}`, data);
      };
    });
  }
}
