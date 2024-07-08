package com.kinga.followtask.repository;

import com.kinga.followtask.entity.EntryTime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasseTimeRepository extends JpaRepository<EntryTime,Long> {
}
