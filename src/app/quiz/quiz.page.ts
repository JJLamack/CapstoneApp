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
  userId;
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
    this.userId = this.getId();
  }

  async getId() {
    return await this.auth.uid();
  }

  leaveLobby(lobby: any) {
    const userIndex = lobby.uids.indexOf(this.userId);
    if (userIndex !== -1) {
      lobby.uids.splice(userIndex, 1);
      this.db.updateAt(`lobbies/${lobby.id}`, lobby);
    }
    this.router.navigate([`/tabs/lobbies`]);
  }
}
