package com.kinga.followtask.service;

import com.kinga.followtask.dto.Criteria;
import com.kinga.followtask.entity.*;
import com.kinga.followtask.repository.*;
import com.kinga.utils.KingaUtils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {
    @Autowired
    public StatusRepository statusRepository;
    final ProjectRepository projectRepository;
    final IssueTypeRepository issueTypeRepository;
    final IssueRepository issueRepository;
    final WorkFlowRepository workFlowRepository;
    final ConfigRepository configRepository;
    final IconeRepository iconeRepository;
    final UsingCustomFieldRepository usingCustomFieldRepository;
    public final CustomFieldRepository customFieldRepository;
    final ConfigProjectRepo configProjectRepo;

    static Logger logger = LoggerFactory.getLogger (ProjectService.class);

    public Status saveStatus (Status status) {
        return statusRepository.save (status);
    }

    public List<Status> findAll () {
        return statusRepository.findAll ();
    }

    public Project getProjectById (Long id) {
        return projectRepository.getById (id);
    }

    public Project getByPrefix (String prefix) {
        return this.projectRepository.findByPrefix (prefix);
    }

    /*
     * 1) Creation projet
     * 2) Creation type ( projet oblogatoire )
     * 3) - Creation work flow
     *    - Setet dans le type
     * 4) Creation et ou affication des status dans le workFlow
     * */
    public List<Project> allProjects () {
        return projectRepository.findAll ();
    }

    // Etape 1 : Creation projet
    public Project createProjectOrSave (Project project) throws IOException {
        ConfigEntry configEntry = configRepository.getByActiveIs (true);
        String installation = configEntry.getInstalationState ();

        if (StringUtils.isEmpty (project.getName ()) || StringUtils.isEmpty (project.getPrefix ())) {
            throw new RuntimeException ("Name and prefix are required");
        }
        if (project.getId () == null) {
            if (projectRepository.findByPrefix (project.getPrefix ()) != null) {
                throw new RuntimeException ("Prefix " + project.getPrefix () + " is alredy in use");
            }
        }
        if (StringUtils.isEmpty (project.getPath ())) {
            if (StringUtils.isEmpty (configEntry.getWorkDirectory ())) {
                configEntry.setInstalationState ("private/admin/config/work-space");
                configRepository.save (configEntry);
                project.setPath (KingaUtils.encodeText (KingaUtils.getDefaultWorkSpaceDirectory () + File.separator + project.getPrefix ()));
            } else {
                project.setPath (KingaUtils.encodeText (KingaUtils.decodeText (configEntry.getWorkDirectory ()) + "/" + project.getPrefix ()));
            }
        }
        project = projectRepository.save (project);
        if (!"complete".equalsIgnoreCase (installation)) {
            configEntry.setInstalationState ("private/admin/project/issue-type?project=" + project.getPrefix ());
            configEntry.setProjectPrefix (project.getPrefix ());
            configRepository.save (configEntry);
        }
        return project;
    }

    // Etape 2 : Creation type
    public List<IssueType> saveIssueType (IssueType issueType) {
        ConfigEntry configEntry = configRepository.getByActiveIs (true);
        String installation = configEntry.getInstalationState ();
        if (issueType.getIcone () != null)
            issueType.setIcone (iconeRepository.save (issueType.getIcone ()));
        issueType = issueTypeRepository.save (issueType);

        if (issueType.getProject () == null)
            throw new RuntimeException ("Type doit etre affecté au projet ");
        Project project = issueType.getProject ();
        if (!"complete".equalsIgnoreCase (installation)) {
            configEntry.setInstalationState ("rivate/admin/project/choose-groupe?project=" + project.getPrefix ());
        }

        configRepository.save (configEntry);
        issueTypeRepository.save (issueType);
        return issueTypeRepository.findByProjectId (issueType.getProject ().getId ());
    }

    // Etape 3 : Creation / chois  workFlow et affectation de type ==> Affecter a des status
    public WorkFlow affectWorkFlow (IssueType issueType) {
        WorkFlow workFlow = issueType.getCurentWorkFlow ();
        workFlow.setActive (true);
        ConfigEntry configEntry = configRepository.getByActiveIs (true);
        String installation = configEntry.getInstalationState ();
        workFlow.setActive (true);
        if (issueType.getId () == null)
            throw new RuntimeException ("Issue type not save");
        if (!issueTypeRepository.existsById (issueType.getId ())) {
            throw new RuntimeException ("IssueType#" + issueType.getId () + " not found");
        }
        issueType = issueTypeRepository.getById (issueType.getId ());
        workFlow = workFlowRepository.getById (workFlow.getId ());
        if (!"complete".equalsIgnoreCase (installation)) {
            configEntry.setInstalationState ("create-project/work-flow-status?work-flow=" + workFlow.getId ());
        }
        issueType.setCurentWorkFlow (workFlow);
        configRepository.save (configEntry);
        issueTypeRepository.save (issueType);
        logger.info ("affect type " + issueType.getName () + " workflow " + workFlow.getName ());
        return workFlow;
    }

    // Etape 4 : Creation des different status dans un workflow ==> Creation / Selection de groupe pour une type
    public WorkFlow addStatus (Status status, WorkFlow workFlow) {
        if (status.getIcone () != null)
            iconeRepository.save (status.getIcone ());
        status = statusRepository.save (status);
        workFlow = workFlowRepository.findById (workFlow.getId ()).get ();
        Status finalStatus = status;
        boolean existe = workFlow.getStatuses ().stream ()
                .anyMatch (s -> s.getId () == finalStatus.getId ());
        if (existe)
            return workFlow;
        workFlow.getStatuses ().add (status);
        String statusIds = workFlow.getStatesIds ();
        statusIds += (StringUtils.isEmpty (statusIds) ? "" : ",") + status.getId ();
        workFlow.setStatesIds (statusIds);
        logger.debug ("add status " + status.toString () + " " + workFlow.toString () + " " + workFlow.getProject ().toString ());
        return workFlowRepository.save (workFlow);
    }

    public List<WorkFlow> allWorkFlow () {
        return workFlowRepository.findAll ();
    }

    public IssueType getIssueType (Long issueTypeId) {
        return this.issueTypeRepository.getReferenceById (issueTypeId);
    }

    public WorkFlow saveWorkFlow (WorkFlow workFlow) {
        return workFlowRepository.save (workFlow);
    }

    public List<Issue> issueByCriteria (List<Criteria> criterias) {
        List<Criteria> typeCriterias = Criteria.findByField (criterias, "issueTypeId");
        List<Long> issueTypeIds = new ArrayList<> ();
        if (!CollectionUtils.isEmpty (typeCriterias)) {
            String issueTypeIdS = typeCriterias.get (0).getValue ();
            try {
                issueTypeIds.add (Long.valueOf (issueTypeIdS));
            } catch (Exception e) {
                logger.error (e.getMessage (), e);
            }
        }
        if (!CollectionUtils.isEmpty (issueTypeIds)) {
            return issueRepository.findByIssueTypeIdIn (issueTypeIds);
        }
        return new ArrayList<> ();
    }

    public List<CustomField> saveCustomField (CustomField customField) {
        customFieldRepository.save (customField);
        return customFieldRepository.findAll ();
    }

    public List<CustomField> allCustomField () {
        return customFieldRepository.findAll ();
    }

    public List<UsingCustomField> useCustomField (UsingCustomField usingCustomField) {
        if (usingCustomField.getCustomField () == null ||
                usingCustomField.getCustomField ().getId () == null ||
                usingCustomField.getIssueType () == null ||
                usingCustomField.getIssueType ().getId () == null) {
            throw new RuntimeException ("Invalid data ");
        }
        List<UsingCustomField> existing = usingCustomFieldRepository.findByCustomFieldIdAndIssueTypeId (usingCustomField.getCustomField ().getId (), usingCustomField.getIssueType ().getId ());
        if (CollectionUtils.isEmpty (existing)) {
            usingCustomFieldRepository.save (usingCustomField);
        }
        return usingCustomFieldRepository.findByIssueTypeId (usingCustomField.getIssueType ().getId ());
    }

    public List<UsingCustomField> unUseCustomField (UsingCustomField usingCustomField) {
        if (usingCustomField.getCustomField () == null ||
                usingCustomField.getCustomField ().getId () == null ||
                usingCustomField.getIssueType () == null ||
                usingCustomField.getIssueType ().getId () == null) {
            throw new RuntimeException ("Invalid data ");
        }
        List<UsingCustomField> existing = usingCustomFieldRepository.findByCustomFieldIdAndIssueTypeId (usingCustomField.getCustomField ().getId (), usingCustomField.getIssueType ().getId ());
        if (!CollectionUtils.isEmpty (existing)) {
            existing.forEach (e -> usingCustomFieldRepository.delete (e));
        }
        return usingCustomFieldRepository.findByIssueTypeId (usingCustomField.getIssueType ().getId ());
    }

    public List<UsingCustomField> customFieldsByIssueType (Long issueTypeId) {
        return usingCustomFieldRepository.findByIssueTypeId (issueTypeId);
    }

    public ConfigProject setPath (String path, Long projectId) {
        ConfigProject configProject = new ConfigProject ();
        configProject.setGroupe ("config.project." + projectId + ".path");
        configProject.setValue (path);
        return saveOrUpdateConfig (configProject);
    }
    public ConfigProject saveOrUpdateConfig(ConfigProject cf){
       /* List<ConfigProject> existes = configProjectRepo.findByGroupe(cf.getGroupe ());
        ConfigProject configProject = null;
        if (CollectionUtils.isEmpty (existes)) {
            configProject = new ConfigProject ();
        } else {
            configProject = existes.get (0);
        }
        configProject.setGroupe (cf.getGroupe ());
        configProject.setValue (cf.getValue ());*/

        return configProjectRepo.save (cf);
    }
    public List<ConfigProject> getConfigProject (Long projectId) {
       return configProjectRepo.findByGroupeContaining ("'config.project." + projectId + ".'");
    }
}
