package com.spring.project.service;

import java.util.List;
import java.util.Map;

import com.spring.project.dto.problem.CategoryDTO;
import com.spring.project.dto.problem.DifficultyLevelDTO;
import com.spring.project.dto.problem.ProblemDTO;
import com.spring.project.dto.problem.ProblemSubMissionDTO;
import com.spring.project.dto.user.UserDTO;
import com.spring.project.dto.user.UserGradeDTO;

public interface ProblemService {
	
	//문제 리스트 불러오기
	public List<ProblemDTO> getProblemList(Map<String, Object> condition);	
	
	public int getProblemCount(Map<String, Object> condition);
	
	public List<DifficultyLevelDTO> getProblemDif(List<ProblemDTO> difficulty_ids);
    
	public List<CategoryDTO> getProblemCat(List<ProblemDTO> category_ids);
	
	public  List<ProblemDTO> getSortedProblemList(Map<String, Object> condition);

	public List<ProblemSubMissionDTO> getCorrectRate(List<ProblemDTO> problem_ids);
	
	//문제 등록
	public void insertProblem(ProblemDTO vo);
	
	//문제 상세
	public Map<String, Object> getProblemInfo(ProblemDTO vo);
	
	//문제 제출
	public ProblemSubMissionDTO problemSubInsertAndSelect(Long user_id, ProblemDTO problem_id, String executionResult);

	// JavaScript에서 검증을 완료한 코드를 처리하는 메소드
	public ProblemSubMissionDTO problemSubInsertAndSelectWithCode(Long user_id, ProblemDTO problem_id, String submittedCode, boolean isCorrect);

	public UserDTO userSetLevel(ProblemSubMissionDTO problemSubDTO);
	
	public UserGradeDTO getUserGrade(UserDTO vo);
	
	public void updateProblem(ProblemDTO vo);
	
	public List<Integer> getProblemPlayCount(List<ProblemDTO> problemList);
	
}
