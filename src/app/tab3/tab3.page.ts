import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  
  constructor(public auth: AuthService) {}

  ngOnInit() {

  }

  consoleLog(obj) {
    console.log({obj});
  }

}
