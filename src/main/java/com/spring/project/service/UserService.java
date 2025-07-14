package com.spring.project.service;

import java.util.List;
import java.util.Map;

import javax.swing.plaf.ListUI;

import org.springframework.ui.Model;

import com.spring.project.dto.exam.ExamDTO;
import com.spring.project.dto.problem.DifficultyLevelDTO;
import com.spring.project.dto.problem.ProblemDTO;
import com.spring.project.dto.problem.ProblemSubMissionDTO;
import com.spring.project.dto.user.UserDTO;
import com.spring.project.dto.user.UserGradeDTO;

public interface UserService {
   
   //ProblemDTO + ProblemSubMissionDTO가 담긴 모델 반환 메서드
   public Map<String, Object> getSessionProblemInfo(long user_id);
   
   public Map<String, Object> getSessionPostInfo(long user_id);
   
   public Map<String, Object> getUserInfo(long user_id);
   
   public void updateUser(long user_id, UserDTO vo);
   
   public List<UserDTO> getAllUserInfo();
   
   public List<UserGradeDTO> getAllUserGrade(List<UserDTO> grade_ids);
   
   public List<ProblemSubMissionDTO> getUserProblemSub(List<UserDTO> user_ids);
   
   public Map<String, Object> getAllUserPostInfo();
   //public List<PostDTO> getAlluserPostInfo();
   //public List<PostCategoryDTO> getAlluserPostCategory();
   public Map<String, Object> getAllProblemInfo();
	
	public List<DifficultyLevelDTO> getAllProblemLevelInfo(List<ProblemDTO> difficulty_names);
	
	public void deletePost(Long post_id);

	public void deleteProblem(Long problem_id);

	public List<ExamDTO> getAllExamInfo();

	public Map<String, Object> getexamSubmissionInfo();
	
	public Map<String, Object> getTotalCounts();
	
	//로그인
	public UserDTO getlogin(UserDTO user);
	//회원가입
	public int register(UserDTO user);
	
	

}
