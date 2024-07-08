package com.kinga.followtask.repository;

import com.kinga.followtask.entity.Comment;
import com.kinga.followtask.entity.Icone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IconeRepository extends JpaRepository<Icone,String> {
}
