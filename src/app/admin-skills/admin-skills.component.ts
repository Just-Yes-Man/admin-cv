import { Component } from '@angular/core';
import { Skills } from '../models/skills/skills.model';
import { SkillsService } from '../services/skills-service/skills.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrl: './admin-skills.component.css'
})
export class AdminSkillsComponent {
  itemCount: number = 0;
  btnTxt: string = "Agregar";
  goalText: string = "";
  skills: Skills[] = [];
  mySkills: Skills = new Skills();

  constructor(public skillsService: SkillsService) {
    console.log(this.skillsService);
    this.skillsService.getSkills().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.skills = data;
      console.log(this.skillsService);
    });
  }

  agregarSkill() {
    console.log(this.mySkills);
    this.skillsService.createWorkExperience(this.mySkills).then(() => {
      console.log('Created new item successfully!');
    });
  }

  deleteSkill(id?: string) {
    this.skillsService.deleteSkills(id).then(() => {
      console.log('delete item successfully');
    });
    console.log(id);
  }

  updateSkill(id?: string) {
    this.skillsService.updateSkills(this.mySkills, id).then(() => {
      console.log('update item successfully');
    });
    console.log(id);
  }

}
