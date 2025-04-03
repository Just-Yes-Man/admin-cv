import { Injectable } from '@angular/core';
import { Interests } from '../../models/interests/interests.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {

  private dbPath = '/interests';

  interestsServiceRef: AngularFirestoreCollection<Interests>;

  constructor(private db: AngularFirestore) {
    this.interestsServiceRef = db.collection(this.dbPath);
  }

  getInterests(): AngularFirestoreCollection<Interests> {
    return this.interestsServiceRef;
  }

  createInterests(myInterests: Interests): any {
    const { id, ...interestsNoId } = myInterests; // Elimina el id si está presente
    return this.interestsServiceRef.add(interestsNoId);
  }

  deleteInterests(id?: string): Promise<void> {
    return this.interestsServiceRef.doc(id).delete();
  }

  updateInterests(myInterests: Interests, id_U?: string,): Promise<void> {
    const { id, ...interestsNoId } = myInterests;
    return this.interestsServiceRef.doc(id_U).update(interestsNoId);
  }
}
