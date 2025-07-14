package com.spring.project.controller;

import com.spring.project.service.MainService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@Controller
public class MainController {

   @Autowired
    private MainService mainService;    

   
    @RequestMapping("mainpage.do")
    public String mainpage(Model model) {
       
       //등록된 문제, 활성사용자, 문제해결 수
       Map<String, Integer> mainCountMap = new HashMap<String, Integer>();       
       mainCountMap = mainService.getcountAll();       
       
       //카테고리별 문제 수
        Map<String, Integer> categoryProblemCount = new HashMap<>();
        for (int i=1; i<=6; i++) {
            int count = mainService.getProblemCountByCategory(i);
            categoryProblemCount.put(String.valueOf(i), count);
        }
        
        model.addAttribute("countProblems", mainCountMap.get("countProblems"));
        model.addAttribute("countUsers", mainCountMap.get("countUsers"));
        model.addAttribute("countSucProblem", mainCountMap.get("countSucProblem"));        
        model.addAttribute("categoryProblemCount", categoryProblemCount);
        System.out.println(categoryProblemCount+","+mainCountMap);
        return "main/mainpage";
    }
}
