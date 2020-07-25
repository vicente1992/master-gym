import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  datosCorrectos: boolean = true;
  textoError: string = '';
  constructor(
    private fb: FormBuilder,
   public afAuth: AngularFireAuth,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    })
  }
  ingresar() {
    if (this.formLogin.valid) {
      this.datosCorrectos = true;
      this.spinner.show();
      this.afAuth.auth.signInWithEmailAndPassword(this.formLogin.value.email, this.formLogin.value.password)
        .then((usuario) => {
          this.spinner.hide();
        }).catch((err) => {
          this.spinner.hide();
          this.datosCorrectos = false;
          this.textoError = err.message;
        })
    } else {
      this.datosCorrectos = false;
      this.textoError = 'Por favor asegurese que los datos esten correctos';
    }
  }
}
