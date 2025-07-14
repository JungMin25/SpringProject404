package com.spring.project.dto.problem;

public class ProblemDTO {
	
	private Long problem_id;
    private String title;
    private String description;
    private String hint;
    private String explanation;
    private String correct_answer;
    private String correct_answer_code;
    private Integer difficulty_id;
    private Integer category_id;
    private String created_at;
    private Integer solve_count;
    private Integer correct_count;
    
	public Long getProblem_id() {
		return problem_id;
	}
	public void setProblem_id(Long problem_id) {
		this.problem_id = problem_id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getHint() {
		return hint;
	}
	public void setHint(String hint) {
		this.hint = hint;
	}
	public String getExplanation() {
		return explanation;
	}
	public void setExplanation(String explanation) {
		this.explanation = explanation;
	}
	public String getCorrect_answer() {
		return correct_answer;
	}
	public void setCorrect_answer(String correct_answer) {
		this.correct_answer = correct_answer;
	}
	public String getCorrect_answer_code() {
		return correct_answer_code;
	}
	public void setCorrect_answer_code(String correct_answer_code) {
		this.correct_answer_code = correct_answer_code;
	}
	public Integer getDifficulty_id() {
		return difficulty_id;
	}
	public void setDifficulty_id(Integer difficulty_id) {
		this.difficulty_id = difficulty_id;
	}
	public Integer getCategory_id() {
		return category_id;
	}
	public void setCategory_id(Integer category_id) {
		this.category_id = category_id;
	}
	public String getCreated_at() {
		return created_at;
	}
	public void setCreated_at(String created_at) {
		this.created_at = created_at;
	}
	public Integer getSolve_count() {
		return solve_count;
	}
	public void setSolve_count(Integer solve_count) {
		this.solve_count = solve_count;
	}
	public Integer getCorrect_count() {
		return correct_count;
	}
	public void setCorrect_count(Integer correct_count) {
		this.correct_count = correct_count;
	}
	@Override
	public String toString() {
	    return "ProblemDTO{" +
	            "problem_id=" + problem_id +
	            ", title='" + title + '\'' +
	            ", description='" + description + '\'' +
	            ", hint='" + hint + '\'' +
	            ", explanation='" + explanation + '\'' +
	            ", correct_answer='" + correct_answer + '\'' +
	            ", correct_answer_code='" + correct_answer_code + '\'' +
	            ", difficulty_id=" + difficulty_id +
	            ", category_id=" + category_id +
	            ", created_at='" + created_at + '\'' +
	            ", solve_count=" + solve_count +
	            ", correct_count=" + correct_count +
	            '}';
	}
	
}
