package com.spring.project.dto.problem;

public class ProblemSubMissionDTO {
	
	private Long submission_id;
    private Long user_id;
    private Long problem_id;
    private String submitted_code;
    private Boolean is_correct;
    private Integer attempt_count;
    private String submitted_at;
    private Integer earned_experience;
    
    private Integer total_submissions; // 제출 수
    private Integer correct_submissions; //정답 수
    private double correct_rate; //정답률
   
	
	public Long getSubmission_id() {
		return submission_id;
	}


	public Long getUser_id() {
		return user_id;
	}


	public Long getProblem_id() {
		return problem_id;
	}


	public String getSubmitted_code() {
		return submitted_code;
	}


	public Boolean getIs_correct() {
		return is_correct;
	}


	public Integer getAttempt_count() {
		return attempt_count;
	}


	public String getSubmitted_at() {
		return submitted_at;
	}


	public Integer getEarned_experience() {
		return earned_experience;
	}


	public Integer getTotal_submissions() {
		return total_submissions;
	}


	public Integer getCorrect_submissions() {
		return correct_submissions;
	}


	public double getCorrect_rate() {
		return correct_rate;
	}


	public void setSubmission_id(Long submission_id) {
		this.submission_id = submission_id;
	}


	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}


	public void setProblem_id(Long problem_id) {
		this.problem_id = problem_id;
	}


	public void setSubmitted_code(String submitted_code) {
		this.submitted_code = submitted_code;
	}


	public void setIs_correct(Boolean is_correct) {
		this.is_correct = is_correct;
	}


	public void setAttempt_count(Integer attempt_count) {
		this.attempt_count = attempt_count;
	}


	public void setSubmitted_at(String submitted_at) {
		this.submitted_at = submitted_at;
	}


	public void setEarned_experience(Integer earned_experience) {
		this.earned_experience = earned_experience;
	}


	public void setTotal_submissions(Integer total_submissions) {
		this.total_submissions = total_submissions;
	}


	public void setCorrect_submissions(Integer correct_submissions) {
		this.correct_submissions = correct_submissions;
	}


	public void setCorrect_rate(double correct_rate) {
		this.correct_rate = correct_rate;
	}


	@Override
	public String toString() {
	    return "ProblemSubMissionDTO{" +
	            "submissionId=" + submission_id +
	            ", userId=" + user_id +
	            ", problem_id=" + problem_id +
	            ", submittedCode='" + submitted_code + '\'' +
	            ", is_correct=" + is_correct +
	            ", attemptCount=" + attempt_count +
	            ", submittedAt='" + submitted_at + '\'' +
	            ", earnedExperience=" + earned_experience +
	            ", total_submissions=" + total_submissions +
	            ", correct_submissions=" + correct_submissions +
	            ", correct_rate=" + correct_rate +
	            '}';
	}
}
