package com.spring.project.repository;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MainRepository {
   
   @Autowired
   private SqlSessionTemplate mybatis;
   
   //전체 문제 수
   public int getCountProblems() {
      return mybatis.selectOne("mainRepository.countProblems");
   }
   public int getCountUsers() {
      return mybatis.selectOne("mainRepository.countUsers");
   }
   public int getCountSucProblem() {
      return mybatis.selectOne("mainRepository.countSucProblem");
   }
   
   
   //카테고리별 문제 수
   public int countProblemByCategory(int categoryId) {
      return mybatis.selectOne("mainRepository.countProblemsByCategory",categoryId);
   }
}
