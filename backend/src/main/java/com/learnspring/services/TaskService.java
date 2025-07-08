package com.learnspring.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.learnspring.dto.CountType;
import com.learnspring.model.Task;
import com.learnspring.repositories.TaskRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TaskService {
    
    private TaskRepository taskRepository;

    @Transactional(readOnly = true)
    public List<Task> getTasks() {
        // return taskRepository.findAll();
        return taskRepository.getAllTaskDueDateDesc();
    }

    public Task save(Task task) {
        return taskRepository.saveAndFlush(task);
    }

    public boolean existById(Long id) {
        return taskRepository.existsById(id);
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public void delete(Long id) {
        taskRepository.deleteById(id);
    }

    public List<CountType> getPercentageGroupByType() {
        return taskRepository.getPercentageGroupByType();
    }
}
