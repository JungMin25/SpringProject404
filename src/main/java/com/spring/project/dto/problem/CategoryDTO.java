package com.spring.project.dto.problem;

public class CategoryDTO {
	
	private Integer category_id;
    private String category_name;
    private String description;
    
	public Integer getCategoryId() {
		return category_id;
	}
	public void setCategoryId(Integer category_id) {
		this.category_id = category_id;
	}
	public String getCategoryName() {
		return category_name;
	}
	public void setCategoryName(String category_name) {
		this.category_name = category_name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	@Override
	public String toString() {
	    return "CategoryDTO{" +
	            "category_id=" + category_id +
	            ", category_name='" + category_name + '\'' +
	            ", description='" + description + '\'' +
	            '}';
	}
	
}
