package com.spring.project.repository;

import java.util.ArrayList;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.project.dto.exam.ExamAnswerDetailDTO;
import com.spring.project.dto.exam.ExamDTO;
import com.spring.project.dto.exam.ExamProblemDTO;
import com.spring.project.dto.exam.ExamSubmissionDTO;
import com.spring.project.dto.problem.CategoryDTO;
import com.spring.project.dto.problem.DifficultyLevelDTO;
import com.spring.project.dto.problem.ProblemDTO;

@Repository
public class ExamRepository {
	
	@Autowired
	SqlSessionTemplate mybatis;
	
	public ExamSubmissionDTO getExamSubCount() {
		return mybatis.selectOne("examRepository.getExamSubCount");
	}
	
	public List<ExamDTO> getExamTitle(){
		return mybatis.selectList("examRepository.getExamTitle");
	}
	
	public List<ExamProblemDTO> getExamProblemIds(ExamDTO vo) {
		return mybatis.selectList("examRepository.getExamProblemIds", vo);
	}
	
	public ProblemDTO getExamProblemInfo(ExamProblemDTO vo) {
		
		
		vo = mybatis.selectOne("examRepository.getExamProblemInfo", vo);
		return mybatis.selectOne("examRepository.getExamProblem", vo);
		
		
	}
	
	public ProblemDTO getProblemCorrect(long p_id) {
		
		return mybatis.selectOne("examRepository.getExamProblem", p_id);
		
	}
	
	public void insertExamAnswer(ExamAnswerDetailDTO examAnswerDTO) {
		
		mybatis.insert("examRepository.insertExamAnswer", examAnswerDTO);
		
	}
	
	public ExamSubmissionDTO insertExamSubId(long user_id, long exam_id) {
		
		ExamSubmissionDTO dto = new ExamSubmissionDTO();
		dto.setUser_id(user_id);
		dto.setExam_id(exam_id);
		
		
		
		mybatis.insert("examRepository.insertExamSubmission", dto);
		
		return dto;
		
	}
	
	public List<ExamAnswerDetailDTO> getExamAnswerDetails(long examSubId){
		return mybatis.selectList("examRepository.getExamAnswerDetails", examSubId);
	}
	
	public ExamSubmissionDTO getExamAnswerCorrect(long examSubId) {
		return mybatis.selectOne("examRepository.getExamAnswerCorrect", examSubId);
	}
	
	public List<ProblemDTO> getProblemInfo(List<ExamAnswerDetailDTO> examAnsDetailList){
		
		List<ProblemDTO> problemList = new ArrayList<ProblemDTO>();
		
		for(ExamAnswerDetailDTO dto : examAnsDetailList) {
			if(dto.getProblem_id() != null) {
				problemList.add(mybatis.selectOne("examRepository.getExamProblem", dto.getProblem_id()));
			}
		}
		return problemList;
	}
	
	public List<DifficultyLevelDTO> getProblemDifInfo(List<ProblemDTO> problemInfoList){
		
		List<DifficultyLevelDTO> difList = new ArrayList<DifficultyLevelDTO>();
		
		for(ProblemDTO dto : problemInfoList) {
			if(dto.getDifficulty_id() != null) {
				difList.add(mybatis.selectOne("examRepository.getProblemDif", dto.getDifficulty_id()));
			}
		}
		return difList;
		
	}
	
public List<CategoryDTO> getProblemCatInfo(List<ProblemDTO> problemInfoList){
		
		List<CategoryDTO> catList = new ArrayList<CategoryDTO>();
		
		for(ProblemDTO dto : problemInfoList) {
			if(dto.getCategory_id() != null) {
				catList.add(mybatis.selectOne("examRepository.getProblemCat", dto.getCategory_id()));
			}
		}
		return catList;
		
	}

public List<ProblemDTO> getproblemInfoList() {
	return mybatis.selectList("examRepository.getproblemInfoList");
}
	
public ExamDTO insertExam(ExamDTO vo) {
	mybatis.insert("examRepository.insertExam", vo);
	return vo;
}

public void insertExamProblem(List<Long> selectedProblems, ExamDTO exam_id) {
	
	long exam_problem_id = 1;
	
	
	for(long problem_id : selectedProblems) {
		
		ExamProblemDTO vo = new ExamProblemDTO();
		
		if(exam_problem_id <= 10) {
			vo.setExam_problem_id(exam_problem_id);
			vo.setProblem_id(problem_id);
			vo.setExam_id(exam_id.getExam_id());
			mybatis.insert("examRepository.insertExamProblem", vo);
		}
		
		exam_problem_id ++;
	}

}

public void deleteExam(ExamDTO vo) {
	
	mybatis.delete("examRepository.deleteExamProblem", vo);
	mybatis.delete("examRepository.deleteExam", vo);
}
	
	
}
