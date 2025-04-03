import { Injectable } from '@angular/core';
import { Languages } from '../../models/languages/languages.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {


  private dbPath = '/languages';

  languagesServiceRef: AngularFirestoreCollection<Languages>;

  constructor(private db: AngularFirestore) {
    this.languagesServiceRef = db.collection(this.dbPath);
  }

  getLanguages(): AngularFirestoreCollection<Languages> {
    return this.languagesServiceRef;
  }

  createLanguages(myLanguage: Languages): any {
    const { id, ...languagesNoId } = myLanguage; // Elimina el id si está presente
    return this.languagesServiceRef.add(languagesNoId);
  }

  deleteLanguages(id?: string): Promise<void> {
    return this.languagesServiceRef.doc(id).delete();
  }

  updateLanguages(myLanguages: Languages, id_U?: string,): Promise<void> {
    const { id, ...languagesNoId } = myLanguages;
    return this.languagesServiceRef.doc(id_U).update(languagesNoId);
  }
}

