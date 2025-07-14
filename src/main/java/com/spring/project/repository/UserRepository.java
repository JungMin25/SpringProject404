package com.spring.project.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.project.dto.exam.ExamDTO;
import com.spring.project.dto.post.PostCategoryDTO;
import com.spring.project.dto.post.PostDTO;
import com.spring.project.dto.problem.CategoryDTO;
import com.spring.project.dto.problem.DifficultyLevelDTO;
import com.spring.project.dto.problem.ProblemDTO;
import com.spring.project.dto.problem.ProblemSubMissionDTO;
import com.spring.project.dto.user.UserDTO;
import com.spring.project.dto.user.UserGradeDTO;

@Repository
public class UserRepository {

   @Autowired
   SqlSessionTemplate mybatis;
   
 //구글 로그인
   // ✅ 사용자 이메일(아이디)로 조회
   public UserDTO findByUsername(String username) {
       return mybatis.selectOne("userRepository.findByUsername", username);
   }
   
   // OAuth2 - 이메일로 사용자 조회
   public UserDTO findByEmail(String email) {
       return mybatis.selectOne("userRepository.findByEmail", email);
   }
   
   //구글 로그인
   // ✅ 사용자 삽입
   public void insertUser(UserDTO user) {
       mybatis.insert("userRepository.insertUser", user);
   }

   
   
   //로그인  
   public UserDTO getLogin(UserDTO user) {
	    return mybatis.selectOne("userRepository.getLogin", user);
	}
   
   //회원가입
   public int register(UserDTO user) {
	   return mybatis.insert("userRepository.register" , user);
	   
   }
   
   //유저 아이디에 맞는 제출 테이블의 정답여부, problem_id 리스트 추출
   public List<ProblemSubMissionDTO> getSessionProblemIsCorrect(long user_id){
      
      return mybatis.selectList("userRepository.getProblemSubMissionIsCorrect", user_id);
      
   }
   
   //리스트를 건내줘서 problem_id에 맞는 제목 리스트 추출
   public List<ProblemDTO> getSessionProblemTitle(List<ProblemSubMissionDTO> problem_ids){
      
      List<ProblemDTO> userProblemTitleList = new ArrayList<ProblemDTO>();
      
      for(ProblemSubMissionDTO problem_id : problem_ids) {
         
         if(problem_id.getProblem_id() != null) {
            userProblemTitleList.add(mybatis.selectOne("userRepository.getProblemTitle", problem_id.getProblem_id()));
         }
         
      }
      
      return userProblemTitleList;
   }
   //getProblemTitle의 리스트(사용자가 제출한 문제정보)를 받아 해당하는 category_id를 활용
   public List<CategoryDTO> getSessionProblemCategory(List<ProblemDTO> problem_info){
      
      List<CategoryDTO> userProblemCategoryList = new ArrayList<CategoryDTO>();
      
      for(ProblemDTO category_id : problem_info) {
         
         if(category_id.getCategory_id() != null) {
            userProblemCategoryList.add(mybatis.selectOne("userRepository.getProblemCategory", category_id));
         }
         
      }
      
      return userProblemCategoryList;
   }
   
   //getProblemTitle의 리스트(사용자가 제출한 문제정보)를 받아 해당하는 difficulty_id를 활용
   public List<DifficultyLevelDTO> getSessionProblemDifficulty(List<ProblemDTO> problem_info){
      
      List<DifficultyLevelDTO> userProblemDifficultyList = new ArrayList<DifficultyLevelDTO>();
      
      for(ProblemDTO difficulty_id : problem_info) {
         
         if(difficulty_id.getDifficulty_id() != null) {
            userProblemDifficultyList.add(mybatis.selectOne("userRepository.getProblemDifficulty", difficulty_id));
         }
         
      }
      
      return userProblemDifficultyList;
   }
   
   public List<PostDTO> getSessionPostTitle(long user_id){
      
      return mybatis.selectList("userRepository.getPostTitle", user_id);
      
   }
   
   public List<PostCategoryDTO> getSessionPostCategory(List<PostDTO> category_ids){
      
   
      List<PostCategoryDTO> userPostCategoryList = new ArrayList<PostCategoryDTO>();
      
      for(PostDTO category_id : category_ids) {
         
         if(category_id.getCategory_id() != null) {
            userPostCategoryList.add(mybatis.selectOne("userRepository.getPostCategory", category_id));
         }
         
      }
      
      return userPostCategoryList;
      
   }
   
   public UserDTO getSessionUserName(long user_id) {
      
      return mybatis.selectOne("userRepository.getUserName", user_id);
      
   }
   public UserGradeDTO getSessionUserGrade(long user_id) {
      
      return mybatis.selectOne("userRepository.getUserGrade", user_id);
      
   }
   public ProblemSubMissionDTO getSessionUserSub(long user_id) {
      
      return mybatis.selectOne("userRepository.getUserSub", user_id);
      
   }
   
   public void updateUserNickname(long user_id, UserDTO vo) {
      vo.setUser_id(user_id);

      mybatis.update("userRepository.updateNickname", vo);
   }
   public void updateUserPassword(long user_id, UserDTO vo) {
	   vo.setUser_id(user_id);
      

      mybatis.update("userRepository.updatePassword", vo);
   }
   
   public List<UserDTO> getAllUserInfo(){
      
      return mybatis.selectList("userRepository.getAllUserInfo");
      
   }
   
   public List<UserGradeDTO> getAllUserGrade(List<UserDTO> grade_ids){
      
      List<UserGradeDTO> userGradeList = new ArrayList<UserGradeDTO>();
      
      for(UserDTO dto : grade_ids) {
         if(dto.getUser_id() != null) {
            userGradeList.add(mybatis.selectOne("userRepository.getAllUserGrade", dto.getGrade_id()));
         }
      }
      
      return userGradeList;
      
   }
   
   public List<ProblemSubMissionDTO> getUserProblemSub(List<UserDTO> user_ids) {
      
      List<ProblemSubMissionDTO> userProblemSubList = new ArrayList<ProblemSubMissionDTO>();
      for(UserDTO dto : user_ids) {
         if(dto.getUser_id() != null) {
            userProblemSubList.add(mybatis.selectOne("userRepository.getUserProblemSub", dto.getUser_id()));
         }
         
      }
      
      return userProblemSubList;

   }
   
   public List<PostDTO> getAllUserPost(){
      
      return mybatis.selectList("userRepository.getAllUserPost");
      
   }
   
   public List<PostCategoryDTO> getAllUserPostCategory(List<PostDTO> category_ids){
      
      List<PostCategoryDTO> categoryNameList = new ArrayList<PostCategoryDTO>();
      
      for(PostDTO category_id : category_ids) {
         if(category_id.getCategory_id() != null) {
            categoryNameList.add(mybatis.selectOne("userRepository.getAllUserPostCategory", category_id.getCategory_id()));
         }   
      }
      
      return categoryNameList;
   }
// 문제 관리 -> 제목, 카테고리
	public List<ProblemDTO> getAllProblem() {
		return mybatis.selectList("userRepository.getAllProblem");
	}
	
	public List<CategoryDTO> getAllProblemCategory(List<ProblemDTO> category_ids) {
		List<CategoryDTO> problemCategoryList = new ArrayList<CategoryDTO>();
		
		for(ProblemDTO category_id : category_ids) {
			if(category_id.getCategory_id() != null) {
				problemCategoryList.add(mybatis.selectOne("userRepository.getAllProblemCategory" , category_id.getCategory_id()));
			}
		}
		
		return problemCategoryList;
	}
	
	// 문제관리  -> 난이도
	public List<DifficultyLevelDTO> getAllProblemLevel(List<ProblemDTO> difficulty_names) {
		List<DifficultyLevelDTO> probelmLevelList = new ArrayList<DifficultyLevelDTO>();
		
		for(ProblemDTO dto : difficulty_names) {
			if(dto.getProblem_id() !=null) {
				probelmLevelList.add(mybatis.selectOne("userRepository.getAllProblemLevel", dto.getDifficulty_id()));
			}
		}
		
		return probelmLevelList;
	}
		
	// 시험관리 -> 제목
	public List<ExamDTO> getAllExamInfo() {
		return mybatis.selectList("userRepository.getAllExamInfo");
	}
	
	// 통계
	
	  public Map<String, Object> getexamSubmissionInfo() {
	        // "userRepository.getexamSubmissionInfo" ID를 가진 쿼리를 실행하고
	        // 결과를 하나의 Map 객체로 반환합니다.
		  return mybatis.selectOne("userRepository.getexamSubmissionInfo");
	    }
	
	  // 전체 회원수, 전체 게시글 수
	  public Map<String, Object> getTotalCounts() {
			return mybatis.selectOne("userRepository.getTotalCounts");
		}
	
	
	
		// 삭제
	public void deletePost(Long post_id) {
		
		mybatis.delete("userRepository.deletePost", post_id);
		
	}
	
	public void deleteProblem(long problem_id) {
		mybatis.delete("userRepository.deleteProblem", problem_id);
	}
	

   
   
}
