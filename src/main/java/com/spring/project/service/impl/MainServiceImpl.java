package com.spring.project.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.project.repository.MainRepository;
import com.spring.project.service.MainService;

@Service("mainService")
public class MainServiceImpl implements MainService{
   
   @Autowired
   private MainRepository mainRepository;   
   
   //전체수 
   public Map<String, Integer> getcountAll() {
      
      Map<String, Integer> map = new HashMap<String, Integer>();
      

      
      map.put("countProblems", mainRepository.getCountProblems());
      map.put("countUsers", mainRepository.getCountUsers());
      map.put("countSucProblem", mainRepository.getCountSucProblem());
      
      return map;
   }
   
   @Override
    public int getProblemCountByCategory(int categoryId) {
        return mainRepository.countProblemByCategory(categoryId);
    }

}
