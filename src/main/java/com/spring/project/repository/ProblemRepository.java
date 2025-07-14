package com.spring.project.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.project.dto.problem.CategoryDTO;
import com.spring.project.dto.problem.DifficultyLevelDTO;
import com.spring.project.dto.problem.ProblemDTO;
import com.spring.project.dto.problem.ProblemSubMissionDTO;
import com.spring.project.dto.user.UserDTO;
import com.spring.project.dto.user.UserGradeDTO;

@Repository
public class ProblemRepository {
	
	@Autowired
	SqlSessionTemplate mybatis;
	
	
	//문제 리스트
	 public List<ProblemDTO> findProblems(Map<String, Object> condition) {
		 	return mybatis.selectList("problemRepository.getSortedProblemList", condition);   
	    } 
	    
	    
	    public int countProblems(Map<String, Object> condition) {
	    	return mybatis.selectOne("problemRepository.countProblems", condition);
	    }
	    
	    public List<DifficultyLevelDTO> getProblemLevel(List<ProblemDTO> difficulty_ids){
	    	
	    	List<DifficultyLevelDTO> difficultyNameList = new ArrayList<DifficultyLevelDTO>();
	    	
	    	for(ProblemDTO difficulty_id : difficulty_ids) {
	    		
	    		if(difficulty_id.getDifficulty_id() != null) {
	    			difficultyNameList.add(mybatis.selectOne("problemRepository.getProblemLevel", difficulty_id.getDifficulty_id()));
	    		}
	    		
	    	}    	
	    	return difficultyNameList;
	    	
	    }
	    public List<CategoryDTO> getCategoryLevel(List<ProblemDTO> category_ids){
	    	
	    	List<CategoryDTO> categoryNameList = new ArrayList<CategoryDTO>();
	    	
	    	for(ProblemDTO category_id : category_ids) {
	    		if(category_id.getCategory_id() != null) {
	    			categoryNameList.add(mybatis.selectOne("problemRepository.getCategoryLevel", category_id.getCategory_id()));
	    			
	    		}
	    	}
	    	return categoryNameList;
	    }

	
	    public List<ProblemSubMissionDTO> getCorrectRate(List<ProblemDTO> problem_ids){
	    	
	    	List<ProblemSubMissionDTO> correctRateList = new ArrayList<ProblemSubMissionDTO>();
	    	
	    	for(ProblemDTO problem_id : problem_ids) {
	    		if(problem_id.getProblem_id() != null) {
	    			correctRateList.add(mybatis.selectOne("problemRepository.getCorrectRate", problem_id.getProblem_id()));
	    		}
	    	}
	    	return correctRateList;
	    }
	    public List<ProblemDTO> getSortedProblemList (Map<String, Object> condition) {    	
	    	
	    	return mybatis.selectList("problemRepository.getSortedProblemList", condition);
			
		}
	    
	//문제등록
	public void insertProblem(ProblemDTO vo) {
		
		mybatis.insert("problemRepository.insertProblem", vo);
		
	}
	
	//문제상세
	public ProblemDTO getOneProblemInfo(ProblemDTO vo) {
		
		return mybatis.selectOne("problemRepository.getOneProblemInfo", vo);
		
	}
	public DifficultyLevelDTO getOneProblemDif(ProblemDTO vo) {
		
		return mybatis.selectOne("problemRepository.getOneProblemDif", vo);
		
	}
	public CategoryDTO getOneProblemCat(ProblemDTO vo) {
		
		return mybatis.selectOne("problemRepository.getOneProblemCat", vo);
		
	}
	
	//문제 제출
	public boolean isCorrectResult(String executionResult, String problemCorrectAnswer) {
		
		if(executionResult == null || problemCorrectAnswer == null)return false;
			
		String normailzedExecutionResult = executionResult.replaceAll("\\s+", "").toLowerCase();
		String normailzedProblemCorrectAnswer = problemCorrectAnswer.replaceAll("\\s", "").toLowerCase();
		
		return normailzedExecutionResult.equals(normailzedProblemCorrectAnswer);
	}
	
	public ProblemSubMissionDTO insertProblemSub(Long user_id, ProblemDTO problem_id, String executionResult,  boolean isCorrect, int attempt) {
		
		ProblemSubMissionDTO problemSubDTO = new ProblemSubMissionDTO();
		
		problemSubDTO.setUser_id(user_id);
		problemSubDTO.setProblem_id(problem_id.getProblem_id());
		problemSubDTO.setSubmitted_code(executionResult);
		problemSubDTO.setIs_correct(isCorrect);
		problemSubDTO.setAttempt_count(attempt);
		
		
		mybatis.insert("problemRepository.insertProblemSub", problemSubDTO);
		
		
		
		return mybatis.selectOne("problemRepository.getProblemSubInfo", problemSubDTO.getSubmission_id());
		
	}
	
	public List<ProblemSubMissionDTO> userProblemSubChk(Long user_id, Long problem_id) {
		
		ProblemSubMissionDTO problemSubDTO = new ProblemSubMissionDTO();
		problemSubDTO.setUser_id(user_id);
		problemSubDTO.setProblem_id(problem_id);
		
		return mybatis.selectList("problemRepository.userProblemSubChk", problemSubDTO);
	}
	
	public UserDTO userSetLevel(ProblemSubMissionDTO problemSubDTO) {
		
		
		
		mybatis.update("problemRepository.userSetLevel", problemSubDTO);
		
		return mybatis.selectOne("problemRepository.selectOneUser", problemSubDTO);
		
	}
	
	public UserGradeDTO getUserGrade(UserDTO vo) {
		return mybatis.selectOne("problemRepository.selectOneUserGrade", vo);
	}
	
	public void updateProblem(ProblemDTO vo) {
		mybatis.update("problemRepository.updateProblem", vo);
	}
	
	public List<Integer> getProblemPlayCount(List<ProblemDTO> problemList){
		
		List<Integer> problemPlayCount = new ArrayList<Integer>();
		
		for(ProblemDTO dto : problemList) {
			problemPlayCount.add(mybatis.selectOne("problemRepository.getProblemPlayCount", dto.getProblem_id())); 
		}
		
		return problemPlayCount;
		
		
		
	}
	
	
	
}
