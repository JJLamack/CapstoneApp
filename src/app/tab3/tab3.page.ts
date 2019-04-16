import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { switchMap, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  user;

  constructor(public auth: AuthService, public db: DbService) {}

  ngOnInit() {
    this.user = this.auth.user$.pipe(
      switchMap(user => this.db.doc$(`users/${user.uid}`)),
      shareReplay(1)
    );
  }

  consoleLog(obj: any) {
    console.log({ obj });
  }

  trackById(idx, user) {
    return user.id;
  }
}
