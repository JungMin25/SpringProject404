package com.spring.project.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.project.dto.post.PostCommentDTO;
import com.spring.project.dto.post.PostDTO;
import com.spring.project.repository.PostRepository;
import com.spring.project.service.PostService;

@Service("postService")
public class PostServiceImpl implements PostService{

	@Autowired
	PostRepository postRepository;
	
	
	@Override
	public Map<String, Object> getAllPostInfo(int offset, int pageSize, Integer category_id, String searchKeyword) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		List<PostDTO> postList = new ArrayList<PostDTO>();
		
		// PostDTO
		postList = postRepository.getAllPost(offset, pageSize, category_id, searchKeyword);

		
		map.put("postList", postList);
		map.put("postCatList", postRepository.getAllPostCategory(postList));
		map.put("postUserList", postRepository.getAllPostUser(postList));
		
		return map;
	}
	// 게시판 비즈니스 로직


	@Override
	public int getPostCount(Map<String, Object> condition) {
		
		return postRepository.getPostCount(condition);
	}


	@Override
	public PostDTO getOnePostInfo(PostDTO vo) {
		return postRepository.getOnePostInfo(vo);
	}


	@Override
	public Map<String, Object> getSubPostInfo(PostDTO vo) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		//userDTO
		map.put("onePostUser", postRepository.getOnePostUser(vo));
		//postCategoryDTO
		map.put("onePostCat", postRepository.getOnePostCat(vo));

		return map;
	}
	@Override
	public Map<String, Object> getPostComInfo(PostDTO vo) {
		
		List<PostCommentDTO> postCommentList = new ArrayList<PostCommentDTO>();
		Map<String, Object> map = new HashMap<String, Object>();
		//postCommentDTO List
		postCommentList = postRepository.getPostCommentList(vo);
		//postCommentDTO -> List -> user_id -> userDTOList
		
		
		map.put("postCommentList", postCommentList);
		map.put("postCommentUserList", postRepository.getPostCommentUserList(postCommentList));
		
		return map;
	}


	@Override
	public void updatePost(PostDTO vo) {
		
		postRepository.updatePost(vo);
		
	}


	@Override
	public void deletePost(PostDTO vo) {
		
		postRepository.deletePost(vo);
		
	}


	@Override
	public PostDTO upViewCount(PostDTO vo) {

		
		return postRepository.upViewCount(vo);
	}


	@Override
	public void insertComment(PostCommentDTO vo) {

		postRepository.insertComment(vo);
		
	}


	@Override
	public void deleteComment(PostCommentDTO vo) {

		postRepository.deleteComment(vo);
		
	}


	@Override
	public void insertBoard(PostDTO vo) {

		postRepository.insertBoard(vo);
		
		
	}
	
	


	
}
