package com.spring.project.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.spring.project.dto.exam.ExamAnswerDetailDTO;
import com.spring.project.dto.exam.ExamDTO;
import com.spring.project.dto.exam.ExamProblemDTO;
import com.spring.project.dto.exam.ExamSubmissionDTO;
import com.spring.project.dto.problem.CategoryDTO;
import com.spring.project.dto.problem.DifficultyLevelDTO;
import com.spring.project.dto.problem.ProblemDTO;
import com.spring.project.dto.user.UserDTO;
import com.spring.project.service.ExamService;

@Controller
public class ExamController {
	@Autowired
	ExamService examService;
	
	
	@RequestMapping("exampage.do")
	public String exampage(Model model) {
		
		//시험 제출 횟수, 합격한 시험 수, 합격률 표시  EXAM_SUBMISSIONS
		ExamSubmissionDTO examSubCountDTO = new ExamSubmissionDTO();
		List<ExamDTO> examTitleList = new ArrayList<ExamDTO>();
		
		
		examSubCountDTO = examService.getExamSubCount();
		
		
		examTitleList = examService.getExamTitle();
		
		System.out.println(examSubCountDTO.toString());
		for(ExamDTO examDTO : examTitleList) {
			System.out.println(examDTO.toString());
		}
		
		model.addAttribute("examSubCountDTO", examSubCountDTO);
		model.addAttribute("examTitleList", examTitleList);
		
		return "exam/exam";
	}
	@RequestMapping("examplaypage.do")
	public String examplaypage(
			ExamProblemDTO vo, 
			Model model, 
			ExamAnswerDetailDTO examAnswerDTO, 
			String correctCode, 
			@RequestParam(value = "isCorrect", defaultValue = "false") String isCorrectStr,
			HttpSession session) {
		
		UserDTO userSession = (UserDTO) session.getAttribute("userSession");
		
		long problemCnt;
		long p_id = 0;
		long user_id = userSession.getUser_id();
		
		if(vo.getProblem_id() != null) {
			p_id = vo.getProblem_id();
		}
		
		
		System.out.println(examAnswerDTO.toString());
		System.out.println("제출된 코드 : " + correctCode);
		System.out.println("검증 결과: " + isCorrectStr);
		
		if(correctCode != null) {
			// JavaScript 검증 결과에 따라 정답/오답 처리
			boolean isCorrect = "true".equals(isCorrectStr);
			System.out.println("최종 정답 여부: " + isCorrect);
			
			examAnswerDTO.setSubmitted_answer(correctCode);
			examAnswerDTO.setIs_correct(isCorrect); 
			examAnswerDTO.setExam_submission_id((Long)session.getAttribute("exam_submission_id"));
			//EXAM_ANSWER_DETAILS DTO -> exam_problem_id, problem_id, submitted_answer(correctCode), is_correct
			System.out.println("JavaScript 검증 결과 반영: " + examAnswerDTO.toString());
			examService.insertExamAnswer(examAnswerDTO);
		}
		
		
		if(vo.getExam_problem_id() == null) {
			problemCnt = 1;
			vo.setExam_problem_id(problemCnt);
			ExamSubmissionDTO examSubId = new ExamSubmissionDTO();
			examSubId = examService.insertExamSubId(user_id, vo.getExam_id());
			session.setAttribute("exam_submission_id", examSubId.getExam_submission_id());
			
		}else if(vo.getExam_problem_id() != null){
			problemCnt = vo.getExam_problem_id();
			problemCnt ++;
			vo.setExam_problem_id(problemCnt);
			if(vo.getExam_problem_id() > 10) {
				return "redirect:examfinish.do";
			}
		}
		
		System.out.println(vo.toString());
		
		
		ProblemDTO problemDTO = examService.getExamProblemInfo(vo); //exam_id, exam_problem_id -> problem_id -> problemInfo
		
		
		
		int progressPercent = (int) (vo.getExam_problem_id() * 10);
		
		model.addAttribute("examId", vo.getExam_id());
		model.addAttribute("examProblemId", vo.getExam_problem_id());
		model.addAttribute("progressPercent", progressPercent);
		model.addAttribute("problemDTO", problemDTO);
		
		
		
		return "exam/exam_play";
	}
	@RequestMapping("examfinish.do")
	public String examfinish(HttpSession session, Model model) {
		
		long examSubId = (long) session.getAttribute("exam_submission_id");
		List<ExamAnswerDetailDTO> examAnsDetailList = new ArrayList<ExamAnswerDetailDTO>();
		List<ProblemDTO> problemList = new ArrayList<ProblemDTO>();
		List<CategoryDTO> categoryList = new ArrayList<CategoryDTO>();
		List<DifficultyLevelDTO> difList = new ArrayList<DifficultyLevelDTO>();
		Map<String, Object> map = new HashMap<String, Object>();
		// EXAM_ANSWER_DETAILS exam_submission_id해당하는 10문제 불러오기 -> examanswerdetailDTO
		examAnsDetailList = examService.getExamAnswerDetails(examSubId);
	
		// 정답여부 판단 후 정답률 계산 -> examSubmissionDTO
		ExamSubmissionDTO examSubDTO = new ExamSubmissionDTO();
		examSubDTO = examService.getExamAnswerCorrect(examSubId);
		System.out.println(examSubDTO.toString());
		// 해당하는 problem_id들의 문제정보, 난이도, 카테고리 불러오기 -> problem, difficulty, categoryDTO
		map = examService.getExamProblemInfoList(examAnsDetailList);
		
		problemList = (List<ProblemDTO>) map.get("problemInfoList");
		categoryList = (List<CategoryDTO>) map.get("problemCategoryList");
		difList = (List<DifficultyLevelDTO>) map.get("problemDifficultyList");
		
		model.addAttribute("examAnsDetailList", examAnsDetailList);
		model.addAttribute("examSubDTO", examSubDTO);
		model.addAttribute("problemList", problemList);
		model.addAttribute("categoryList", categoryList);
		model.addAttribute("difList", difList);
		
		
		session.removeAttribute("exam_submission_id");
		
		return "exam/exam_finish";
	}
	@RequestMapping("examinsertpage.do")
	public String examinsert(Model model) {
		
		
		
		model.addAttribute("problemInfoList", examService.getproblemInfoList());
		
		return "exam/exam_insert";
	}
	
	@RequestMapping("examinsert.do")
	public String examinsertEx(Model model, ExamDTO vo, 
											@RequestParam("selectedProblems")  List<Long> selectedProblems) {
		
		System.out.println(vo.getExam_title());
		for(long i : selectedProblems) {
			System.out.println(i);
		}
		ExamDTO exam_id = new ExamDTO();
		
		exam_id = examService.insertExam(vo);
		
		examService.insertExamProblem(selectedProblems, exam_id);
		
		
		return "redirect:adminmypage.do";
	}
	
	@RequestMapping("examdelete.do")
	public String deleteExam(ExamDTO vo) {
		
		examService.deleteExam(vo);
		
		return "redirect:adminmypage.do";
	}

}
