import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Skills } from '../../models/skills/skills.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {


  private dbPath = '/skills';

  skillsRef: AngularFirestoreCollection<Skills>;

  constructor(private db: AngularFirestore) {
    this.skillsRef = db.collection(this.dbPath);
  }

  getSkills(): AngularFirestoreCollection<Skills> {
    return this.skillsRef;
  }

  createWorkExperience(mySkill: Skills): any {
    const { id, ...skillNoId } = mySkill; // Elimina el id si está presente
    return this.skillsRef.add(skillNoId);
  }

  deleteSkills(id?: string): Promise<void> {
    return this.skillsRef.doc(id).delete();
  }

  updateSkills(mySkill: Skills, id_U?: string,): Promise<void> {
    const { id, ...skillNoId } = mySkill;
    return this.skillsRef.doc(id_U).update(skillNoId);
  }
}

