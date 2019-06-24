package com.eomcs.lms.web.json;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eomcs.lms.domain.Notice;
import com.eomcs.lms.service.NoticeService;

// AJAX 기반 JSON 데이터를 다루는 컨트롤러
@RestController("json/NoticeController")
@RequestMapping("/json/notice")
public class NoticeController {
  
  @Autowired NoticeService noticeService;
  
  @GetMapping("delete")
  public Object delete(int no) {
  
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (noticeService.delete(no) == 0) 
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");
      
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  @GetMapping("detail")
  public Object detail(int no) {
    Notice notice = noticeService.get(no);
    return notice;
  }
  
  @GetMapping("list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="5") int pageSize) {
    
    if (pageSize < 5 || pageSize > 8) 
      pageSize = 5;
    
    int rowCount = noticeService.size();
    int totalPage = rowCount / pageSize;
    if (rowCount % pageSize > 0)
      totalPage++;
    
    if (pageNo < 1) 
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;
    
    List<Notice> notices = noticeService.list(pageNo, pageSize);
    
    HashMap<String,Object> content = new HashMap<>();
    content.put("list", notices);
    content.put("pageNo", pageNo);
    content.put("pageSize", pageSize);
    content.put("totalPage", totalPage);
    
    return content;
  }
  
  @PostMapping("update")
  public Object update(Notice notice) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (noticeService.update(notice) == 0) 
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");
      
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }




@PostMapping("add")
public Object add(Notice notice) throws IOException, ServletException {

  HashMap<String,Object> content = new HashMap<>();
  try {
    noticeService.add(notice);
    content.put("status", "success");
  } catch (Exception e) {
    content.put("status", "fail");
    content.put("message", e.getMessage());
  }
  return content;
}

}

