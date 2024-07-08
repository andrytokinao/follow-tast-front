package com.kinga.followtask.repository;

import com.kinga.followtask.entity.ConfigEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConfigRepository extends JpaRepository<ConfigEntry , Long> {
    public ConfigEntry getByActiveIs(boolean active);
}
