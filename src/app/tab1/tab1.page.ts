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

  joinLobby(id: string) {
    console.log('attempting to join lobby');
  }

  categoryFilter() {
    console.log('attempting to filter based on category');
  }

  async showAlert(lobby: any) {
    const uid = await this.auth.uid();
    const alert = await this.alertController.create({
      header: `Join ${lobby.title} Lobby`,
      message:
        'Do you wish join the lobby and take on your follow trivia enthusiats?',
      buttons: [
        'No',
        {
          text: 'Join',
          handler: () => {
            console.log(`Joining Lobby id: ${lobby.id}`);
            lobby.uids.push(uid);
            this.db.updateAt(`lobbies/${lobby.id}`, lobby);
            this.router.navigate([`/quiz/${lobby.id}`]);
          }
        }
      ]
    });
    await alert.present();
  }
}
