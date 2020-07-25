import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Cliente } from 'src/app/models/cliente';


@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {
  clientes: Cliente[] = new Array<Cliente>();
  @Input('nombre') nombre: string;
  @Output('seleccionoCliente') seleccionoCliente = new EventEmitter();
  @Output('canceloCliente') canceloCliente = new EventEmitter();
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.getCLientes();
  }
  getCLientes() {
    this.clientes.length = 0;
    this.db.collection('clientes').get().subscribe((response) => {
      response.docs.forEach((item) => {
        let cliente = item.data() as Cliente;
        cliente.id = item.id;
        cliente.ref = item.ref;
        cliente.visible = false;
        this.clientes.push(cliente);
      });
    });
  }
  buscarCliente(nombre: string) {
    this.clientes.forEach((cliente) => {
      if (cliente.nombre.toLowerCase().includes(nombre.toLowerCase())) {
        cliente.visible = true;
      } else {
        cliente.visible = false;
      }
    })

  }
  seleccionarCliente(cliente: Cliente) {
    this.nombre = cliente.nombre + ' ' + cliente.apellido;
    this.clientes.forEach((cliente) => {
      cliente.visible = false;
    });
    this.seleccionoCliente.emit(cliente);
  }
  cancelarCliente() {
    this.nombre = undefined;
    this.canceloCliente.emit();
  }
}
