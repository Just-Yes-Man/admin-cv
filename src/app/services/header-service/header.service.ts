import { Injectable } from '@angular/core';
import { Header } from '../../models/header/header.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private dbPath = '/header';

  headerServiceRef: AngularFirestoreCollection<Header>;

  constructor(private db: AngularFirestore) {
    this.headerServiceRef = db.collection(this.dbPath);
  }

  getHeader(): AngularFirestoreCollection<Header> {
    return this.headerServiceRef;
  }

  createHeader(myHeader: Header): any {
    const { id, ...headersNoId } = myHeader; // Elimina el id si está presente
    return this.headerServiceRef.add(headersNoId);
  }

  deleteHeader(id?: string): Promise<void> {
    return this.headerServiceRef.doc(id).delete();
  }

  updateHeader(myHeader: Header, id_U?: string,): Promise<void> {
    const { id, ...headersNoId } = myHeader;
    return this.headerServiceRef.doc(id_U).update(headersNoId);
  }
}
