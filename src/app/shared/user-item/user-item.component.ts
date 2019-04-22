import { Component, OnInit, Input } from '@angular/core';
import { DbService } from '../../services/db.service';
@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input() userId: string;
  user$;
  constructor(private db: DbService) {}

  ngOnInit() {
    this.user$ = this.db.doc$(`users/${this.userId}`);
  }
}
