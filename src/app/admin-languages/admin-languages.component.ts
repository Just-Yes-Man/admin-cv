import { Component } from '@angular/core';
import { Languages } from '../models/languages/languages.model';
import { LanguagesService } from '../services/languages-service/languages.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrl: './admin-languages.component.css'
})
export class AdminLanguagesComponent {
  itemCount: number = 0;
  btnTxt: string = "Agregar";
  goalText: string = "";
  languagues: Languages[] = [];
  myLanguages: Languages = new Languages();

  constructor(public languaguesService: LanguagesService) {
    console.log(this.languaguesService);
    this.languaguesService.getLanguages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.languagues = data;
      console.log(this.languaguesService);
    });
  }

  agregarLanguages() {
    console.log(this.myLanguages);
    this.languaguesService.createLanguages(this.myLanguages).then(() => {
      console.log('Created new item successfully!');
    });
  }

  deleteLanguages(id?: string) {
    this.languaguesService.deleteLanguages(id).then(() => {
      console.log('delete item successfully');
    });
    console.log(id);
  }

  updateLanguages(id?: string) {
    this.languaguesService.updateLanguages(this.myLanguages, id).then(() => {
      console.log('update item successfully');
    });
    console.log(id);
  }
}
