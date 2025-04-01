import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { WorkExperience } from '../../models/work-experience/work-experience.model';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {


  private dbPath = '/work-experience';

  workExperienceRef: AngularFirestoreCollection<WorkExperience>;

  constructor(private db: AngularFirestore) {
    this.workExperienceRef = db.collection(this.dbPath);
  }

  getWorkExperience(): AngularFirestoreCollection<WorkExperience> {
    return this.workExperienceRef;
  }

  createWorkExperience(myJob: WorkExperience): any {
    const { id, ...jobNoId } = myJob; // Elimina el id si está presente
    return this.workExperienceRef.add(jobNoId);
  }

  deleteWorkExperience(id?: string): Promise<void> {
    return this.workExperienceRef.doc(id).delete();
  }
}

