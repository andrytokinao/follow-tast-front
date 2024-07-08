package com.kinga.followtask.repository;

import com.kinga.followtask.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue,Long> {
    public List<Issue> findByAssigneId(String id);

    List<Issue> findByIssueTypeIdIn(List<Long> issueT);

}
