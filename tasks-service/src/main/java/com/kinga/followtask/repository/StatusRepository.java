package com.kinga.followtask.repository;

import com.kinga.followtask.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status,Long> {
}
