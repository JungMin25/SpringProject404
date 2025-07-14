package com.spring.project.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.spring.project.dto.exam.ExamDTO;
import com.spring.project.dto.post.PostCategoryDTO;
import com.spring.project.dto.post.PostDTO;
import com.spring.project.dto.problem.CategoryDTO;
import com.spring.project.dto.problem.DifficultyLevelDTO;
import com.spring.project.dto.problem.ProblemDTO;
import com.spring.project.dto.problem.ProblemSubMissionDTO;
import com.spring.project.dto.user.UserDTO;
import com.spring.project.dto.user.UserGradeDTO;
import com.spring.project.repository.UserRepository;
import com.spring.project.service.UserService;


@Service("userService")
public class UserServiceImpl implements UserService{

   @Autowired
   UserRepository userRepository;
   Map<String, Object> map = new HashMap<String, Object>();
   
   @Override
   public UserDTO getlogin(UserDTO user) {
       return userRepository.getLogin(user);
   }
   //회원가입
   @Override
   public int register(UserDTO user) {
	   return userRepository.register(user);
   }
   
   @Override
   public Map<String, Object> getSessionProblemInfo(long user_id) {

      //유저 아이디에 맞는 제출 테이블의 정답여부, problem_id 리스트 추출
      //public List<ProblemSubmissionDTO> getSessionProblemIsCorrect(int user_id);
      List<ProblemSubMissionDTO> problem_ids = new ArrayList<ProblemSubMissionDTO>();
      List<ProblemDTO> problem_info = new ArrayList<ProblemDTO>();
      
      problem_ids = userRepository.getSessionProblemIsCorrect(user_id);
      //유저가 제출한 문제의 모든 정보(category_id, difficulty_id포함)
      problem_info =  userRepository.getSessionProblemTitle(problem_ids);
      
      map.put("sessionProblemIsCorrect",problem_ids);
      map.put("sessionProblemTitle", problem_info);
      map.put("sessionProblemCategory", userRepository.getSessionProblemCategory(problem_info));
      map.put("sessionProblemDifficulty", userRepository.getSessionProblemDifficulty(problem_info));
      
      return map;
   }

   @Override
   public Map<String, Object> getSessionPostInfo(long user_id) {
      
      List<PostDTO> category_ids = new ArrayList<PostDTO>();
      List<PostCategoryDTO> postCategory_info = new ArrayList<PostCategoryDTO>();
      
      category_ids = userRepository.getSessionPostTitle(user_id);
      postCategory_info = userRepository.getSessionPostCategory(category_ids);
      
      map.put("sessionPostTitle", category_ids);
      map.put("sessionPostCategory", postCategory_info);
      
      return map;
   }

   @Override
   public Map<String, Object> getUserInfo(long user_id) {
      
      map.put("sessionUserName", userRepository.getSessionUserName(user_id)); 
      map.put("sessionUserGrade", userRepository.getSessionUserGrade(user_id));
      map.put("sessionUserSub", userRepository.getSessionUserSub(user_id));
      
      
      
      return map;
   }

   @Override
   public void updateUser(long user_id, UserDTO vo) {

      if(vo.getNickname() != null) {
         userRepository.updateUserNickname(user_id, vo);
      }else {
         userRepository.updateUserPassword(user_id, vo);
      }
      
   }

   @Override
   public List<UserDTO> getAllUserInfo() {
      
      return userRepository.getAllUserInfo();
   }

   @Override
   public List<UserGradeDTO> getAllUserGrade(List<UserDTO> grade_ids) {
      
      
      
      return userRepository.getAllUserGrade(grade_ids);
   }

   @Override
   public List<ProblemSubMissionDTO> getUserProblemSub(List<UserDTO> user_ids) {
      
      
      
      return userRepository.getUserProblemSub(user_ids);
   }

   @Override
   public Map<String, Object> getAllUserPostInfo() {
      
      List<PostDTO> allUserPostList = new ArrayList<PostDTO>();
      List<PostCategoryDTO> allUserPostCategoryList = new ArrayList<PostCategoryDTO>();
      
      allUserPostList= userRepository.getAllUserPost(); // POSTS.title, category_id
      allUserPostCategoryList = userRepository.getAllUserPostCategory(allUserPostList); //POST_CATEGORY.category_name
      
      map.put("allUserPostList", allUserPostList);
      map.put("allUserPostCategoryList", allUserPostCategoryList);
      
      
      return map;
   }
   @Override
	public Map<String, Object> getAllProblemInfo() {
		Map<String, Object> map = new HashMap<>();
		List<ProblemDTO> allProblemList = new ArrayList<ProblemDTO>();
		List<CategoryDTO> allProblemCategoryList = new ArrayList<CategoryDTO>();
		
		allProblemList= userRepository.getAllProblem();
		allProblemCategoryList = userRepository.getAllProblemCategory(allProblemList);
		map.put("allProblemList", allProblemList);
		map.put("allProblemCategoryList", allProblemCategoryList);
		
		return map;
	}

	@Override
	public List<DifficultyLevelDTO> getAllProblemLevelInfo(List<ProblemDTO> difficulty_names) {
		return userRepository.getAllProblemLevel(difficulty_names);
	}


	@Override
	public List<ExamDTO> getAllExamInfo() {
		return userRepository.getAllExamInfo();
		
	}

	
	
	
	
	@Override
	public void deletePost(Long post_id) {
		
		userRepository.deletePost(post_id);
		
	}
	
	@Override
	public void deleteProblem(Long problem_id) {
		userRepository.deleteProblem(problem_id);
}

	@Override
	public Map<String, Object> getexamSubmissionInfo() {
		
		return userRepository.getexamSubmissionInfo();
	}

	@Override
	public Map<String, Object> getTotalCounts() {
		
		return userRepository.getTotalCounts();
	}


   

   


}
