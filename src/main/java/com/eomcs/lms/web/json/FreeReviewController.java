package com.eomcs.lms.web.json;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.eomcs.lms.domain.FreeReview;
import com.eomcs.lms.service.FreeReviewService;

@RestController("json/FreeReviewController")
@RequestMapping("/json/freereview")
public class FreeReviewController {

  @Autowired FreeReviewService freeReviewService;
 
  //add tour
  @PostMapping("add")
  public Object add(FreeReview freeReview) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      freeReviewService.add(freeReview);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
    
  }
  @GetMapping("list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="3") int pageSize, String search) {
    
    if (pageSize < 3 || pageSize > 8) 
      pageSize = 3;
    
    int rowCount = freeReviewService.size(search);
    int totalPage = rowCount / pageSize;
    if (rowCount % pageSize > 0)
      totalPage++;
    
    if (pageNo < 1) 
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;
    
    List<FreeReview> freeReview = freeReviewService.list(pageNo, pageSize, search);
    
    HashMap<String,Object> content = new HashMap<>();
    content.put("list", freeReview);
    content.put("pageNo", pageNo);
    content.put("pageSize", pageSize);
    content.put("totalPage", totalPage);
    
    return content;
  }



}