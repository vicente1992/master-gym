import { DocumentReference } from 'angularfire2/firestore';

export class Cliente {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  ImgUrl: string;
  fechaNacimiento: string;
  telefono: number;
  cedula: string;
  ref: DocumentReference;
  visible: boolean;
}