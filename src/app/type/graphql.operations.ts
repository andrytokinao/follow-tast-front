import {Apollo, gql} from "apollo-angular";



export type Maybe<T> = T | null;

const SAVE_USER = gql`
  mutation saveUser($userApp:UserAppInput) {
    saveUser(userApp: $userApp) {
      id
      username
      firstName
      lastName
      cin
    }
  }
`;
const INIT_USER = gql`
  mutation initUser($userApp:UserAppInput) {
    initUser(userApp: $userApp) {
      id
      username
      firstName
      lastName
      cin
    }
  }
`;
const ALL_USERS = gql`
  query{
    allUsers{
      id,
      username,
      firstName,
      password,
      lastName,
      contact,
      email,
      address,
      cin,
      photo
    }
  }
`;
const GET_USER = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      id
      username
      password
      lastName
      firstName
      cin
      photo
      address
      email
      groupes {
        id
        groupe {
          name
          id
          members {
            role
            id
            groupe {
              id
              name
            }
          }
        }
      }
    }
  }
`;

const SAVE_ISSUE = gql`
  mutation saveIssue($issue:IssueInput) {
    saveIssue(issue: $issue) {
      id
      summary
      description
      issueKey
      assigne {
        id
        username
        firstName
        username
        photo
      }
      status {
        id
        displayName
        icone {
          id
          typeIcone
          value
        }
      }
      reporter {
        id
        firstName
        lastName
        photo
      }
      issueType {
        id
        name
        icone {
          id
          typeIcone
          value
        }
      }
    }
  }
`;
const ADD_COMMENT = gql`
  mutation addComment($comment:CommentInput) {
    addComment(comment: $comment) {
      id
      text
      date
      issue {
        id
      }
      user {
        id
        username
        lastName
        firstName
        photo
      }
    }
  }
`;
const ALL_ISSUE = gql`
  query allIssues {
    allIssue {
      id
      summary
      description
      issueKey
      issueType {
        id
        name
        icone {
          id
          typeIcone
          value
        }
      }
      assigne {
        id
        username
        firstName
        lastName
        username
        photo
      }
      status {
        id
        displayName
        icone {
          id
          typeIcone
          value
        }
      }
      reporter {
        id
        firstName
        lastName
        photo
      }
    }
  }
`;
const  ALL_COMMENT = gql`
  query allComment ($issueId:Int!) {
    allComment(issueId: $issueId){
      id
      text
      user {
        id
        username
        lastName
        firstName
        photo
      }
      issue {
        id
      }

    }
  }
`;
const  GET_VALUES = gql`
  query getValues ($issueId:Int!) {
    getValues(issueId: $issueId){
      id
      string
      date
      numeric
      issue {
        id
      }
      user {
        id
        username
        lastName
        firstName
        photo
      }
      customField {
        id
        type
        name
      }
      issue {
        id
      }

    }
  }
`;
const  SAVE_VALUE = gql`
  mutation saveValue ($value:ValueInput!) {
    saveValue(value: $value){
      id
      string
      date
      numeric
      text
      issue {
        id
      }
      user {
        id
        username
        lastName
        firstName
        photo
      }
      customField {
        id
        type
        name
      }
      issue {
        id
      }

    }
  }
`;
const  GET_ISSUE_BY_ASSIGN = gql`
  query getByAssign ($assignId:String!) {
     findIssueByUserId(id: $assignId){
      id
      summary
      summary
       issueType {
         id
         name
         icone {
           id
           value
           typeIcone
         }
       }
      assigne {
        id
        username
        firstName
        username
      }
       reporter {
         id
       }
       status {
         id
         displayName
         icone {
           id
           typeIcone
           value
         }
       }
    }
  }
`;

const  ALL_STATUS = gql`
  query allStatus {
    findAllStatus{
      id
      displayName
      icone {
        id
        typeIcone
        value
      }
      }
    }
`;

const  LOAD_GROUPE_MEMBER = gql`
  query loadGroupeMember($userId:String!) {
    loadGroupeMember(userId: $userId){
      id
      groupe {
        id
        name
      }
      role
    }
  }
`;
const ALL_CUSTOMFIELD = gql`
  query allCustomField  {
    allCustomField{
      id
      name
      type
    }
  }
`;
const ALL_CUSTOMFIELD_BY_ISSUE = gql`
  query allCustomField ($issueId:Int!) {
    allCustomFieldByIssue(issueId:$issueId){
      id
      name
      type
    }
  }
`;
const SAVE_CONFIG = gql`
  mutation saveConfig($configEntry:ConfigEntryInput) {
    saveConfig( configEntry: $configEntry) {
      id
      dateEntry
      version
      typeEntry
    }
  }
`;
const GET_CONFIG = gql`
  query allCustomField ($typeEntry:String!) {
    getConfig(typeEntry:$typeEntry){
      id
      acive
      configDirectory
      dataDirectory
      mediaDirectory
      workDirectory
    }
  }
`;
const ALL_CONFIG = gql`
  query allConfig  {
    allConfig {
      id
      acive
      version
    }
  }
`;

const  SAVE_PROJECT = gql`
  mutation createProjectOrSave ($project:ProjectInput!) {
    createProjectOrSave(project: $project){
      id
      name
      prefix
      issueTypes {
        id
        name
        prefix
        icone {
          id
          value
          typeIcone
        }
        curentWorkFlow {
          id
          name
          statuses {
            id
            displayName
            icone {
              id
              typeIcone
              value
            }
          }
        }
      }

    }
  }
`;

const  SAVE_ISSUE_TYPE = gql`
  mutation saveIssueType ($issueType:IssueTypeInput!) {
    saveIssueType(issueType: $issueType){
      id
      name
      prefix
      icone {
        id
        value
        typeIcone
      }
      curentWorkFlow {
        id
        name
        statuses {
          id
          displayName
          icone {
            id
            typeIcone
            value
          }
        }
      }

    }
  }
`;
const  GET_ISSUE_TYPE = gql`
   query ($issueTypeId:Int!) {
    getIssueType(issueTypeId: $issueTypeId){
      id
      name
      prefix
      curentWorkFlow {
        id
        name
        statuses {
          id
          displayName
          icone {
            id
            typeIcone
            value
          }
        }
      }

    }
  }
`;
const SAVE_WORK_FLOW = gql`
    mutation saveWorkFlow($workFlow:WorkFlowInput) {
      saveWorkFlow(workFlow: $workFlow) {
        id
        name
        statuses {
          id
          displayName
          icone {
            id
            typeIcone
            value
          }
        }
      }
    }
`
const  AFFECT_WORKFLOW = gql`
  mutation affectWorkFlow ($issueType:IssueTypeInput!) {
    affectWorkFlow(issueType: $issueType){
      id
      name
      statuses {
        id
        displayName
        icone {
          id
          typeIcone
          value
        }
      }

    }
  }
`;
const  ADD_STATUS = gql`
  mutation addStatus ($status:StatusInput ,$workFlow:WorkFlowInput) {
    addStatus(workFlow: $workFlow, status: $status){
      id
      name
      statuses {
        id
        displayName
        icone {
          id
          typeIcone
          value
        }
      }
    }
  }
`;
const ALL_PROJECT = gql`
  query allProjects  {
    allProjects {
      id
      name
      prefix
      statusConfig
    }
  }
`;

const GET_PROJECT = gql`
  query getProject($prefix:String)  {
    getProject (prefix:$prefix){
      id
      name
      prefix
      issueTypes {
        id
        name
        prefix
        icone {
          id
          value
          typeIcone
        }
        curentWorkFlow {
          id
          name
          crossingStates {
            id
            name
            description
            credential {
              id
              name
            }
          }
          statuses {
            id
            displayName
            icone {
              id
              typeIcone
              value
            }
          }
        }
        usingCustomFields {
          id
          issueType {
            id
          }
          customField {
            id
            type
            name
          }
        }
      },
      workFlows {
        id
        name
        statuses {
          id
          displayName
          icone {
            id
            typeIcone
            value
          }
        }
        issueTypes {
          id
          name
          icone {
            id
            value
            typeIcone
          }
        }
      }
    }
  }
`;
 const ISSUE_BY_CRITERIA=gql`
   query issueByCriteria($criterias:[CriteriaInput]){
     issueByCriteria(criterias: $criterias){
       id
       issueKey
       summary
       comments {
         id
         date
         text
         user {
           id
           username
           lastName
           lastName
           photo
         }
       }
       assigne {
         id
         firstName
         lastName
         username
         photo
       }
       issueType {
         id
         name
         prefix
         icone {
           id
           value
           typeIcone
         }
       }
       reporter {
         id
         photo
         username
         lastName
         firstName
       }
       status {
         id
         displayName
         icone {
           id
           value
           typeIcone
         }
       }
     }
   }
 `
const SEVE_CUSTOM_FIELD = gql`
    mutation saveCustomField($customField:CustomFieldImput!) {
      saveCustomField(customField:$customField) {
        name
        id
        type
        issueTypes {
          id
          issueType {
            id
          }
          customField {
            id
            type
            name
          }
        }
      }
    }
`

const ALL_CUSTOM_FIELD = gql`
   query allCustomField{
     allCustomField{
       id
       name
       issueTypes {
         id
         issueType {
           id
         }
         customField {
           id
           type
           name
         }
       }
       type
     }
   }
`
const USE_CUSTOM_FIELD = gql`
    mutation useCustomField($usingCustomField:UsingCustomFieldInput!) {
      useCustomField(usingCustomField: $usingCustomField) {
        customField {
          id
          type
          name
        }
        issueType {
          id
          name
          prefix
          icone {
            id
            typeIcone
            value
          }
        }
      }
    }`
const GET_CUSTOM_FIELD = gql `
   query getCustomField($id:Int) {
     getCustomField(id: $id) {
       id
       name
       issueTypes {
         id
         issueType {
           id
           name
         }
         customField {
           id
         }
       }
     }
   }
`
const UN_USE_CUSTOM_FIELD = gql`
    mutation unUseCustomField($usingCustomField:UsingCustomFieldInput!) {
       unUseCustomField(usingCustomField: $usingCustomField) {
        customField {
          id
          type
          name
        }
        issueType {
          id
          name
          prefix
          icone {
            id
            typeIcone
            value
          }
        }
      }
    }`

const CUSTOM_FIELD_BY_ISSUE_TYPE = gql`
   query customFieldsByIssueType($issueTypeId:Int) {
     customFieldsByIssueType (issueTypeId: $issueTypeId) {
       id
       customField {
         id
         name
         type
       }
       issueType {
         id
         name
       }
     }
   }

`
const ASSIGNE_TO_USER =  gql `
    mutation assigneToUser($issue:IssueInput) {
      assigneToUser(issue: $issue){
        id
        issueKey
        summary
        issueType {
          id
          name
          icone {
            id
            value
            typeIcone
          }
        }
        status {
          id
          displayName
          icone {
            id
            typeIcone
            value
          }
        }
        assigne {
          id
          firstName
          firstName
          photo
        }

      }
    }
`;

const GET_CONFIG_PROJECT =gql`
  query getConfigProject($projectId:Int){
    getConfigProject(projectId: $projectId){
      id
      groupe
      value
    }
  }
`
const SAVE_CONFIG_PROJECT=gql`
    mutation saveOrUpdateConfig($configProject:ConfigProjectInput){
      saveOrUpdateConfig(configProject: $configProject){
        id
        groupe
        value
      }
    }
`
export {
  supprimerTypename,
  SAVE_USER,
  GET_USER,
  ALL_USERS,
  SAVE_ISSUE,
  GET_ISSUE_BY_ASSIGN,
  ALL_ISSUE,
  ALL_STATUS,
  ADD_COMMENT,
  ALL_COMMENT,
  GET_VALUES,
  ALL_CUSTOMFIELD,
  SAVE_VALUE,
  LOAD_GROUPE_MEMBER,
  ALL_CONFIG,
  GET_CONFIG,
  SAVE_CONFIG,
  INIT_USER,
  SAVE_PROJECT,
  SAVE_ISSUE_TYPE,
  AFFECT_WORKFLOW,
  ADD_STATUS,
  ALL_PROJECT,
  GET_PROJECT,
  GET_ISSUE_TYPE,
  SAVE_WORK_FLOW,
  ISSUE_BY_CRITERIA,
  SEVE_CUSTOM_FIELD,
  ALL_CUSTOM_FIELD,
  USE_CUSTOM_FIELD,
  UN_USE_CUSTOM_FIELD,
  CUSTOM_FIELD_BY_ISSUE_TYPE,
  ASSIGNE_TO_USER,
  GET_CUSTOM_FIELD,
  GET_CONFIG_PROJECT,
  SAVE_CONFIG_PROJECT
}
function  supprimerTypename<T>(objet: T): T {
  if (!objet || typeof objet !== 'object') {
    return objet;
  }
  if (Array.isArray(objet)) {
    return objet.map((item) => supprimerTypename(item)) as T;
  }
  const nouvelObjet: any = {};
  for (const prop in objet) {
    if (objet.hasOwnProperty(prop) && prop !== '__typename') {
      nouvelObjet[prop] = supprimerTypename(objet[prop]);
    }
  }
  return nouvelObjet as T;
}
