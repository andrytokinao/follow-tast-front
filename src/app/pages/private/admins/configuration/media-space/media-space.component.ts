import { Component } from '@angular/core';
import {ConfigEntry, Issue, Project, Repertoire, User} from "../../../../../type/issue";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../../../../../services/config.service";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-media-space',
  templateUrl: './media-space.component.html',
  styleUrl: './media-space.component.css'
})
export class MediaSpaceComponent {
  project:Project | null = null;
  constructor(private http:HttpClient,private configService:ConfigService) {
    this.loadDossier();
    this.configService.loadConfig().subscribe((configEntry) => {
        this.configEntry = configEntry;
      }, error => {
        console.error(error);
      }
    );
  }
  repertoire:Repertoire = new class implements Repertoire {
    fileName: String="No directory";
    absolutePath:string = 'no';
    path: String ="no";
    repertoires: Repertoire[] =[];
    type: String = "none";
    selected :boolean = false;
    open : boolean = false;
  };

  configEntry :ConfigEntry | any= {}
  lastSelected:Repertoire | null = null;
  pathSelected:string = '';

  saveConfig() {
    this.configService.saveConfig('MEDIA_DIRECTORIES',this.pathSelected,this.configEntry.id).subscribe(
      (res:any)=>{
      }, (error :any)=>{
      }
    );
  }

  onFileSelected(repertoire: any) {
    if (repertoire.selected) {
      this.pathSelected = repertoire.absolutePath;
      this.configEntry.entry =  this.pathSelected;
      this.lastSelected = repertoire
    } else {
      this.pathSelected = '';
      this.lastSelected = null;
      this.configEntry.entry = this.pathSelected;
    }
    console.log('Fichiers sélectionnés :', this.pathSelected);
  }
  loadDossier(){
    this.http.get<Repertoire[]>(environment.apiURL+"api/sous-dossier/root",{withCredentials:true}).subscribe(
      res => {
        this.repertoire.repertoires = res;
      },
      err => {
      }
    )
  }
}
