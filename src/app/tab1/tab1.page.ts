import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  lobbies;

  constructor(public auth: AuthService, public db: DbService) {}

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

  makeLobby() {
    console.log('making a lobby');
  }
}
