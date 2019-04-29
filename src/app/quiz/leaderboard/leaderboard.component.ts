import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { DbService } from '../../services/db.service';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  @Output() nextQuestionEvent = new EventEmitter<any>();
  @Output() finishQuizEvent = new EventEmitter<any>();
  @Input() lastQuestion = false;
  @Input() quiz: any;
  @Input() userId: string;
  constructor(
    private db: DbService,
    private auth: AuthService,
    private tc: ToastController,
  ) {}

  ngOnInit() {
    console.log(`UserId in LeaderBoard comp: ${this.userId}`);
  }

  nextQuestion() {
    const newStartTime = Date.now();
    this.nextQuestionEvent.emit({ newStartTime });
  }

  async finish(quiz) {
    console.log('finishing quiz');
    this.finishQuizEvent.emit();
  }

  setupCountdown(intervalTime: number, lobby: any) {
    return new Observable((observer: Observer<number>) => {
      const data = {
        ...lobby,
        status: 'question',
      };
      this.db.updateAt(`lobbies/${lobby.id}`, data);
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
