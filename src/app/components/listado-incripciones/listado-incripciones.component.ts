import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Inscripcion } from 'src/app/models/inscripcion';

@Component({
  selector: 'app-listado-incripciones',
  templateUrl: './listado-incripciones.component.html',
  styleUrls: ['./listado-incripciones.component.scss']
})
export class ListadoIncripcionesComponent implements OnInit {
  inscripciones: any[] = [];
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.getInscripciones();
  }

  getInscripciones() {
    this.inscripciones.length = 0;
    this.db.collection('inscripciones').get().subscribe((response) => {
      response.forEach((inscripcion) => {
        let inscripcionObtenida = inscripcion.data();
        inscripcionObtenida.id = inscripcion.id;
        this.db.doc(inscripcion.data().cliente.path).get().subscribe((cliente) => {
          inscripcionObtenida.clienteObtenido = cliente.data();
          inscripcionObtenida.fecha = new Date(inscripcionObtenida.fecha.seconds * 1000);
          inscripcionObtenida.fechaFinal = new Date(inscripcionObtenida.fechaFinal.seconds * 1000);
          this.inscripciones.push(inscripcionObtenida);
        });

      });
    });
  }

}
