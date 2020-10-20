import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore,
              private authService: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {

    return this.firestore.doc(`${this.authService.user.uid}/ingresos-egresos`)
    .collection('items')
    .add({ ...ingresoEgreso });
  }

  initIngresosEgresosListener(uid: string) {
    this.firestore.collection(`${uid}/ingresos-egresos/items`).valueChanges()
    .subscribe(resp => { 
      console.log(resp);
    });
  }
  
}
