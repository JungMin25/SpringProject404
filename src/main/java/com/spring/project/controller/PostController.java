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

import com.spring.project.dto.post.PostCategoryDTO;
import com.spring.project.dto.post.PostCommentDTO;
import com.spring.project.dto.post.PostDTO;
import com.spring.project.dto.problem.CategoryDTO;
import com.spring.project.dto.user.UserDTO;
import com.spring.project.service.PostService;

@Controller
public class PostController {
	
	@Autowired
	PostService postService;
	
	@RequestMapping("boardpage.do")
	public String boardpage(Model model, 
			 @RequestParam(value = "page", defaultValue = "1") int page, //추가
	         @RequestParam(value = "pageSize", defaultValue = "10") int pageSize, //추가
	         @RequestParam(value = "category_id", required = false) Integer category_id,
	         @RequestParam(value = "search", required = false) String searchKeyword
	         
			) {
		
		Map<String, Object> postMap = new HashMap<String, Object>();

		
		//페이징
		Map<String, Object> condition = new HashMap<>();          
		// 페이징 계산 추가
        int offset = (page - 1) * pageSize;
        condition.put("offset", offset);
        condition.put("size", pageSize);
        condition.put("category_id", category_id);
        condition.put("searchKeyword", searchKeyword);
		//PostDTO (제목, user_id, category_id, 작성일, 조회수, 댓글 수)
		postMap = postService.getAllPostInfo(offset, pageSize, category_id, searchKeyword);
		// -> user_id UserDTO, category_id PostCategoryDTO
		
		  //문제 전체수
        int totalCount = postService.getPostCount(condition);    
        // 총 페이지 수 계산   
        int totalPages = (int) Math.ceil((double) totalCount / pageSize);  
		
		
		
		model.addAttribute("postList", postMap.get("postList"));
		model.addAttribute("postCatList", postMap.get("postCatList"));
		model.addAttribute("postUserList", postMap.get("postUserList"));
		
		//페이징
		 model.addAttribute("currentPage", page);
	     model.addAttribute("totalPages", totalPages);
	     model.addAttribute("pageSize", pageSize);
	     model.addAttribute("totalCount", totalCount);
		
		return "board/board";
	}
	@RequestMapping("boarddetailpage.do")
	public String boarddetailpage(Model model ,PostDTO vo, HttpSession session) {
		
		
		boolean sessionUserPost = false; // 테스트
		Map<String, Object> postMap = new HashMap<String, Object>();
		Map<String, Object> postComListMap = new HashMap<String, Object>();
		
		
		
		vo = postService.getOnePostInfo(vo);
		// 조회수 증가
		vo = postService.upViewCount(vo);
		
		// postDTO.category_id -> category_name
		// postDTO.user_id -> UserDTO
		postMap = postService.getSubPostInfo(vo);
		
		// postDTO.post_id -> postCommentDTO
		// postCommentDTO List -> user_id ->UserDTO List
		postComListMap = postService.getPostComInfo(vo);
		
		
		UserDTO loginUser = new UserDTO();
		loginUser = (UserDTO) session.getAttribute("userSession");
		
		
		
		if(vo.getUser_id().equals(loginUser.getUser_id())) {
			sessionUserPost = true;
		}
		
		model.addAttribute("loginUser", loginUser);
		model.addAttribute("sessionUser", sessionUserPost);
		model.addAttribute("OnePostInfo", vo);
		model.addAttribute("onePostUser", postMap.get("onePostUser"));
		model.addAttribute("onePostCat", postMap.get("onePostCat"));
		model.addAttribute("postCommentList", postComListMap.get("postCommentList"));
		model.addAttribute("postCommentUserList", postComListMap.get("postCommentUserList"));
		
		return "board/board_detail";
	}
	@RequestMapping("boardinsertpage.do")
	public String boardinsertpage() {
		return "board/board_insert";
	}
	@RequestMapping("boardupdatepage.do")
	public String boardupdatepage(Model model, PostDTO vo) {
		
		
		
		vo = postService.getOnePostInfo(vo);
		model.addAttribute("OnePostInfo", vo);
		
		return "board/board_update";
	}
	
	@RequestMapping("updatePost.do")
	public String updatePost(PostDTO vo) {
		
		System.out.println(vo.toString());
		
		postService.updatePost(vo);
		
		return "redirect:boardpage.do";
		
	}
	
	
	@RequestMapping("deletePost.do")
	public String deletePost(PostDTO vo) {
		
		postService.deletePost(vo);
		
		return "redirect:boardpage.do";
		
	}
	@RequestMapping("deletePostMy.do")
	public String deletePostMypage(PostDTO vo) {
		
		postService.deletePost(vo);
		
		return "redirect:usermypage.do";
		
	}
	
	@RequestMapping("insertComment.do")
	public String insertComment(PostCommentDTO vo, HttpSession session) {
		
		//session.getAttribute("userSession");
		UserDTO userSession = (UserDTO) session.getAttribute("userSession");
		long user_id = userSession.getUser_id();
		
		vo.setUser_id(user_id);
		
		System.out.println(vo.getPost_id() + "+" + vo.getContent());
		
		postService.insertComment(vo);
		
		return "redirect:boarddetailpage.do?post_id="+ vo.getPost_id();
		
		
	}
	
	@RequestMapping("deleteComment.do")
	public String deleteComment(PostCommentDTO vo, HttpSession session) {
		
		postService.deleteComment(vo);
		
		return "redirect:boarddetailpage.do?post_id="+ vo.getPost_id();
		
	}
	
	@RequestMapping("boardinsert.do")
	public String boardInsert(PostDTO vo, HttpSession session) {
		
		
		UserDTO userSession = (UserDTO) session.getAttribute("userSession");
		vo.setUser_id(userSession.getUser_id());
		
		postService.insertBoard(vo);
		
		return "redirect:boardpage.do";
		
	}
	
}
