package com.spring.project.dto.post;

import java.sql.Date;

public class PostDTO {
	
	private Long post_id;
    private Long user_id;
    private String title;
    private String content;
    private Long view_count;
    private Date created_at;
    private Integer category_id;
    
    private Long post_comment_count; // 댓글수
    
	public Long getPost_id() {
		return post_id;
	}
	public void setPost_id(Long post_id) {
		this.post_id = post_id;
	}
	public Long getUser_id() {
		return user_id;
	}
	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Long getView_count() {
		return view_count;
	}
	public void setView_count(Long view_count) {
		this.view_count = view_count;
	}
	public Date getCreated_at() {
		return created_at;
	}
	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}
	public Integer getCategory_id() {
		return category_id;
	}
	public void setCategory_id(Integer category_id) {
		this.category_id = category_id;
	}
    
	 public Long getPost_comment_count() {
		return post_comment_count;
	}
	public void setPost_comment_count(Long post_comment_count) {
		this.post_comment_count = post_comment_count;
	}
	@Override
	    public String toString() {
	        return "PostDTO{" +
	                "post_id=" + post_id +
	                ", user_id=" + user_id +
	                ", title='" + title + '\'' +
	                ", content='" + content + '\'' +
	                ", view_count=" + view_count +
	                ", created_at=" + created_at +
	                ", category_id=" + category_id +
	                '}';
	    }
	
}
