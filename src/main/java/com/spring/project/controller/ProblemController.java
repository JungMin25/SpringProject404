package com.spring.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.spring.project.dto.problem.CategoryDTO;
import com.spring.project.dto.problem.DifficultyLevelDTO;
import com.spring.project.dto.problem.ProblemDTO;
import com.spring.project.dto.problem.ProblemSubMissionDTO;
import com.spring.project.dto.user.UserDTO;
import com.spring.project.dto.user.UserGradeDTO;
import com.spring.project.service.ProblemService;

@Controller
public class ProblemController {
	
	@Autowired
	ProblemService problemService;
	
	
	 @RequestMapping("problempage.do")
	    public String getProblemList(
	            @RequestParam(value = "category_id", required = false) Integer category_id,
	            @RequestParam(value = "difficulty_id", required = false) Integer difficulty_id,
	            @RequestParam(value = "search", required = false) String searchKeyword,
	            @RequestParam(value="user_id", required=false) Integer user_id,
	            @RequestParam(value = "page", defaultValue = "1") int page, //추가
	            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize, //추가
	            @RequestParam(value = "sort", required = false) String sort,
	            Model model) {    
	    	
	    	
	        
	    	//검색된 문제
	        Map<String, Object> condition = new HashMap<>();            
	       
	        
	        if (category_id != null) {
	            condition.put("category_id", category_id);
	        }
	        if (difficulty_id != null) {
	            condition.put("difficulty_id", difficulty_id);
	        }
	        if (searchKeyword != null && !searchKeyword.trim().isEmpty()) {
	            condition.put("searchKeyword", searchKeyword.trim());
	        }
	        if (sort != null && !sort.trim().isEmpty() ) {
	        	condition.put("sort", sort.trim());
	        }
	        if (sort == null || sort.trim().isEmpty() || sort.equals("all")) {
	            sort = "all"; // 기본 정렬
	            condition.put("sort", sort.trim());
	        }
	        
	        // 페이징 계산 추가
	        int offset = (page - 1) * pageSize;
	        condition.put("offset", offset);
	        condition.put("size", pageSize);
	        
	        
	        //문제수 출력
	        List<ProblemDTO> problemList = problemService.getSortedProblemList(condition);  
	        //알고리즘 불러오기
	        List<DifficultyLevelDTO> difficultyList = problemService.getProblemDif(problemList);
	        List<CategoryDTO> categoryList = problemService.getProblemCat(problemList);
	        List<ProblemSubMissionDTO> correctList = problemService.getCorrectRate(problemList);
	        //문제 시도 수 출력
	        List<Integer> problemPlayCount = problemService.getProblemPlayCount(problemList);
	        

	        for(Integer a : problemPlayCount) {
	        	System.out.println(a);
	        }
	        
	        //문제 전체수
	        int totalCount = problemService.getProblemCount(condition);    
	        // 총 페이지 수 계산   
	        int totalPages = (int) Math.ceil((double) totalCount / pageSize);  
	        
	        model.addAttribute("problemPlayCount", problemPlayCount);
	        model.addAttribute("problemList", problemList);  
	        model.addAttribute("problemCount", totalCount);       
	        model.addAttribute("difficultyList", difficultyList);
	        model.addAttribute("categoryList", categoryList);
	        model.addAttribute("sort", sort);
	        model.addAttribute("correctList", correctList);
	        //페이지 !추가!
	        model.addAttribute("currentPage", page);
	        model.addAttribute("totalPages", totalPages);
	        model.addAttribute("pageSize", pageSize);
	        
	        return "problem/problems"; // → /WEB-INF/views/problem/problems.jsp
	    }
	    

	@RequestMapping("problemdetailpage.do")
	public String problemdetailpage(ProblemDTO vo, Model model) {
		
		Map<String, Object> problemMap = new HashMap<String, Object>();
		
		problemMap = problemService.getProblemInfo(vo);
		
		ProblemDTO oneProblemInfo = (ProblemDTO) problemMap.get("oneProblemInfo");
		DifficultyLevelDTO oneProblemDif = (DifficultyLevelDTO) problemMap.get("oneProblemDif");
		CategoryDTO oneProblemCat = (CategoryDTO) problemMap.get("oneProblemCat");
		
		System.out.println(oneProblemInfo.toString());
		System.out.println(oneProblemDif.toString());
		System.out.println(oneProblemCat.toString());
		
		model.addAttribute("oneProblemInfo", oneProblemInfo);
		model.addAttribute("oneProblemDif", oneProblemDif);
		model.addAttribute("oneProblemCat", oneProblemCat);
		
		return "problem/problem-detail";
	}
	@RequestMapping("probleminsertpage.do")
	public String probleminsertpage() {
		return "problem/problem_insert";
	}
	//문제 등록
	@RequestMapping("probleminsert.do")
	public String probleminsert(ProblemDTO vo) {
		
		System.out.println(vo.toString());	
		
		problemService.insertProblem(vo);
		
		
		return "redirect:adminmypage.do";
	}
	@RequestMapping("problemupdatepage.do")
	public String problemupdatepage(ProblemDTO vo, Model model) {
		
		Map<String, Object> problemMap = new HashMap<String, Object>();
		
		problemMap = problemService.getProblemInfo(vo);
		
		ProblemDTO oneProblemInfo = (ProblemDTO) problemMap.get("oneProblemInfo");
		DifficultyLevelDTO oneProblemDif = (DifficultyLevelDTO) problemMap.get("oneProblemDif");
		CategoryDTO oneProblemCat = (CategoryDTO) problemMap.get("oneProblemCat");
		
		System.out.println(oneProblemInfo.toString());
		System.out.println(oneProblemDif.toString());
		System.out.println(oneProblemCat.toString());
		
		model.addAttribute("oneProblemInfo", oneProblemInfo);
		model.addAttribute("oneProblemDif", oneProblemDif);
		model.addAttribute("oneProblemCat", oneProblemCat);
		
		
		return "problem/problem_update";
	}
	@RequestMapping("problemresult.do")
	public String problemresult(
			@RequestParam String submittedCode, 
			@RequestParam(value = "isCorrect", defaultValue = "false") String isCorrectStr, 
			ProblemDTO problem_id, 
			Model model, 
			HttpSession session) {
		
		System.out.println("제출된 코드: " + submittedCode);
		System.out.println("검증 결과: " + isCorrectStr);
		System.out.println(problem_id.toString());
		
		UserDTO userSession = (UserDTO) session.getAttribute("userSession");
		
		Long user_id = userSession.getUser_id();
		UserDTO userVO = new UserDTO();
		Map<String, Object> problemMap = new HashMap<String, Object>();
		
		problemMap = problemService.getProblemInfo(problem_id);
		
		ProblemDTO oneProblemInfo = (ProblemDTO) problemMap.get("oneProblemInfo");
		CategoryDTO oneProblemCat = (CategoryDTO) problemMap.get("oneProblemCat");
		DifficultyLevelDTO oneProblemDif = (DifficultyLevelDTO) problemMap.get("oneProblemDif");
		
		// JavaScript 검증 결과에 따라 정답/오답 처리
		boolean isCorrect = "true".equals(isCorrectStr);
		System.out.println("최종 정답 여부: " + isCorrect);
		
		// 문제 제출 테이블에 저장 - 검증 결과에 따라 처리
		ProblemSubMissionDTO problemSubDTO = problemService.problemSubInsertAndSelectWithCode(user_id, problem_id, submittedCode, isCorrect);
		System.out.println(problemSubDTO.toString());
		
		//리턴 된 문제 제출 테이블정보 -> 유저정보 변경 -> 정답여부에 따른 난이도별 경험치 지급 -> user정보 반환
		userVO = problemService.userSetLevel(problemSubDTO);
		UserGradeDTO gradeVO = problemService.getUserGrade(userVO);
		
		// 결과 페이지에 필요한 정보 설정
		model.addAttribute("submittedCode", submittedCode);
		model.addAttribute("userVO", userVO);
		model.addAttribute("problemSubDTO", problemSubDTO);
		model.addAttribute("oneProblemInfo", oneProblemInfo);
		model.addAttribute("oneProblemCat", oneProblemCat);
		model.addAttribute("oneProblemDif", oneProblemDif);
		model.addAttribute("gradeVO", gradeVO);
		
		return "problem/problem_result";
	}
	
	@RequestMapping("problemresultpage.do")
	public String problemresultpage(){
		return "problem/problem_result";
	}
	
	@RequestMapping("problemupdate.do")
	public String problemupdate(ProblemDTO vo) {
		
		problemService.updateProblem(vo);
		
		
		return "redirect:adminmypage.do";
	}
	
	
}
