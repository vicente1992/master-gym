import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";


//Components
import { LoginComponent } from './components/login/login.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { AgregarClienteComponent } from './components/agregar-cliente/agregar-cliente.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { MensajeService } from './services/mensaje.service';
import { PreciosComponent } from './components/precios/precios.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { SeleccionarClienteComponent } from './components/seleccionar-cliente/seleccionar-cliente.component';
import { ListadoIncripcionesComponent } from './components/listado-incripciones/listado-incripciones.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavegacionComponent,
    ListadoClientesComponent,
    AgregarClienteComponent,
    PreciosComponent,
    InscripcionComponent,
    SeleccionarClienteComponent,
    ListadoIncripcionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    FormsModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AngularFireAuth, AngularFirestore, MensajeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
