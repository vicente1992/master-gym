import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';
//Models
import { Precio } from 'src/app/models/precio';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  formPrecio: FormGroup;
  precios: Precio[] = new Array<Precio>();
  esEditable: boolean = false;
  id: string;
  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private msg: MensajeService

  ) { }

  ngOnInit(): void {

    this.formPrecio = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required],
    })
    this.getPrecios();
  }
  getPrecios() {
    this.precios.length = 0;
    this.db.collection<Precio>('precios').get().subscribe((response) => {
      response.docs.forEach((item) => {
        let precio = item.data() as Precio;
        precio.id = item.id;
        precio.ref = item.ref;
        this.precios.push(precio);
      })
    })
  }

  agregarPrecio() {
    this.db.collection<Precio>('precios').add(this.formPrecio.value).then(() => {
      this.formPrecio.reset();
      this.getPrecios();
      this.msg.mensajeSuccess('Agregado', 'Precio agregado éxitosamente')

    }).catch(() => {
      this.msg.mensajeError('Error', 'Error al agregar precio');
    });

  }
  editarPrecio(precio: Precio) {
    this.esEditable = true;
    this.formPrecio.setValue({
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion
    })
    this.id = precio.id;
  }

  updatePrecio() {
    this.db.doc('precios/' + this.id).update(this.formPrecio.value).then(() => {
      this.msg.mensajeSuccess('Actualizado', 'Precio actualizado éxitosamente');
      this.formPrecio.reset();
      this.esEditable = false;
      this.getPrecios();
    }).catch(() => {
      this.msg.mensajeError('Error', 'Error al actualizar Precio');
    });
  }

}
