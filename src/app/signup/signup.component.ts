import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class SignupComponent implements OnInit {

  state: string = '';
  error: any;

  user: Observable<firebase.User>;
  items: AngularFireList<any[]>;
  msgVal: string = '';

  constructor(public af: AngularFireAuth,private router: Router) {

  }
  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
     
      this.af.auth.createUserAndRetrieveDataWithEmailAndPassword(
        formData.value.email ,formData.value.password ).then(
        (success) => {
        console.log(success);
        this.router.navigate(['/login'])
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
