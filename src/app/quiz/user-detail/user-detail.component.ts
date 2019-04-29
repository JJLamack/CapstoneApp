import { Component, OnInit, Input } from '@angular/core';
import { DbService } from '../../services/db.service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  @Input() userId: string;
  @Input() points: number;
  user$;
  constructor(private db: DbService) {}

  ngOnInit() {
    this.user$ = this.db.doc$(`users/${this.userId}`);
  }
}
