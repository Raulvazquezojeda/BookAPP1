import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  registerUser(email: string, pass: string, admin: boolean) {
    return new Promise((resolve, reject) => {
      this.afsAuth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user, admin)
        }).catch(err => console.log(reject(err)))
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }

  // loginFacebookUser() {
  //   return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
  //     .then(credential => this.updateUserData(credential.user))
  // }

  loginGoogleUser() {
    return this.afsAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(credential => this.updateUserData(credential.user,this.isUserAdmin))
  }

  logoutUser() {
    return this.afsAuth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  private updateUserData(user, adminis) {
    if (adminis=="true") {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const data: UserInterface = {
        id: user.uid,
        email: user.email,
        roles: {
          admin:true
        }
      }
      return userRef.set(data, { merge: true })
    }else{
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const data: UserInterface = {
        id: user.uid,
        email: user.email,
        roles: {
          editor:true
        }
      }
      return userRef.set(data, { merge: true })
    }

  }


  isUserAdmin(userUid) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }


}
