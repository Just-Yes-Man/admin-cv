import { Component } from '@angular/core';
import { Education } from '../models/education/education.model';
import { EducationService } from '../services/education-service/education.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrl: './admin-education.component.css'
})
export class AdminEducationComponent {
  itemCount: number = 0;
  btnTxt: string = "Agregar";
  goalText: string = "";
  education: Education[] = [];
  myEducation: Education = new Education();

  constructor(public educationService: EducationService) {
    console.log(this.educationService);
    this.educationService.getEducation().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.education = data;
      console.log(this.educationService);
    });
  }

  agregarEducation() {
    console.log(this.myEducation);
    this.educationService.createEducation(this.myEducation).then(() => {
      console.log('Created new item successfully!');
    });
  }

  deleteEducation(id?: string) {
    this.educationService.deleteEducation(id).then(() => {
      console.log('delete item successfully');
    });
    console.log(id);
  }

  updateEducation(id?: string) {

    this.educationService.updateEducation(this.myEducation, id).then(() => {
      console.log('update item successfully');
    });
    console.log(id);
  }
  confirmDelete(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este ítem?')) {
      this.deleteEducation(id);
    }
  }

  confirmUpdate(id: string) {
    if (confirm('¿Estás seguro de que quieres actualizar este ítem?')) {
      this.updateEducation(id);
    }
  }
}
