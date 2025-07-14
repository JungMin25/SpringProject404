package com.spring.project.service;

import java.util.List;
import java.util.Map;

import com.spring.project.dto.post.PostCommentDTO;
import com.spring.project.dto.post.PostDTO;

public interface PostService {
	// 게시판 비즈니스 로직
	
	public Map<String, Object> getAllPostInfo(int offset, int pageSize, Integer category_id, String searchKeyword);
	
	public int getPostCount(Map<String, Object> condition);
	
	public PostDTO getOnePostInfo(PostDTO vo);
	
	public Map<String, Object> getSubPostInfo(PostDTO vo);
	
	public Map<String, Object> getPostComInfo(PostDTO vo);
	
	public void updatePost(PostDTO vo);
	
	public void deletePost(PostDTO vo);
	
	public PostDTO upViewCount(PostDTO vo);
	
	public void insertComment(PostCommentDTO vo);
	
	public void deleteComment(PostCommentDTO vo);
	
	public void insertBoard(PostDTO vo);
	
	
}
