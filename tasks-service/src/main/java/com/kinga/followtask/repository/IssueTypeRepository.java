package com.kinga.followtask.repository;

import com.kinga.followtask.entity.IssueType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueTypeRepository extends JpaRepository<IssueType,Long> {
    List<IssueType> findByProjectId(Long projectId);

}
