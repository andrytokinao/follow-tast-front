package com.kinga.followtask.dto;

import com.kinga.followtask.config.ModuleMenue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class Accessibility {
    public Set<String> routes ;
    private Map<String, ModuleMenue> moduleMenues;
}
