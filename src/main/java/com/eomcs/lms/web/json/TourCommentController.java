package com.eomcs.lms.web.json;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.eomcs.lms.domain.TourComment;
import com.eomcs.lms.service.TourCommentService;

@RestController("json/TourCommentController")
@RequestMapping("/json/tourcomment")
public class TourCommentController {
  
  @Autowired TourCommentService tourCommentService;
  
  @PostMapping("add")
  public Object add(TourComment tourComment) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      tourCommentService.add(tourComment);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  @GetMapping("delete")
  public Object delete(int no) {
  
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (tourCommentService.delete(no) == 0) 
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");
      
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
//  @GetMapping("detail")
//  public Object detail(int no) {
//    List<TourComment> tourComment = tourCommentService.get(no);
//    return tourComment;
//  }
  
  @GetMapping("list")
  public Object list() {
    
    List<TourComment> Comments = tourCommentService.list();
    
    HashMap<String,Object> content = new HashMap<>();
    content.put("list", Comments);
    
    return content;
  }
  
  @PostMapping("update")
  public Object update(TourComment tourComment) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (tourCommentService.update(tourComment) == 0) 
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");
      
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
}










