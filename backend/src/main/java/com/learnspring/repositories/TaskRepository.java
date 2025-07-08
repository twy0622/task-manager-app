package com.learnspring.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.learnspring.dto.CountType;
import com.learnspring.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
    
    // native query
    @Query(value="Select * from task order by due_date desc", nativeQuery = true)
    public List<Task> getAllTaskDueDateDesc();

    // custom JPA query
    @Query(value="SELECT new com.learnspring.dto.CountType(COUNT(*)/(SELECT COUNT(*) FROM Task) * 100, type) FROM Task GROUP BY type")
    public List<CountType> getPercentageGroupByType();
}
