import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../../models/inscripcion';
import { Cliente } from 'src/app/models/cliente';
import { AngularFirestore } from 'angularfire2/firestore';
import { Precio } from 'src/app/models/precio';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion = new Inscripcion();
  clienteSelecionado: Cliente = new Cliente();
  precioSeleccionado: Precio = new Precio();
  precios: Precio[] = new Array<Precio>();
  idPrecio: string = 'null';
  constructor(private db: AngularFirestore, private msg: MensajeService) { }

  ngOnInit(): void {
    this.getPrecios();
  }
  asignarCliente(cliente: Cliente) {
    this.inscripcion.cliente = cliente.ref;
    this.clienteSelecionado = cliente;

  }
  eliminoCliente() {
    this.clienteSelecionado = new Cliente();
    this.inscripcion.cliente = undefined;
  }
  getPrecios() {
    this.db.collection<Precio>('precios').get().subscribe((response) => {
      response.docs.forEach((item) => {
        let precio = item.data() as Precio;
        precio.id = item.id;
        precio.ref = item.ref;
        this.precios.push(precio);
      });
    });
  }

  guardar() {
    if (this.inscripcion.validar().esValido) {
      let agregarInscripcion = {
        fecha: this.inscripcion.fecha,
        fechaFinal: this.inscripcion.fechaFinal,
        cliente: this.inscripcion.cliente,
        precios: this.inscripcion.precios,
        subTotal: this.inscripcion.subTotal,
        isv: this.inscripcion.isv,
        total: this.inscripcion.total
      }
      this.db.collection('inscripciones').add(agregarInscripcion).then((response) => {

        this.inscripcion = new Inscripcion();
        this.clienteSelecionado = new Cliente();
        this.precioSeleccionado = new Precio();
        this.idPrecio = 'null';
        this.msg.mensajeSuccess('Agregado', 'Se agregó correctamente');
      });
    } else {
      this.msg.mensajeAdvertencia('Advertencia', this.inscripcion.validar().mensaje)
        
    }

  }
  seleccionarPrecio(id: string) {
    if (id != 'null') {


      this.precioSeleccionado = this.precios.find(precio => precio.id == id);
      this.inscripcion.precios = this.precioSeleccionado.ref;
      this.inscripcion.fecha = new Date();
      if (this.precioSeleccionado.tipoDuracion == 1) {
        let dias: number = this.precioSeleccionado.duracion;
        let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(),
          this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias);
        this.inscripcion.fechaFinal = fechaFinal;
      }
      if (this.precioSeleccionado.tipoDuracion == 2) {
        let dias: number = this.precioSeleccionado.duracion * 7;
        let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(),
          this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias);
        this.inscripcion.fechaFinal = fechaFinal;
      }
      if (this.precioSeleccionado.tipoDuracion == 3) {
        let dias: number = this.precioSeleccionado.duracion * 15;
        let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(),
          this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias);
        this.inscripcion.fechaFinal = fechaFinal;
      }
      if (this.precioSeleccionado.tipoDuracion == 4) {
        let anio: number = this.inscripcion.fecha.getFullYear();
        let mes = this.precioSeleccionado.duracion + this.inscripcion.fecha.getMonth();
        let dia = this.inscripcion.fecha.getDate();
        let fechaFinal = new Date(anio, mes, dia);
        this.inscripcion.fechaFinal = fechaFinal;
      }
      if (this.precioSeleccionado.tipoDuracion == 5) {
        let anio: number = this.inscripcion.fecha.getFullYear() + this.precioSeleccionado.duracion;
        let mes = this.inscripcion.fecha.getMonth();
        let dia = this.inscripcion.fecha.getDate();
        let fechaFinal = new Date(anio, mes, dia);
        this.inscripcion.fechaFinal = fechaFinal;
      }

      //Calcular precios
      this.inscripcion.subTotal = this.precioSeleccionado.costo;
      this.inscripcion.isv = this.precioSeleccionado.costo * 0.15;
      this.inscripcion.total = this.inscripcion.subTotal + this.inscripcion.isv;
    } else {
      this.precioSeleccionado = new Precio();
      this.inscripcion.fecha = null;
      this.inscripcion.fechaFinal = null;
      this.inscripcion.precios = null;
      this.inscripcion.subTotal = 0;
      this.inscripcion.isv = 0;
      this.inscripcion.total = 0;
    }
  }
}
