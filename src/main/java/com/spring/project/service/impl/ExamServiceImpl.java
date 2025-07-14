package com.spring.project.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.project.dto.exam.ExamAnswerDetailDTO;
import com.spring.project.dto.exam.ExamDTO;
import com.spring.project.dto.exam.ExamProblemDTO;
import com.spring.project.dto.exam.ExamSubmissionDTO;
import com.spring.project.dto.problem.ProblemDTO;
import com.spring.project.repository.ExamRepository;
import com.spring.project.service.ExamService;

@Service("examService")
public class ExamServiceImpl implements ExamService {
	
	@Autowired
	ExamRepository examRepository;
	
	@Override
	public ExamSubmissionDTO getExamSubCount() {
		
		return examRepository.getExamSubCount();
	}

	@Override
	public List<ExamDTO> getExamTitle() {

		return examRepository.getExamTitle();
	}

	@Override
	public ProblemDTO getExamProblemInfo(ExamProblemDTO vo) {
		
		
		return examRepository.getExamProblemInfo(vo);
	}

	@Override
	public boolean correctChk(long p_id, String correctCode) {

		ProblemDTO problemCorrect = new ProblemDTO();
		
		problemCorrect = examRepository.getProblemCorrect(p_id);
		
		// 정답 결과로 검증
		String problemCorrectAnswer = problemCorrect.getCorrect_answer();
		
		if(problemCorrectAnswer == null || correctCode == null) return false;
		
		String normalizedProblemCorrectAnswer = problemCorrectAnswer.replaceAll("\\s+", "").toLowerCase();
		String normalizedCorrectCode = correctCode.replaceAll("\\s", "").toLowerCase();
		
		// 정답 결과와 비교
		boolean resultMatch = normalizedProblemCorrectAnswer.equals(normalizedCorrectCode);
		
		// 정답 코드와 비교 (추가 검증)
		String problemCorrectCodeAnswer = problemCorrect.getCorrect_answer_code();
		if (problemCorrectCodeAnswer != null) {
			String normalizedProblemCorrectCode = problemCorrectCodeAnswer.replaceAll("\\s+", "").toLowerCase();
			boolean codeMatch = normalizedProblemCorrectCode.equals(normalizedCorrectCode);
			
			// 결과 매칭 또는 코드 매칭 중 하나라도 일치하면 정답
			return resultMatch || codeMatch;
		}
		
		return resultMatch;
	}

	@Override
	public void insertExamAnswer(ExamAnswerDetailDTO examAnswerDTO) {
		
		examRepository.insertExamAnswer(examAnswerDTO);
		
	}
	
	public ExamSubmissionDTO insertExamSubId(long user_id, long exam_id) {
		
		return examRepository.insertExamSubId(user_id, exam_id);
		
	}

	@Override
	public List<ExamAnswerDetailDTO> getExamAnswerDetails(long examSubId) {
		
		return examRepository.getExamAnswerDetails(examSubId);
	}

	@Override
	public ExamSubmissionDTO getExamAnswerCorrect(long examSubId) {
		
		return examRepository.getExamAnswerCorrect(examSubId);
	}

	@Override
	public Map<String, Object> getExamProblemInfoList(List<ExamAnswerDetailDTO> examAnsDetailList) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		List<ProblemDTO> problemInfoList = new ArrayList<ProblemDTO>();
		//ProblemDTO
		problemInfoList = examRepository.getProblemInfo(examAnsDetailList);
		map.put("problemInfoList", problemInfoList);
		//DifficultyDTO
		map.put("problemDifficultyList", examRepository.getProblemDifInfo(problemInfoList));
		//CategoryDTO
		map.put("problemCategoryList", examRepository.getProblemCatInfo(problemInfoList));
		
		return map;
		
	}

	@Override
	public List<ProblemDTO> getproblemInfoList() {
		
		return examRepository.getproblemInfoList();
	}

	@Override
	public ExamDTO insertExam(ExamDTO vo) {
		
		return examRepository.insertExam(vo);
		
	}

	@Override
	public void insertExamProblem(List<Long> selectedProblems, ExamDTO exam_id) {
		
		examRepository.insertExamProblem(selectedProblems, exam_id);
		
	}

	@Override
	public void deleteExam(ExamDTO vo) {
		
		examRepository.deleteExam(vo);
		
	}
	
	
	
	
	
	


	
	
	
}
