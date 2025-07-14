package com.spring.project.service;

import java.util.Map;

public interface MainService {
   
   public int getProblemCountByCategory(int categoryId);
   
   public Map<String, Integer> getcountAll();
}