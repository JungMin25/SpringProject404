package com.spring.project.dto.post;

public class PostCommentDTO {
	
	private Long comment_id;
    private Long post_id;
    private Long user_id;
    private String content;
    private String created_at;
    
	public Long getComment_id() {
		return comment_id;
	}
	public Long getPost_id() {
		return post_id;
	}
	public Long getUser_id() {
		return user_id;
	}
	public String getContent() {
		return content;
	}
	public String getCreated_at() {
		return created_at;
	}
	public void setComment_id(Long comment_id) {
		this.comment_id = comment_id;
	}
	public void setPost_id(Long post_id) {
		this.post_id = post_id;
	}
	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public void setCreated_at(String created_at) {
		this.created_at = created_at;
	}
	@Override
	public String toString() {
	    return "PostCommentDTO{" +
	            "comment_id=" + comment_id +
	            ", post_id=" + post_id +
	            ", user_id=" + user_id +
	            ", content='" + content + '\'' +
	            ", created_at='" + created_at + '\'' +
	            '}';
	}
    
}
