import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  clientes: any[] = new Array<any>();
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.getCLientes();
  }

  getCLientes() {

    this.clientes.length = 0;
    this.db.collection('clientes').get().subscribe((response) => {
      response.docs.forEach((item) => {
        let cliente = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;
        this.clientes.push(cliente);
      })
    })
  }
}
