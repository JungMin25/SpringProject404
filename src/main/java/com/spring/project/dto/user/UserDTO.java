package com.spring.project.dto.user;

public class UserDTO {
	
	private Long user_id;
    private String username;
    private String password;
    private String nickname;
    private String user_type;
    private int grade_id;
    private int experience_points;
    private String created_at;
    private String updated_at;
    private String email;
    
    
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Long getUser_id() {
		return user_id;
	}
	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getUser_type() {
		return user_type;
	}
	public void setUser_type(String user_type) {
		this.user_type = user_type;
	}
	public int getGrade_id() {
		return grade_id;
	}
	public void setGrade_id(int grade_id) {
		this.grade_id = grade_id;
	}
	public int getExperience_points() {
		return experience_points;
	}
	public void setExperience_points(int experience_points) {
		this.experience_points = experience_points;
	}
	public String getCreated_at() {
		return created_at;
	}
	public void setCreated_at(String created_at) {
		this.created_at = created_at;
	}
	public String getUpdated_at() {
		return updated_at;
	}
	public void setUpdated_at(String updated_at) {
		this.updated_at = updated_at;
	}
    
	@Override
	public String toString() {
		return "UserDTO{" +
				"user_id=" + user_id +
				", username='" + username + '\'' +
				", password='" + password + '\'' +
				", nickname='" + nickname + '\'' +
				", user_type='" + user_type + '\'' +
				", grade_id=" + grade_id +
				", experience_points=" + experience_points +
				", created_at='" + created_at + '\'' +
				", updated_at='" + updated_at + '\'' +
				'}';
	}
	
    
	
}
