import { Injectable } from '@angular/core';
import { Education } from '../../models/education/education.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private dbPath = '/education';

  educationServiceRef: AngularFirestoreCollection<Education>;

  constructor(private db: AngularFirestore) {
    this.educationServiceRef = db.collection(this.dbPath);
  }

  getEducation(): AngularFirestoreCollection<Education> {
    return this.educationServiceRef;
  }

  createEducation(myEducation: Education): any {
    const { id, ...educationNoId } = myEducation; // Elimina el id si está presente
    return this.educationServiceRef.add(educationNoId);
  }

  deleteEducation(id?: string): Promise<void> {
    return this.educationServiceRef.doc(id).delete();
  }

  updateEducation(myEducation: Education, id_U?: string,): Promise<void> {
    const { id, ...educationNoId } = myEducation;
    return this.educationServiceRef.doc(id_U).update(educationNoId);
  }
}
