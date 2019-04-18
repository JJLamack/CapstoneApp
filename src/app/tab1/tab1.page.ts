import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { switchMap } from 'rxjs/operators';

import { ModalController } from '@ionic/angular';
import { LobbyFormComponent } from './lobby-form/lobby-form.component';
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
    public modal: ModalController
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

  joinLobby() {
    console.log('attempting to join lobby');
  }

  categoryFilter() {
    console.log('attempting to filter based on category');
  }
}
