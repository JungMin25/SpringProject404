package com.spring.project.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.project.dto.problem.CategoryDTO;
import com.spring.project.dto.problem.DifficultyLevelDTO;
import com.spring.project.dto.problem.ProblemDTO;
import com.spring.project.dto.problem.ProblemSubMissionDTO;
import com.spring.project.dto.user.UserDTO;
import com.spring.project.dto.user.UserGradeDTO;
import com.spring.project.repository.ProblemRepository;
import com.spring.project.service.ProblemService;

@Service("problemService")
public class ProblemServiceImpl implements ProblemService{

	
	
	
	@Autowired
	ProblemRepository problemRepository;
	
	Map<String, Object> map = new HashMap<String, Object>();
	
	
	
	//문제 리스트
	 @Override
	    public List<ProblemDTO> getProblemList(Map<String, Object> condition) {
	        List<ProblemDTO> result = problemRepository.getSortedProblemList(condition);
	        return result != null ? result : new java.util.ArrayList<>();
	    }

	@Override
	public int getProblemCount(Map<String, Object> condition) {		
		return problemRepository.countProblems(condition);
	}

	@Override
	public List<DifficultyLevelDTO> getProblemDif(List<ProblemDTO> difficulty_ids) {		
		return problemRepository.getProblemLevel(difficulty_ids);
	}

	@Override
	public List<CategoryDTO> getProblemCat(List<ProblemDTO> category_ids) {	
		return problemRepository.getCategoryLevel(category_ids);
	}	
	
	@Override
	public List<ProblemSubMissionDTO> getCorrectRate(List<ProblemDTO> problem_ids) {
		
		return problemRepository.getCorrectRate(problem_ids);
	}
	
	@Override
	public List<ProblemDTO> getSortedProblemList(Map<String, Object> condition) {		
		return problemRepository.getSortedProblemList(condition);
	}	
	
	//문제 등록
	@Override
	public void insertProblem(ProblemDTO vo) {
		
		problemRepository.insertProblem(vo);
		
	}
	
	//문제 상세
	@Override
	public Map<String, Object> getProblemInfo(ProblemDTO vo) {
		
		//문제정보
		ProblemDTO oneProblemInfo = problemRepository.getOneProblemInfo(vo);
		//문제난이도
		DifficultyLevelDTO oneProblemDif = problemRepository.getOneProblemDif(oneProblemInfo);
		//문제카테고리
		CategoryDTO oneProblemCat = problemRepository.getOneProblemCat(oneProblemInfo);
		
		map.put("oneProblemInfo", oneProblemInfo);
		map.put("oneProblemDif", oneProblemDif);
		map.put("oneProblemCat", oneProblemCat);
		
		
		return map;
	}

	@Override
	public ProblemSubMissionDTO problemSubInsertAndSelect(Long user_id, ProblemDTO problem_id, String executionResult) {
		
		boolean isCorrect;
		int attempt = 0;
		boolean isCorrectExcep;
		
		//문제정보 전체 불러오기
		ProblemDTO oneProblemInfo = problemRepository.getOneProblemInfo(problem_id);
		//문제에 해당하는 난이도 불러오기
		DifficultyLevelDTO oneProblemDif = problemRepository.getOneProblemDif(oneProblemInfo);
		//정답여부 판단
		String problemCorrectAnswer = oneProblemInfo.getCorrect_answer();
		//대소문자 공백 제거 후 정답여부 반환
		isCorrect = problemRepository.isCorrectResult(executionResult, problemCorrectAnswer);
		
		//경험치 획득 조정(현재 제출이 정답일때 경험치 지급 -> 전에 제출했던 정보가 있다면 false일떄만 지급
		List<ProblemSubMissionDTO> problemSubList = new ArrayList<ProblemSubMissionDTO>();
		problemSubList = problemRepository.userProblemSubChk(user_id, problem_id.getProblem_id());
		
		
	if(isCorrect == true) {
			
			attempt = oneProblemDif.getExperienceReward();
			
			for(ProblemSubMissionDTO dto : problemSubList) {
				if(dto.getIs_correct() == true) {
					attempt = 0;
				}
			}
		}
		
		
	
		
		
		
		//제출 DB저장
		ProblemSubMissionDTO problemSubInfo = problemRepository.insertProblemSub(user_id, problem_id, executionResult, isCorrect, attempt);
		System.out.println(problemSubInfo.toString());
		
		
		
		return problemSubInfo;
	}
	
	public UserDTO userSetLevel(ProblemSubMissionDTO problemSubInfo) {
		
		
		
		return problemRepository.userSetLevel(problemSubInfo);
		
	}

	@Override
	public UserGradeDTO getUserGrade(UserDTO vo) {

		return problemRepository.getUserGrade(vo);
	}

	@Override
	public void updateProblem(ProblemDTO vo) {
		
		problemRepository.updateProblem(vo);
		
	}

	// JavaScript에서 검증을 완료한 코드를 처리하는 메소드
	public ProblemSubMissionDTO problemSubInsertAndSelectWithCode(Long user_id, ProblemDTO problem_id, String submittedCode, boolean isCorrect) {
		
		int attempt = 0;
		
		//문제정보 전체 불러오기
		ProblemDTO oneProblemInfo = problemRepository.getOneProblemInfo(problem_id);
		//문제에 해당하는 난이도 불러오기
		DifficultyLevelDTO oneProblemDif = problemRepository.getOneProblemDif(oneProblemInfo);
		
		//경험치 획득 조정(현재 제출이 정답일때 경험치 지급 -> 전에 제출했던 정보가 있다면 false일떄만 지급
		List<ProblemSubMissionDTO> problemSubList = new ArrayList<ProblemSubMissionDTO>();
		problemSubList = problemRepository.userProblemSubChk(user_id, problem_id.getProblem_id());
		
		if(isCorrect == true) {
			attempt = oneProblemDif.getExperienceReward();
			
			for(ProblemSubMissionDTO dto : problemSubList) {
				if(dto.getIs_correct() == true) {
					attempt = 0;
				}
			}
		}
		
		//제출 DB저장 (submitted_code에는 전체 코드 저장)
		ProblemSubMissionDTO problemSubInfo = problemRepository.insertProblemSub(user_id, problem_id, submittedCode, isCorrect, attempt);
		System.out.println("JavaScript 검증 완료 코드 저장: " + problemSubInfo.toString());
		
		return problemSubInfo;
	}

	/**
	 * 정답 코드를 기반으로 한 추가 검증 메소드
	 * @param submittedCode 제출된 코드
	 * @param correctAnswerCode 정답 코드
	 * @return 유사도 점수 (0-100)
	 */
	public double validateCodeSimilarity(String submittedCode, String correctAnswerCode) {
		if (submittedCode == null || correctAnswerCode == null) {
			return 0.0;
		}
		
		// 공백과 줄바꿈 제거 후 비교
		String normalizedSubmitted = submittedCode.replaceAll("\\s+", "").toLowerCase();
		String normalizedCorrect = correctAnswerCode.replaceAll("\\s+", "").toLowerCase();
		
		if (normalizedSubmitted.equals(normalizedCorrect)) {
			return 100.0;
		}
		
		// 간단한 유사도 계산 (Levenshtein distance 기반)
		int maxLength = Math.max(normalizedSubmitted.length(), normalizedCorrect.length());
		if (maxLength == 0) {
			return 100.0;
		}
		
		int distance = levenshteinDistance(normalizedSubmitted, normalizedCorrect);
		return Math.max(0.0, 100.0 - (double) distance / maxLength * 100.0);
	}
	
	/**
	 * Levenshtein distance 계산
	 */
	private int levenshteinDistance(String s1, String s2) {
		int[][] dp = new int[s1.length() + 1][s2.length() + 1];
		
		for (int i = 0; i <= s1.length(); i++) {
			dp[i][0] = i;
		}
		
		for (int j = 0; j <= s2.length(); j++) {
			dp[0][j] = j;
		}
		
		for (int i = 1; i <= s1.length(); i++) {
			for (int j = 1; j <= s2.length(); j++) {
				if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
					dp[i][j] = dp[i - 1][j - 1];
				} else {
					dp[i][j] = Math.min(dp[i - 1][j], Math.min(dp[i][j - 1], dp[i - 1][j - 1])) + 1;
				}
			}
		}
		
		return dp[s1.length()][s2.length()];
	}

	@Override
	public List<Integer> getProblemPlayCount(List<ProblemDTO> problemList) {
		
		return problemRepository.getProblemPlayCount(problemList);
	}
	
}
