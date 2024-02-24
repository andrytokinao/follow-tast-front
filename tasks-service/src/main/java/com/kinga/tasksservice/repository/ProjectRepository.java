package com.kinga.tasksservice.repository;

import com.kinga.tasksservice.entity.Issue;
import com.kinga.tasksservice.entity.PasseTime;
import com.kinga.tasksservice.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project,Long> {
}
