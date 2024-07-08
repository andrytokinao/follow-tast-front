package com.kinga.followtask.repository;

import com.kinga.followtask.entity.CrossingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrossingStateRepository extends JpaRepository<CrossingStatus,Long> {
}
