import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { moveIn } from '../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

  error: any;
  user: Observable<firebase.User>;
  items: AngularFireList<any[]>;
  msgVal: string = '';

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,private router: Router) {
    this.items = af.list('/messages');
   // VERIFIERRRRRRRRRR akel boucle if ?! 
  
    this.user = this.afAuth.authState;
    
  }

  loginFb() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
        (success) => {
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        this.error = err;
      })
  }
loginGoogle() {
 
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  .then(
      (success) => {
      this.router.navigate(['/members']);
    }).catch(
      (err) => {
      this.error = err;
    })
}
  ngOnInit() {
  }

}
