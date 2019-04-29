import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { switchMap, shareReplay } from 'rxjs/operators';
import { AlertController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  user$;

  constructor(
    public auth: AuthService,
    public db: DbService,
    private alertcontroller: AlertController,
    private toastcontroller: ToastController
  ) {}

  ngOnInit() {
    this.user$ = this.auth.user$.pipe(
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

  async toastError(msg: string) {
    const toast = await this.toastcontroller.create({
      message: msg,
      duration: 1000,
      color: 'danger'
    });
    toast.present();
  }
  async presentUserNamePrompt(user: any) {
    const alert = await this.alertcontroller.create({
      header: 'Edit Username',
      message: 'Will be seen by other players!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Change',
          handler: data => {
            if (data.UserName.length < 1) {
              this.toastError('Username needs to be longer');
              return;
            }
            if (data.UserName.length > 100) {
              this.toastError('Username needs to be shorter');
              return;
            }
            if (user.userName === data.UserName) {
              return;
            }
            const userdata = {
              ...user,
              userName: data.UserName
            };
            this.db.updateAt(`users/${user.uid}`, userdata);
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
