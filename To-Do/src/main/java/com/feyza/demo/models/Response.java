package com.feyza.demo.models;

public class Response {

	private String error;
	private String message;
	private Object object;
	
	public Response() {
		super();
	}
	
	
	
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Object getObject() {
		return object;
	}
	public void setObject(Object object) {
		this.object = object;
	}
	
	
}
