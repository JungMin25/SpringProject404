package com.spring.project.dto.exam;

public class ExamDTO {
	
	private Long exam_id;
    private String exam_title;
    private String description;
	public Long getExam_id() {
		return exam_id;
	}
	public String getExam_title() {
		return exam_title;
	}
	public String getDescription() {
		return description;
	}
	public void setExam_id(Long exam_id) {
		this.exam_id = exam_id;
	}
	public void setExam_title(String exam_title) {
		this.exam_title = exam_title;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	@Override
	public String toString() {
		return "ExamDTO{" +
				"exam_id=" + exam_id +
				", exam_title='" + exam_title + '\'' +
				", description='" + description + '\'' +
				'}';
	}
	
}
