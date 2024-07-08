package com.kinga.followtask.repository;

import com.kinga.followtask.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    public List<Comment> findByIssueId(Long issueId);
}
