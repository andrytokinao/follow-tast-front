package com.kinga.followtask.repository;

import com.kinga.followtask.entity.CustomField;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomFieldRepository extends JpaRepository<CustomField,Long> {
}
