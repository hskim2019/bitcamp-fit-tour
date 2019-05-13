package com.eomcs.lms.web.json;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.eomcs.lms.domain.TourComment;
import com.eomcs.lms.service.TourCommentService;

@RestController("json/TourCommentController")
@RequestMapping("/json/tourcomment")
public class TourCommentController {

  @Autowired TourCommentService tourCommentService;

  //tourCommentAdd
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

  //tourCommentDelete
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

  //tourCommentList
  @PostMapping("list")
  public Object list(int tourNo,
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="3") int pageSize) {

    if (pageSize < 3 || pageSize > 8) 
      pageSize = 3;
    
    int rowCount = tourCommentService.countCommentbyTourNo(tourNo);
    int totalPage;
    
    if(rowCount == 0) {
      totalPage = 0;
      pageSize = 0;
    } else {
      
      totalPage = rowCount / pageSize;
      if (rowCount % pageSize > 0)
        totalPage++;
    }
    
    if (pageNo < 1) 
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;
    

    HashMap<String, Object> map = new HashMap<>();
    List<TourComment> tourComments = tourCommentService.get(tourNo, pageNo, pageSize);
    int commentAmount = tourCommentService.countCommentbyTourNo(tourNo);
    
    map.put("pageNo", pageNo);
    map.put("pageSize", pageSize);
    map.put("totalPage", totalPage);
    map.put("commentAmount", commentAmount);
    map.put("tourComment", tourComments);
    
    return map;
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










