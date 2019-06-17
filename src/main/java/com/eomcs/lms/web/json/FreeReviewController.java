package com.eomcs.lms.web.json;

import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.eomcs.lms.domain.FreeReview;
import com.eomcs.lms.domain.Member;
import com.eomcs.lms.service.FreeReviewService;

@RestController("json/FreeReviewController")
@RequestMapping("/json/freereview")
public class FreeReviewController {

  @Autowired
  FreeReviewService freeReviewService;

  // add tour
  @PostMapping("add")
  public Object add(FreeReview freeReview, HttpSession session) {
    HashMap<String, Object> content = new HashMap<>();
    try {
      Member member = (Member) session.getAttribute("loginUser");
      freeReview.setMemberNo(member.getNo());
      freeReviewService.add(freeReview);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;

  }


  @GetMapping("list")
  public Object list(@RequestParam(defaultValue = "1") int pageNo,
      @RequestParam(defaultValue = "7") int pageSize, String search) {

    if (pageSize < 3 || pageSize > 8)
      pageSize = 7;

    int rowCount = freeReviewService.size(search);
    int totalPage = rowCount / pageSize;
    if (rowCount % pageSize > 0)
      totalPage++;

    if (pageNo < 1)
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;

    List<FreeReview> freeReview = freeReviewService.list(pageNo, pageSize, search);

    HashMap<String, Object> content = new HashMap<>();
    content.put("list", freeReview);
    content.put("pageNo", pageNo);
    content.put("pageSize", pageSize);
    content.put("totalPage", totalPage);

    return content;
  }

  @GetMapping("delete")
  public Object delete(int no,HttpSession session) {
    
    Member member = (Member) session.getAttribute("loginUser");
    HashMap<String, Object> content = new HashMap<>();
    if(member.getNo()!=freeReviewService.getMemberId(no).getMemberNo()) {
      content.put("status", "fail");
      content.put("message", "잘못된 삭제입니다.");
      return content;
    }
    
    
    
    try {
      if (freeReviewService.delete(no) == 0)
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
    FreeReview freeReview = freeReviewService.get(no);
    return freeReview;
  }
  @PostMapping("update")
  public Object update(FreeReview freeReview,HttpSession session) {
    Member member = (Member) session.getAttribute("loginUser");
    HashMap<String, Object> content = new HashMap<>();
    if(member.getNo()!=freeReviewService.getMemberId(freeReview.getNo()).getMemberNo()) {
      content.put("status", "fail");
      content.put("message", "잘못된 업데이트입니다.");
      return content;
    }
    
    try {
      if (freeReviewService.update(freeReview) == 0) 
        throw new RuntimeException("해당 번호의 리뷰가 없습니다.");
      content.put("status", "success");
      
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  

}
