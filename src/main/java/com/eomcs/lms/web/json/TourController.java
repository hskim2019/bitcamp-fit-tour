package com.eomcs.lms.web.json;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.eomcs.lms.domain.Tour;
import com.eomcs.lms.domain.TourComment;
import com.eomcs.lms.service.TourCommentService;
import com.eomcs.lms.service.TourService;

@RestController("json/TourController")
@RequestMapping("/json/tour")
public class TourController {

  @Autowired TourService tourService;
  @Autowired TourCommentService tourCommentService;
  
  //  tourAdd
  //  @PostMapping("add")
  //  public Object add(Tour tour) {
  //    HashMap<String,Object> content = new HashMap<>();
  //    try {
  //      tourService.add(tour);
  //      content.put("status", "success");
  //    } catch (Exception e) {
  //      content.put("status", "fail");
  //      content.put("message", e.getMessage());
  //    }
  //    return content;
  //  }
  //  
  //  @GetMapping("delete")
  //  public Object delete(int no) {
  //  
  //    HashMap<String,Object> content = new HashMap<>();
  //    try {
  //      if (tourService.delete(no) == 0) 
  //        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
  //      content.put("status", "success");
  //      
  //    } catch (Exception e) {
  //      content.put("status", "fail");
  //      content.put("message", e.getMessage());
  //    }
  //    return content;
  //  }
  //  
  
  //tourDetail
  @GetMapping("detail")
  public Object detail(int no,
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="3") int pageSize,
      @RequestParam(defaultValue="0") int deleteCount) {

    if (pageSize < 3 || pageSize > 8) 
      pageSize = 3;
    
    int rowCount = tourCommentService.countCommentbyTourNo(no);
    int totalPage;
    
    if(rowCount == 0) {
      totalPage = 0;
      pageSize = 0;
    } else {
      
      totalPage = rowCount / pageSize;
      if (rowCount % pageSize > 0)
        totalPage++;
    }
    
//    if (pageNo < 1) 
//      pageNo = 1;
//    else if (pageNo > totalPage)
//      pageNo = totalPage;
    

    HashMap<String, Object> map = new HashMap<>();
    Tour tour = tourService.get(no);
    List<TourComment> tourComments = tourCommentService.get(no, pageNo, pageSize, deleteCount);
    int commentAmount = tourCommentService.countCommentbyTourNo(no);

    map.put("pageNo", pageNo);
    map.put("pageSize", pageSize);
    map.put("totalPage", totalPage);
    map.put("tour", tour);
    map.put("commentAmount", commentAmount);
    map.put("tourComment", tourComments);
    
    return map;
  }

  //tourList
  @GetMapping("list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="3") int pageSize) {

    if (pageSize < 3 || pageSize > 8) 
      pageSize = 3;

    int rowCount = tourService.size();
    int totalPage = rowCount / pageSize;
    if (rowCount % pageSize > 0)
      totalPage++;

    if (pageNo < 1) 
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;

    List<Tour> tours = tourService.list(pageNo, pageSize);

    HashMap<String,Object> content = new HashMap<>();
    content.put("list", tours);
    content.put("pageNo", pageNo);
    content.put("pageSize", pageSize);
    content.put("totalPage", totalPage);

    return content;
  }
  
  //  tourUpdate
  //  @PostMapping("update")
  //  public Object update(Tour tour) {
  //    HashMap<String,Object> content = new HashMap<>();
  //    try {
  //      if (tourService.update(tour) == 0) 
  //        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
  //      content.put("status", "success");
  //      
  //    } catch (Exception e) {
  //      content.put("status", "fail");
  //      content.put("message", e.getMessage());
  //    }
  //    return content;
  //  }
}










