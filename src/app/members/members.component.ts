import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class MembersComponent implements OnInit {

  name: any;
  state: string = '';

  constructor(public af: AngularFireAuth,private router: Router) {
 
    if(this.af.auth) {
      this.name = this.af.auth;
  } }

  logout() {
     this.af.auth.signOut();
     console.log('logged out');
     this.router.navigateByUrl('/login');
  }


  ngOnInit() {
  }

}
