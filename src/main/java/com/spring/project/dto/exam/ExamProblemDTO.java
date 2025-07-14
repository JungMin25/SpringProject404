	package com.spring.project.dto.exam;
	
	public class ExamProblemDTO {
		
		private Long exam_id;
	    private Long exam_problem_id;
	    private Long problem_id;
	    
	    
		public Long getExam_id() {
			return exam_id;
		}
		public Long getExam_problem_id() {
			return exam_problem_id;
		}
		public Long getProblem_id() {
			return problem_id;
		}
		public void setExam_id(Long exam_id) {
			this.exam_id = exam_id;
		}
		public void setExam_problem_id(Long exam_problem_id) {
			this.exam_problem_id = exam_problem_id;
		}
		public void setProblem_id(Long problem_id) {
			this.problem_id = problem_id;
		}
	    
		@Override
		public String toString() {
		    return "ExamProblemDTO{" +
		            "exam_id=" + exam_id +
		            ", exam_problem_id=" + exam_problem_id +
		            ", problem_id=" + problem_id +
		            '}';
		}
	}
