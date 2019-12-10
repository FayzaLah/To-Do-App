package com.feyza.demo.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;

import org.springframework.lang.NonNull;


@Entity
public class Task {

	@Id
	@GeneratedValue
	private int id; 
	
	@NonNull
	@NotBlank(message = "name can't empty!")
	private String name;
	
	private String description;
	
	@Temporal(TemporalType.DATE)
	private Date dueDate;
	
	@NonNull
	@Temporal(TemporalType.DATE)
	private Date creationDate;
	
	
	public Task() {
		super();
	}
	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}


	public boolean compare(Date dueDate) {
		if(dueDate.compareTo(creationDate) < 0)
			return true;
		return false;
	}
	
}
