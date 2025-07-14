package com.spring.project.dto.post;

public class PostCategoryDTO {
	
	int category_id;
	String category_name;
	String category_color;
	
	public int getCategory_id() {
		return category_id;
	}
	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}
	public String getCategory_name() {
		return category_name;
	}
	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}
	public String getCategory_color() {
		return category_color;
	}
	public void setCategory_color(String category_color) {
		this.category_color = category_color;
	}
	
	@Override
    public String toString() {
        return "PostCategoryDTO{" +
                "category_id=" + category_id +
                ", category_name='" + category_name + '\'' +
                ", category_color='" + category_color + '\'' +
                '}';
	}
}
