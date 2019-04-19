import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { switchMap } from 'rxjs/operators';

import { ModalController, AlertController } from '@ionic/angular';
import { LobbyFormComponent } from './lobby-form/lobby-form.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  lobbies;

  constructor(
    public auth: AuthService,
    public db: DbService,
    public modal: ModalController,
    public alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.lobbies = this.auth.user$.pipe(
      switchMap(user => this.db.collection$('lobbies', ref => ref.limit(10)))
    );
  }

  trackbyId(idx, lobby) {
    return lobby.id;
  }

  gameStart() {
    console.log('Game has Started');
  }

  async makeLobby() {
    console.log('making a lobby');
    const modal = await this.modal.create({
      component: LobbyFormComponent,
      backdropDismiss: false
    });
    return await modal.present();
  }

  categoryFilter() {
    console.log('attempting to filter based on category');
  }

  async showAlert(lobby: any, user: any) {
    const alert = await this.alertController.create({
      translucent: true,
      backdropDismiss: false,
      header: `Join ${lobby.title} Lobby`,
      message:
        'Do you wish join the lobby and take on your fellow trivia enthusiats?',
      buttons: [
        'No',
        {
          text: 'Join',
          handler: data => {
            const idx = lobby.uids.indexOf(user.uid);
            if (idx === -1) {
              lobby.uids.push(user.uid);
              this.db.updateAt(`lobbies/${lobby.id}`, lobby);
            }
            if (!user.isAnonymous) {
              if (!user.gamesPlayed) {
                const wins = 0;
                const losses = 0;
                const lobbiesCreated = 0;
                const questionsWrong = 0;
                const questionsCorrect = 0;
                const gamesPlayed = 0;
                const userName = data.UserName;
                const userData = {
                  ...user,
                  wins,
                  losses,
                  lobbiesCreated,
                  questionsWrong,
                  questionsCorrect,
                  gamesPlayed,
                  userName
                };
                this.db.updateAt(`users/${user.id}`, userData);
              } else {
                if (user.userName !== data.UserName) {
                  const userName = data.UserName;
                  const userData = {
                    ...user,
                    userName
                  };
                  this.db.updateAt(`users/${user.id}`, userData);
                }
              }
            }
            this.router.navigate([`/quiz/${lobby.id}`]);
          }
        }
      ],
      inputs: [
        {
          name: 'UserName',
          type: 'text',
          value: user.userName,
          placeholder: 'Enter a UserName...'
        }
      ]
    });
    await alert.present();
  }
}
