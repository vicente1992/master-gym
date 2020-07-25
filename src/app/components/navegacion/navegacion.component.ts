import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss']
})
export class NavegacionComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth) { }
  usuario: firebase.User;
  ngOnInit(): void {
    this.afAuth.user.subscribe((usuario) => {

      this.usuario = usuario;
    })
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
