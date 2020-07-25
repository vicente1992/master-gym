import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
  formCliente: FormGroup;
  porcentajeSubida: number = 0;
  urlImage: string = '';
  esEditable: boolean = false;
  id: string;
  constructor(
    private fb: FormBuilder, private storage: AngularFireStorage,
    private db: AngularFirestore, private activatedRoute: ActivatedRoute,
    private msg: MensajeService
  ) { }

  ngOnInit(): void {

    this.formCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['vic_ortiz@hotmai.es', Validators.compose([
        Validators.required, Validators.email
      ])],
      cedula: [''],
      fechaNacimiento: ['', Validators.required],
      telefono: [''],
      ImgUrl: ['', Validators.required],
    });


    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id != undefined) {
      this.esEditable = true;
      this.db.doc<any>('clientes/' + this.id).valueChanges().subscribe((cliente) => {
        this.formCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          email: cliente.email,
          cedula: cliente.cedula,
          fechaNacimiento: new Date(cliente.fechaNacimiento.seconds * 1000).toISOString().substr(0, 10),
          telefono: cliente.telefono,
          ImgUrl: '',
        })
        this.urlImage = cliente.ImgUrl;
      });
    }
  }
  agregarCliente() {
    this.formCliente.value.ImgUrl = this.urlImage;
    this.formCliente.value.fechaNacimiento = new Date(this.formCliente.value.fechaNacimiento);
    this.db.collection('clientes').add(this.formCliente.value).then(() => {
      this.formCliente.reset();
      this.msg.mensajeSuccess('Agregado', 'Registro éxitoso')
    })

  }
  editarCliente() {
    this.formCliente.value.ImgUrl = this.urlImage;
    this.formCliente.value.fechaNacimiento = new Date(this.formCliente.value.fechaNacimiento);
    this.db.doc('clientes/' + this.id).update(this.formCliente.value).then(() => {
      this.formCliente.reset();
      this.msg.mensajeSuccess('Actualizado', 'Cliente actualizado')
    }).catch(() => {
      this.msg.mensajeError('Error', 'Error al actualizar cliente');
    })
  }

  subirImagen(e) {
    if (e.target.files.length) {
      let nombreImagen = new Date().getTime().toString();
      let archivo = e.target.files[0];
      let extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'));
      let ruta = 'clientes/' + nombreImagen + extension;
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(archivo);
      tarea.then((response) => {
        console.log('Imagen subida');
        referencia.getDownloadURL().subscribe((url) => {
          this.urlImage = url;
        })
      });
      tarea.percentageChanges().subscribe((porcentaje) => {
        this.porcentajeSubida = parseInt(porcentaje.toString());
      });
    }

  }


}
