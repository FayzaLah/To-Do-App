package com.feyza.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.feyza.demo.models.Task;

public interface TaskDAO extends JpaRepository<Task, Integer> {

}
