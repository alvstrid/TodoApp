import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLoggedIn = new BehaviorSubject(false);

  constructor(
    public angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.authStatusListener();
  }

  login(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigateByUrl('/todos');
      })
        .catch((error) => {
        window.alert(error.message);
      });
  }

  register(email: string, password: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(() => {
      this.router.navigateByUrl('/todos');
    })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  logout() {
    return this.angularFireAuth.signOut().then(() => {
      this.router.navigateByUrl('authentication/login');
    });
  }

  authStatusListener(){
    this.angularFireAuth.onAuthStateChanged(loggedIn => {
      if (loggedIn) {
        this.userLoggedIn.next(true);
      }
      else {
        this.userLoggedIn.next(false);
      }
    })
  }
}
