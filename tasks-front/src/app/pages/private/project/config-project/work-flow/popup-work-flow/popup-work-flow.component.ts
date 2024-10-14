import { Component } from '@angular/core';
import {Project, Status, WorkFlow} from "../../../../../../type/issue";
import {IssueService} from "../../../../../../services/issue.service";
import {ActivatedRoute} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-popup-work-flow',
  templateUrl: './popup-work-flow.component.html',
  styleUrl: './popup-work-flow.component.css'
})
export class PopupWorkFlowComponent {
  project:Project | any = {};
  workFlow:WorkFlow | any = {};
  isCreateState: boolean;
  iconSelected: any;

  onCancelClick() {

  }
  constructor(private issueService :IssueService,
              private route: ActivatedRoute,
              public activeModal: NgbActiveModal,
  ) {
  }
  toggleCheck(it: any) {

  }

  isUsing(wf: any) {

  }

  onSaveClick() {

  }

  addStatus(status: Status) {
    this.isCreateState = false;
    let project:any = {};
    project.id = this.project.id;
    this.workFlow.project = project;
    alert("ad statusyy");
    this.issueService.addStatus(status,this.workFlow,null).subscribe(
      workFlow=>{
        this.workFlow = workFlow;
        this.isCreateState = false;
      }
    )
  }

  createState() {
    this.isCreateState = true;
  }
}
