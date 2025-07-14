package com.spring.project.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.project.dto.post.PostCategoryDTO;
import com.spring.project.dto.post.PostCommentDTO;
import com.spring.project.dto.post.PostDTO;
import com.spring.project.dto.user.UserDTO;

@Repository
public class PostRepository {
	
	@Autowired
	SqlSessionTemplate mybatis;
	
	public List<PostDTO> getAllPost(int offset, int pageSize, Integer category_id, String searchKeyword) {
	    Map<String, Object> params = new HashMap<>();
	    params.put("offset", offset);
	    params.put("pageSize", pageSize);
	    params.put("category_id", category_id);
	    params.put("searchKeyword", searchKeyword);
	    
	    if(category_id != null || searchKeyword != null) {
	    	return mybatis.selectList("postRepository.getCategoryPostInfo", params);
	    }else {
	    	return mybatis.selectList("postRepository.getAllPostInfo", params);
	    }
	    
	    
	}
	
	public List<PostCategoryDTO> getAllPostCategory(List<PostDTO> postList){
		
		List<PostCategoryDTO> postCatList = new ArrayList<PostCategoryDTO>();
		
		for(PostDTO dto : postList) {
			if(dto.getCategory_id() != null) {
				postCatList.add(mybatis.selectOne("postRepository.getAllPostCategory", dto.getCategory_id())); 
			}
		}
		return postCatList;
	}
	
	public List<UserDTO> getAllPostUser(List<PostDTO> postList){
		
		List<UserDTO> postUserList = new ArrayList<UserDTO>();
		
		for(PostDTO dto : postList) {
			if(dto.getUser_id() != null) {
				postUserList.add(mybatis.selectOne("postRepository.getAllPostUser", dto.getUser_id())); 
			}
		}
		return postUserList;
	}
	
	public int getPostCount(Map<String, Object> condition) {
		return mybatis.selectOne("postRepository.countPost", condition);
	}
	
	public PostDTO getOnePostInfo(PostDTO vo) {
		return mybatis.selectOne("postRepository.selectOnePost", vo);
	}
	
	public UserDTO getOnePostUser(PostDTO vo) {
		return mybatis.selectOne("postRepository.selectOnePostUser", vo);
	}
	
	public PostCategoryDTO getOnePostCat(PostDTO vo) {
		return mybatis.selectOne("postRepository.selectOnePostCat", vo);
	}
	
	public List<PostCommentDTO> getPostCommentList(PostDTO vo){
		return mybatis.selectList("postRepository.getPostCommentList", vo);
	}
	
	public List<UserDTO> getPostCommentUserList(List<PostCommentDTO> user_ids){
		
		List<UserDTO> postCommentUserList = new ArrayList<UserDTO>();
		
		for(PostCommentDTO user_id : user_ids) {
			if(user_id.getUser_id() != null) {
				postCommentUserList.add(mybatis.selectOne("postRepository.getCommentUser", user_id.getUser_id())); 
			}
		}
		return postCommentUserList;
	}
	
	public void updatePost(PostDTO vo) {
		mybatis.update("postRepository.updatePost", vo);
	}
	
	public void deletePost(PostDTO vo) {
		mybatis.delete("postRepository.deletePost", vo);
	}
	
	public PostDTO upViewCount(PostDTO vo) {
		mybatis.update("postRepository.upViewCount", vo);
		
		return mybatis.selectOne("postRepository.selectOnePost", vo);
	}
	
	public void insertComment(PostCommentDTO vo) {
		mybatis.insert("postRepository.insertComment", vo);
	}
	
	public void deleteComment(PostCommentDTO vo) {
		mybatis.delete("postRepository.deleteComment", vo);
	}
	
	public void insertBoard(PostDTO vo) {
		mybatis.insert("postRepository.insertBoard", vo);
	}

	

	
	
}
