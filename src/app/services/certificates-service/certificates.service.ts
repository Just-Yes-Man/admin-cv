import { Injectable } from '@angular/core';
import { Certificates } from '../../models/certificates/certificates.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {


  private dbPath = '/certificates';

  certificatesServiceRef: AngularFirestoreCollection<Certificates>;

  constructor(private db: AngularFirestore) {
    this.certificatesServiceRef = db.collection(this.dbPath);
  }

  getCertificates(): AngularFirestoreCollection<Certificates> {
    return this.certificatesServiceRef;
  }

  createCertificates(myCertificates: Certificates): any {
    const { id, ...certificatesNoId } = myCertificates; // Elimina el id si está presente
    return this.certificatesServiceRef.add(certificatesNoId);
  }

  deleteCertificates(id?: string): Promise<void> {
    return this.certificatesServiceRef.doc(id).delete();
  }

  updateCertificates(myCertificates: Certificates, id_U?: string,): Promise<void> {
    const { id, ...certificatesNoId } = myCertificates;
    return this.certificatesServiceRef.doc(id_U).update(certificatesNoId);
  }
}
