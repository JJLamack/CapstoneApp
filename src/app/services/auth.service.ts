import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { DbService } from './db.service';
import { GLOBAL_PUBLISH_EXPANDO_KEY } from '@angular/core/src/render3/global_utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: DbService,
    private router: Router,
    private gplus: GooglePlus,
    private platform: Platform,
    private loadingController: LoadingController,
    private storage: Storage,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => (user ? db.doc$(`users/${user.uid}`) : of(null))),
    );

    this.handleRedirect();
  }

  uid() {
    return this.user$
      .pipe(
        take(1),
        map(u => u && u.uid),
      )
      .toPromise();
  }

  async anonymousLogin() {
    try {
      console.log('Inside Anon Login');
      const credential = await this.afAuth.auth.signInAnonymously();
      return await this.updateUserData(credential.user);
    } catch (err) {
      console.log(err);
    }
  }

  private updateUserData({ uid, email, displayName, photoURL, isAnonymous }) {
    const path = `users/${uid}`;

    const data = {
      uid,
      email,
      displayName,
      photoURL,
      isAnonymous,
    };

    return this.db.updateAt(path, data);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  // GOOGLE AUTH
  setRedirect(val: boolean) {
    this.storage.set('authRedirect', val);
  }

  async isRedirect() {
    return await this.storage.get('authRedirect');
  }

  async testLogin() {
    await this.gplus
      .login({})
      .then(res => console.log(res))
      .catch(err => console.error(err));

    return;
  }

  async googleLogin() {
    try {
      let user;

      if (this.platform.is('cordova')) {
        console.log('Native Login');
        user = await this.nativeGoogleLogin();
      } else {
        console.log('Web Login');
        await this.setRedirect(true);
        const provider = new auth.GoogleAuthProvider();
        user = await this.afAuth.auth.signInWithRedirect(provider);
      }

      return await this.updateUserData(user);
    } catch (err) {
      console.log(err);
    }
  }

  // Handle login with redirect for web Google auth
  private async handleRedirect() {
    if ((await this.isRedirect()) !== true) {
      return null;
    }
    const loading = await this.loadingController.create();
    await loading.present();

    const result = await this.afAuth.auth.getRedirectResult();

    if (result.user) {
      await this.updateUserData(result.user);
    }

    await loading.dismiss();

    await this.setRedirect(false);

    return result;
  }

  async nativeGoogleLogin(): Promise<any> {
    console.log('Inside nativeGoogleLogin Fcn');
    try {
      const gplusUser = await this.gplus.login({
        webClientId:
          '543713222320-32ovug5i7ketjsnh82bg9lflob2g8i1d.apps.googleusercontent.com',
        offline: true,
        scopes: '',
      });

      console.log('Hola');
      return await this.afAuth.auth.signInWithCredential(
        auth.GoogleAuthProvider.credential(gplusUser.idToken),
      );
    } catch (err) {
      console.log(err);
    }
  }
}
