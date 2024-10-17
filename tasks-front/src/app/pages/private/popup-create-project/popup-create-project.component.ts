import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {IssueService} from "../../../services/issue.service";
import {stripTypename} from "@apollo/client/utilities";
import {Issue} from "../../../type/issue";

@Component({
  selector: 'app-popup-create-project',

  templateUrl: './popup-create-project.component.html',
  styleUrl: './popup-create-project.component.css'
})
export class PopupCreateProjectComponent {

  user: any;
  project: any = {
    id: null,
    name: "",
    prefix:  "",
  };
  constructor(  public activeModal: NgbActiveModal,
                public issueService:IssueService,) {
  }

  save() {
    let project:any = {};
    project.id = this.project.id;
    project.name = this.project.name;
    project.prefix = this.project.prefix;
    this.issueService.createProjectOrSave(project).subscribe(
      (res:any)=>{
        this.activeModal.close( stripTypename(res));

      },
      (error)=>{
        console.error(error);
      }
    );
  }
}
