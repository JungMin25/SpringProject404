package com.spring.project.dto.exam;

public class ExamSubmissionDTO {
	
	private Long exam_submission_id;
    private Long user_id;
    private Long exam_id;
    private int correct_count;
    private int wrong_count;
    private boolean is_passed;
    
    
    private Integer total_submissions; // 제출된 시험 수
    private Integer passed_count; // 통과 시험 수
    private Double pass_rate_percent; // 합격률
    private Double correct_percent; // 정답률
    
	public Long getExam_submission_id() {
		return exam_submission_id;
	}
	public Long getUser_id() {
		return user_id;
	}
	public Long getExam_id() {
		return exam_id;
	}
	public void setExam_submission_id(Long exam_submission_id) {
		this.exam_submission_id = exam_submission_id;
	}
	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}
	public void setExam_id(Long exam_id) {
		this.exam_id = exam_id;
	}
	public Integer getTotal_submissions() {
		return total_submissions;
	}
	public Integer getPassed_count() {
		return passed_count;
	}
	public Double getPass_rate_percent() {
		return pass_rate_percent;
	}
	public void setTotal_submissions(Integer total_submissions) {
		this.total_submissions = total_submissions;
	}
	public void setPassed_count(Integer passed_count) {
		this.passed_count = passed_count;
	}
	public void setPass_rate_percent(Double pass_rate_percent) {
		this.pass_rate_percent = pass_rate_percent;
	}
	
	public Double getCorrect_persent() {
		return correct_percent;
	}
	public void setCorrect_persent(Double correct_percent) {
		this.correct_percent = correct_percent;
	}
	public int getCorrect_count() {
		return correct_count;
	}
	public int getWrong_count() {
		return wrong_count;
	}
	public boolean isIs_passed() {
		return is_passed;
	}
	public void setCorrect_count(int correct_count) {
		this.correct_count = correct_count;
	}
	public void setWrong_count(int wrong_count) {
		this.wrong_count = wrong_count;
	}
	public void setIs_passed(boolean is_passed) {
		this.is_passed = is_passed;
	}
	@Override
	public String toString() {
	    return "ExamSubmissionDTO{" +
	            "exam_submission_id=" + exam_submission_id +
	            ", user_id=" + user_id +
	            ", exam_id=" + exam_id +
	            ", correct_count='" + correct_count + '\'' +
	            ", wrong_count=" + wrong_count +
	            ", is_passed=" + is_passed +
	            ", total_submissions=" + total_submissions +
	            ", passed_count=" + passed_count +
	            ", pass_rate_percent=" + pass_rate_percent +
	            ", correct_persent=" + correct_percent +
	            '}';
	}
}
