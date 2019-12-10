package com.feyza.demo.controller;


import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ReactiveAdapter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.feyza.demo.dao.TaskDAO;
import com.feyza.demo.models.Response;
import com.feyza.demo.models.Task;


@RestController
@RequestMapping("tasks")
public class RestTaskController {

	@Autowired
	TaskDAO repo;
	
	/*
	@GetMapping("all")
	public ResponseEntity<?> getAllTasks(){
		Response response = new Response();
		response.setObject(repo.findAll());
		return ResponseEntity.ok(response);
	}
	*/
	/*
	@PostMapping("save")
	public Task newTask(@RequestBody Task task) {
		task.setCreationDate(new Date());
		if (task.compare(task.getDueDate()) == true) {
			task.setDueDate(new Date());
		}
		return repo.save(task);
	}
	*/
	
	
	@PostMapping()
	public ResponseEntity<?> newTask(@RequestBody Task task) {
		Response response = new Response();
		if(!task.getName().isEmpty()) {
		task.setCreationDate(new Date());
		if (task.compare(task.getDueDate()) == true) {
			response.setMessage("Data scadenza non valida");
			return ResponseEntity.badRequest().body(response);
		}
		repo.save(task);
		response.setMessage("Task creato con successo");
		return ResponseEntity.ok(response);
		}else {
			response.setMessage("Il campo nome non può essere vuoto");
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	@GetMapping()
	public List<Task> updateTask(){
		return repo.findAll();
	}
	
	
	@PutMapping()
	public Task updateTask(@RequestBody Task task) {
		return repo.save(task);
	}
	
	@DeleteMapping("{id}")
	public void deleteTask(@PathVariable("id") int id) {
		repo.deleteById(id);
	}
	
	@GetMapping("{id}")
	public Optional<Task> deleteTaskById(@PathVariable("id") int id) {
		return repo.findById(id);
	}
	
	
	}		
		
	
	
	

