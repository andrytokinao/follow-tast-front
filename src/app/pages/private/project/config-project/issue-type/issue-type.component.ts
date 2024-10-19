import { Component } from '@angular/core';
import {Icone, Issue, IssueType, Project, Status, WorkFlow} from "../../../../../type/issue";
import {ConfigService} from "../../../../../services/config.service";
import {IssueService} from "../../../../../services/issue.service";
import {supprimerTypename} from "../../../../../type/graphql.operations";
import {ActivatedRoute} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IssueTypeModalComponent} from "./issue-type-modal/issue-type-modal.component";
import {ChooseDialogComponent} from "../../../../../common/icone-field/choose-dialog/choose-dialog.component";
import {J} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-issue-type',
  templateUrl: './issue-type.component.html',
  styleUrl: './issue-type.component.css'
})
export class IssueTypeComponent {
  test :String = "test okay ";
  issueType: IssueType | any = {};
  newIssueType:IssueType | any = {};
  project:Project | any = {};
  workFlow: any = {};
  action: String = "";
  activeModal: any;
  selected: boolean = false;
  isNewIssueType:boolean = false;
  isNewWorkFlow: boolean = false;
  iconSelected: Icone | undefined ;
  newWorkflowName: string= "";
  isCreateState: boolean=false;
  constructor(private configService:ConfigService,
              private issueService :IssueService,
              private route: ActivatedRoute,
              private modalService:NgbModal

  ) {

  }

  saveIssueType(issueType:IssueType | any) {
    this.isNewIssueType = false ;
    if(issueType == null) {
      issueType = {};
    }
    let project :any = {} ;
    project.id = this.project.id;
    issueType.project = project;
    this.issueService.saveIssueType(issueType).subscribe(
      (issueTypes: any) => {
        this.project.issueTypes = [];
        this.project.issueTypes = supprimerTypename(issueTypes)
      }
    );
  }
  saveWorkFlow(name:String,wf:any) {
    this.isNewIssueType = false;
    let workFlow : any = {};
    workFlow.name = name;
    workFlow.id = wf.id;
    let project : any = {};
    project.id = this.project.id;
    workFlow.project = project;
    this.issueService.saveWorkFlow(workFlow).subscribe( (workFlow)=>{
        this.affectWorkFlow(workFlow);
      }
    )

  }
  affectWorkFlow(wf:WorkFlow){
    let project : any = {};
    let workFlow :any ={};
    let issueType :any ={};
    project.id = this.project.id;
    workFlow.id = wf.id;
    issueType.id = this.issueType.id;
    workFlow.project = project;
    issueType.project = project;
    issueType.curentWorkFlow = workFlow;
    this.issueService.affectWorkFlow(issueType).subscribe( (workFlow)=>{
        this.issueType.curentWorkFlow  = workFlow;
      }
    )
  }

  selectIssueType(issueType: any) {
    console.info('select .'+issueType.name);
    this.issueType = issueType;
    this.showConfigType(issueType);
  }
  showConfigType(issueType:any) {
    const dialogRef = this.modalService.open(IssueTypeModalComponent,{windowClass: "xlModal"} );
    dialogRef.componentInstance.issueType = issueType;
    dialogRef.componentInstance.project = this.project;
    dialogRef.result.then((res) => {
      this.issueType = res
    })
  }

  createIssueType() {
    this.isNewIssueType = true;
  }

  isSelectedWorkFlow(workFlow:any):boolean{
    console.info("is workFlow "+workFlow.id + " current work flow ="+this.workFlow.id);
     if (workFlow == null || workFlow.id == null)
       return false;
    if (this.issueType.curentWorkFlow == null || this.issueType.curentWorkFlow.id == null)
      return false;
    return this.issueType.curentWorkFlow.id == workFlow.id;

  }
  isSelectedIssueType(issueType:any):boolean{
    if (issueType == null || issueType.id == null || issueType.id == undefined) {
      return false;
    }
    if (this.issueType == null || this.issueType.id == null ||  this.issueType == undefined || this.issueType.id == undefined ) {
      return false;
    }
    return this.issueType.id == issueType.id;
  }
  createWorkFlow() {
    this.isNewWorkFlow = true;
  }

  selectWorkFlow(workFlow: any) {
    this.affectWorkFlow(workFlow);
  }

  createState() {
    this.isCreateState = true;
  }

  addStatus(status: Status) {
    let project:any = {};
    project.id = this.project.id;
    this.issueType.curentWorkFlow.project = project;
    this.issueService.addStatus(status,this.issueType.curentWorkFlow,this.issueType.id).subscribe(
      workFlow=>{
        this.isCreateState = false;
      this.issueType.curentWorkFlow = workFlow;
    }
    )
  }
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.project = data['project'];
    });
}
}
