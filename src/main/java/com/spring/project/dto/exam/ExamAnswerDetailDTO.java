package com.spring.project.dto.exam;

public class ExamAnswerDetailDTO {
	
	private Long answer_detail_id;
    private Long exam_problem_id;
    private Long problem_id;
    private String submitted_answer;
    private Boolean is_correct;
    private Long exam_submission_id;
    
	public Long getAnswer_detail_id() {
		return answer_detail_id;
	}
	public Long getExam_problem_id() {
		return exam_problem_id;
	}
	public Long getProblem_id() {
		return problem_id;
	}
	public String getSubmitted_answer() {
		return submitted_answer;
	}
	public Boolean getIs_correct() {
		return is_correct;
	}
	public void setAnswer_detail_id(Long answer_detail_id) {
		this.answer_detail_id = answer_detail_id;
	}
	public void setExam_problem_id(Long exam_problem_id) {
		this.exam_problem_id = exam_problem_id;
	}
	public void setProblem_id(Long problem_id) {
		this.problem_id = problem_id;
	}
	public void setSubmitted_answer(String submitted_answer) {
		this.submitted_answer = submitted_answer;
	}
	public void setIs_correct(Boolean is_correct) {
		this.is_correct = is_correct;
	}

	public Long getExam_submission_id() {
		return exam_submission_id;
	}
	public void setExam_submission_id(Long exam_submission_id) {
		this.exam_submission_id = exam_submission_id;
	}
	@Override
	public String toString() {
	    return "ExamAnswerDetailDTO{" +
	            "answer_detail_id=" + answer_detail_id +
	            ", exam_problem_id=" + exam_problem_id +
	            ", problem_id=" + problem_id +
	            ", submitted_answer='" + submitted_answer + '\'' +
	            ", is_correct=" + is_correct +
	            ", exam_submission_id" + exam_submission_id +
	            '}';
	}
    
	
}
