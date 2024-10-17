package com.kinga.followtask.repository;

import com.kinga.followtask.entity.ConfigProject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConfigProjectRepo extends JpaRepository<ConfigProject,Long> {
    List<ConfigProject> findByGroupeContaining(String groupe);

    List<ConfigProject> findByGroupe (String groupe);
}
