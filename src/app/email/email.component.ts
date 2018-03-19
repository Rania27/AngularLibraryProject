import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class EmailComponent implements OnInit {

  state: string = '';
  error: any;
  user: Observable<firebase.User>;
  items: AngularFireList<any[]>;
  msgVal: string = '';
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,private router: Router) {
    this.items = af.list('/messages');
    
    
    this.user = this.afAuth.authState;

  }

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.afAuth.auth.signInWithEmailAndPassword(
        formData.value.email,
        formData.value.password)
     .then(
        (success) => {
        console.log(success);
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  }



  ngOnInit() {
  }

}
