package com.spring.project.service;

import java.util.List;
import java.util.Map;

import com.spring.project.dto.exam.ExamAnswerDetailDTO;
import com.spring.project.dto.exam.ExamDTO;
import com.spring.project.dto.exam.ExamProblemDTO;
import com.spring.project.dto.exam.ExamSubmissionDTO;
import com.spring.project.dto.problem.ProblemDTO;

public interface ExamService {
	
	public ExamSubmissionDTO getExamSubCount();
	
	public List<ExamDTO> getExamTitle();
	
	
	//exam_play
	public ProblemDTO getExamProblemInfo(ExamProblemDTO vo);
	
	public boolean correctChk(long p_id, String correctCode);
	
	public void insertExamAnswer(ExamAnswerDetailDTO examAnswerDTO);
	
	public ExamSubmissionDTO insertExamSubId(long user_id, long exam_id);
	
	//exam_finish
	public List<ExamAnswerDetailDTO> getExamAnswerDetails(long examSubId);
	
	public ExamSubmissionDTO getExamAnswerCorrect(long examSubId);
	
	public Map<String, Object> getExamProblemInfoList(List<ExamAnswerDetailDTO> examAnsDetailList);
	
	//exam_insert
	public List<ProblemDTO> getproblemInfoList();
	
	public ExamDTO insertExam(ExamDTO vo);
	
	public void insertExamProblem(List<Long> selectedProblems, ExamDTO exam_id);
	
	public void deleteExam(ExamDTO vo);
}
