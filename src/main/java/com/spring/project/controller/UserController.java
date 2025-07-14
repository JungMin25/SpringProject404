package com.spring.project.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.project.dto.exam.ExamDTO;
import com.spring.project.dto.post.PostCategoryDTO;
import com.spring.project.dto.post.PostDTO;
import com.spring.project.dto.problem.CategoryDTO;
import com.spring.project.dto.problem.DifficultyLevelDTO;
import com.spring.project.dto.problem.ProblemDTO;
import com.spring.project.dto.problem.ProblemSubMissionDTO;
import com.spring.project.dto.user.UserDTO;
import com.spring.project.dto.user.UserGradeDTO;
import com.spring.project.service.EmailService;
import com.spring.project.service.UserService;

@Controller
public class UserController {
   
   @Autowired
   UserService userService;			
   @Autowired
   EmailService emailService;
 
   
   Map<String, Object> userMap = new HashMap<String, Object>();
   Map<String, Object> userPostMap = new HashMap<String, Object>();
   Map<String, Object> userInfoMap = new HashMap<String, Object>();
   Map<String , Object> postMap = new HashMap<String, Object>();
   
   @GetMapping("loginpage.do")
   public String showLoginPage() {
       return "user/login"; // 단순히 로그인 폼만 보여줌
   }
   @RequestMapping("logout.do")
   public String logout(HttpSession session, HttpServletRequest request, HttpServletResponse response) {
	   SecurityContextHolder.clearContext();

	    // 2. 세션 무효화
	    session = request.getSession(false);
	    if (session != null) {
	        session.invalidate();
	    }

	    // 3. 쿠키 삭제 
	    Cookie cookie = new Cookie("JSESSIONID", null);
	    cookie.setPath("/");
	    cookie.setMaxAge(0);
	    response.addCookie(cookie);
	    
	   return "redirect:loginpage.do"; // 로그인 페이지로 리다이렉트
   }

//   // 기존 로그인 처리 (일반 로그인)
//   @PostMapping("login.do")
//   public String login(@ModelAttribute UserDTO user, Model model, HttpSession session) {     
//	   
//       UserDTO loginUser = userService.getlogin(user);
//
//       if (loginUser != null) {           
//           session.setAttribute("userSession", loginUser);
//           return "redirect:mainpage.do";           
//       } else {   
//           return "redirect:/loginpage.do?error=1";
//       }        
//   }
//   
  
   @PostMapping("login.do")
   public String loginpage(@ModelAttribute UserDTO user, Model model, HttpSession session) {
       UserDTO userSession = userService.getlogin(user);

       if (userSession != null) {
           session.setAttribute("userSession", userSession);

           // ✅ Spring Security 인증 객체 수동 설정 !추가!
           Authentication auth = new UsernamePasswordAuthenticationToken(
        		   userSession, null, new ArrayList<>()  // 권한 리스트가 있다면 여기 채워줌
           );
           SecurityContextHolder.getContext().setAuthentication(auth);

           return "redirect:mainpage.do";
       } else {
           return "redirect:/loginpage.do?error=1";
       }
   }
   
   
   @GetMapping("registerpage.do")
   public String registerpage() {
       return "user/register"; // 단순히 로그인 폼만 보여줌
   }
   
	
   @PostMapping("registerpage.do")
   public String registerpage(
		   @ModelAttribute UserDTO user,           
           @RequestParam("password") String password,
           @RequestParam("confirmPassword") String confirmPassword,          
           Model model) {

       // 비밀번호 불일치
       if (!password.equals(confirmPassword)) {
           model.addAttribute("errorMsg", "❌ 비밀번호가 일치하지 않습니다.");
           return "user/register"; // forward
       }

       try {
    	   userService.register(user);
           return "main/mainpage";
       } catch (DuplicateKeyException e) {
           model.addAttribute("errorMsg", "❌ 이미 존재하는 아이디입니다.");
           return "user/register"; // forward
       }
   }
   
   @RequestMapping("usermypage.do")
   public String usermypage(Model model, HttpSession session) {
      
	  UserDTO userSession = (UserDTO) session.getAttribute("userSession");
      long user_id = userSession.getUser_id(); //세션값 꺼내기
      
      
      
      userInfoMap = userService.getUserInfo(user_id);
      userMap = userService.getSessionProblemInfo(user_id);
      userPostMap = userService.getSessionPostInfo(user_id);
      
      
      
      List<ProblemSubMissionDTO> submissionList = (List<ProblemSubMissionDTO>) userMap.get("sessionProblemIsCorrect");
      List<ProblemDTO> problemList = (List<ProblemDTO>) userMap.get("sessionProblemTitle");
      List<CategoryDTO> categoryList = (List<CategoryDTO>) userMap.get("sessionProblemCategory");
      List<DifficultyLevelDTO> difficultyList = (List<DifficultyLevelDTO>) userMap.get("sessionProblemDifficulty");
      List<PostDTO> postList = (List<PostDTO>) userPostMap.get("sessionPostTitle");
      List<PostCategoryDTO> postCategoryList = (List<PostCategoryDTO>) userPostMap.get("sessionPostCategory");
      UserDTO user =  (UserDTO) userInfoMap.get("sessionUserName");
      UserGradeDTO userGrade = (UserGradeDTO) userInfoMap.get("sessionUserGrade");
      ProblemSubMissionDTO userSub = (ProblemSubMissionDTO) userInfoMap.get("sessionUserSub");
      
      model.addAttribute("sessionProblemTitle", problemList);
      model.addAttribute("sessionProblemIsCorrect", submissionList);
      model.addAttribute("sessionProblemCategory", categoryList);
      model.addAttribute("sessionProblemDifficulty", difficultyList);
      model.addAttribute("sessionPostTitle", postList);
      model.addAttribute("sessionPostCategory", postCategoryList);
      model.addAttribute("sessionUser", user);
      model.addAttribute("sessionUserGrade", userGrade);
      model.addAttribute("sessionUserSub", userSub);
      

      
      return "user/user_mypage";
   }
   
   @RequestMapping("mypage.do")
   public String mypage(UserDTO vo) {
	   
	   if(vo.getUser_type().equals("ADMIN")) {
		   return "redirect:adminmypage.do";
	   }else {
		   return "redirect:usermypage.do";
	   }
	   
	   
	   
   }
   
   
   @RequestMapping("adminmypage.do")
   public String adminmypage(Model model) {
      
	   // 1. 데이터 저장을 위한 리스트 선언
	 		List<UserDTO> getAllUserInfoList = new ArrayList<UserDTO>(); 
	 		List<UserGradeDTO> getAllUserGradeList = new ArrayList<UserGradeDTO>();
	 		List<ProblemSubMissionDTO> getAllUserSubList = new ArrayList<ProblemSubMissionDTO>();
	 		List<PostDTO> getAllUserPostList = new ArrayList<PostDTO>();
	 		List<PostCategoryDTO> getAllUserPostCategoryList = new ArrayList<PostCategoryDTO>();
	 		List<ProblemDTO> getAllProblemList = new ArrayList<ProblemDTO>();
	 		List<CategoryDTO> getAllProblemCategoryList = new ArrayList<CategoryDTO>();
	 		List<DifficultyLevelDTO> getAllProblemLevelList = new ArrayList<DifficultyLevelDTO>();
	 		List<ExamDTO> getAllExamList = new ArrayList<ExamDTO>();
	 		
	 		
	 		// 2. 모든 사용자 기본 정보 조회
	 	    // USERS 테이블에서 user_id, nickname, created_at 등의 사용자 기본 정보를 가져옵니다.
	 	    // 이는 UserDTO 객체 리스트로 반환됩니다.
	 		// USERS -> user_id, nickname, created_at -> UserDTO
	 		
	 		getAllUserInfoList = userService.getAllUserInfo();
	 		model.addAttribute("getAllUserInfoList", getAllUserInfoList);
	 		
	 		// problems 테이블에서 problem_id -> ProblemDTO
	 		
	 		
	 		// CATEGORIES 테이블에서 category_id -> CategoryDTO
	 		
	 		
	 		
	 		// 3. 모든 사용자의 등급 정보 조회
	 	    // USERS 테이블의 grade_id를 사용하여 USER_GRADES 테이블에서 grade_name, grade_color 등을 가져옵니다.
	 	    // 이 정보는 UserGradeDTO 객체 리스트로 반환됩니다.
	 	    // getAllUserInfoList를 인자로 넘겨주어 각 사용자에 해당하는 등급 정보를 가져오는 것으로 보입니다.
	 		// USER_GRADES(USERS.grade_id) -> grade_name, grade_color -> User_GraLstesDTOUse
	 		getAllUserGradeList = userService.getAllUserGrade(getAllUserInfoList);
	 		model.addAttribute("getAllUserGradeList", getAllUserGradeList);
	 		
	 		// 4. 모든 사용자의 문제 제출 및 정답률 정보 조회
	 	    // PROBLEM_SUBMISSION 테이블에서 각 사용자가 제출한 문제 수, 정답 맞춘 문제 수, 정답률 등의 정보를 가져옵니다.
	 	    // 이 정보는 ProblemSubMissionDTO 객체 리스트로 반환됩니다.
	 	    // 마찬가지로 getAllUserInfoList를 인자로 넘겨주어 각 사용자의 제출 정보를 가져오는 것으로 보입니다.
	 		// PROBLEM_SUBMISSION(USERS.user_id) -> 유저가 제출한 문제 수, 유저가 정답을 맞춘 문제 수, 정답률
	 		getAllUserSubList = userService.getUserProblemSub(getAllUserInfoList);
	 		model.addAttribute("getAllUserSubList", getAllUserSubList);
	 		
	 		
	 		
	 		

	 	    // 5. 모든 사용자가 작성한 게시글 및 카테고리 정보 조회
	 	    // POSTS 테이블의 title과 category_id를 사용하여 CATEGORY 테이블에서 카테고리 이름을 가져옵니다.
	 	    // 이 정보는 Map 형태로 반환되며, "allUserPostList" 키로는 PostDTO 리스트가,
	 	    // "allUserPostCategoryList" 키로는 PostCategoryDTO 리스트가 저장되어 있습니다.
	 		// 유저가 올린 게시글 + 게시글의 카테고리 이름
	 		// POSTS.title + category_id -> category.name
	 		postMap = userService.getAllUserPostInfo();
	 		
	 		getAllUserPostList = (List<PostDTO>) postMap.get("allUserPostList");
	 		getAllUserPostCategoryList = (List<PostCategoryDTO>) postMap.get("allUserPostCategoryList");
	 		
	 		model.addAttribute("getAllUserPostList", getAllUserPostList);
	 		model.addAttribute("getAllUserPostCategoryList", getAllUserPostCategoryList);
	 		
	 		// 모든 문제 관리에서 제목 조회
	 		// EXAM 테이블의 exam_title
	 		
	 		getAllExamList = userService.getAllExamInfo();
	 		model.addAttribute("getAllExamList",getAllExamList);
	 		
	 		// 모든 시험문제 및 카테고리 정보 조회
	 		// problems 테이블의 title과 category_id를 사용하여 CATEGORIES 테이블에서 카테고리 이름을 가져온다.
	 		// 이정보를 Map 형태로 반환되며, allProblemList키로는 ProblemDTO 리스트가, 
	 		// allCategoryList 키로는 CategoryDTO 리스트로 저장한다.
	 		// 시험문제 타이틀 + 시험문제 카테고리 이름
	 		// problems.title +category_id
	 		postMap = userService.getAllProblemInfo();
	 		getAllProblemList = (List<ProblemDTO>) postMap.get("allProblemList");
	 		getAllProblemCategoryList =(List<CategoryDTO>) postMap.get("allProblemCategoryList");
	 		
	 		// 모든 시험문제 난이도
	 		
	 		getAllProblemLevelList = userService.getAllProblemLevelInfo(getAllProblemList);
	 		model.addAttribute("getAllProblemList", getAllProblemList);
	 		model.addAttribute("getAllProblemCategoryList", getAllProblemCategoryList);
	 		model.addAttribute("getAllProblemLevelList", getAllProblemLevelList);
	 		
	 		  
	 		// 시험 통계 정보 조회
	 		 Map<String, Object> examStats = userService.getexamSubmissionInfo();
	 	        model.addAttribute("examStats", examStats);
	 	        
	 	        System.out.println("시험 통계: " + examStats);
	 		
	 	    // 전체 회원 수 , 전체 게시글 수 
	 	        
	 	        Map<String, Object> counts = userService.getTotalCounts();
	 	        model.addAttribute("totalUserCount", counts.get("user_count"));
	 	        model.addAttribute("totalPostCount", counts.get("post_count"));
	 	     
	 	     // Controller 메소드 안
	 	        System.out.println("디버깅 시작: 통계 정보 조회를 시작합니다.");

	 	      
	 		return "user/admin_mypage";
	 	}

   
   
   @RequestMapping("userupdate.do")
   public String updateUser(UserDTO vo, HttpSession session) {
      
	  UserDTO userSession = (UserDTO) session.getAttribute("userSession");
	   
      long user_id = userSession.getUser_id();
      System.out.println(vo.getNickname());
      userService.updateUser(user_id, vo);
      
      
      return "redirect:usermypage.do";
   }
	@RequestMapping("deleteBoardPost.do")
	public String deletePost(PostDTO vo) {
		
		Long post_id = vo.getPost_id();
		System.out.println("delete id : " + post_id);
		
		
		userService.deletePost(post_id);
		
		return "redirect:adminmypage.do";
		
	}
	
	@RequestMapping("deleteProblem.do")
	public String deleteProblem(ProblemDTO vo) {
		
		Long problem_id = vo.getProblem_id();
		System.out.println("delete pid : " + problem_id);
		userService.deleteProblem(problem_id);
		return "redirect:adminmypage.do";
	}
	
	
		//이메일 인증 로직
	    // 이메일 인증번호 발송
	    @PostMapping("sendEmailVerification.do")
	    @ResponseBody
	    public Map<String, Object> sendEmailVerification(@RequestParam String email) {
	        Map<String, Object> result = new HashMap<>();
	        try {
	            emailService.sendVerificationCode(email);
	            result.put("success", true);
	            result.put("message", "인증번호가 이메일로 발송되었습니다.");
	        } catch (Exception e) {
	            result.put("success", false);
	            result.put("message", "이메일 발송에 실패했습니다.");
	        }
	        return result;
	    }

	    // 이메일 인증번호 확인
	    @PostMapping("verifyEmailCode.do")
	    @ResponseBody
	    public Map<String, Object> verifyEmailCode(@RequestParam String email, @RequestParam String verificationCode) {
	        Map<String, Object> result = new HashMap<>();
	        boolean verified = emailService.verifyCode(email, verificationCode);
	        if (verified) {
	            result.put("success", true);
	            result.put("message", "이메일 인증이 완료되었습니다.");
	        } else {
	            result.put("success", false);
	            result.put("message", "인증번호가 올바르지 않거나 만료되었습니다.");
	        }
	        return result;
	    }
	



   
}
