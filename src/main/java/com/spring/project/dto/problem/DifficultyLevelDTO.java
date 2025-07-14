package com.spring.project.dto.problem;

public class DifficultyLevelDTO {
	
	private Integer difficulty_id;
    private String difficulty_name;
    private Integer experience_reward;
    private String difficulty_color;
    
	public Integer getDifficultyId() {
		return difficulty_id;
	}
	public void setDifficultyId(Integer difficulty_id) {
		this.difficulty_id = difficulty_id;
	}
	public String getDifficultyName() {
		return difficulty_name;
	}
	public void setDifficultyName(String difficulty_name) {
		this.difficulty_name = difficulty_name;
	}
	public Integer getExperienceReward() {
		return experience_reward;
	}
	public void setExperienceReward(Integer experience_reward) {
		this.experience_reward = experience_reward;
	}
	public String getDifficultyColor() {
		return difficulty_color;
	}
	public void setDifficultyColor(String difficulty_color) {
		this.difficulty_color = difficulty_color;
	}
	@Override
	public String toString() {
	    return "DifficultyLevelDTO{" +
	            "difficulty_id=" + difficulty_id +
	            ", difficulty_name='" + difficulty_name + '\'' +
	            ", experience_reward=" + experience_reward +
	            ", difficulty_color='" + difficulty_color + '\'' +
	            '}';
	}
}
