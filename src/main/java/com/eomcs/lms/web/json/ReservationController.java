package com.eomcs.lms.web.json;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.eomcs.lms.domain.Reservation;
import com.eomcs.lms.service.ReservationService;

@RestController("json/ReservationController")
@RequestMapping("/json/reservation")
public class ReservationController {
  
  @Autowired ReservationService reservationService;
  

  @PostMapping("add")
  public Object add(Reservation reservation) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
    try {
      reservationService.add(reservation);
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
      if (reservationService.delete(no) == 0) 
        throw new RuntimeException("해당 번호의 예약내역이 없습니다.");
      content.put("status", "success");
      
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
    
    
  
  }
  
  @GetMapping("detail")
  public Object detail(int no) {
    Reservation reservation  = reservationService.get(no);
    return reservation;
  }
  
  @GetMapping("list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="3") int pageSize, String search) {
    
    if (pageSize < 3 || pageSize > 8) 
      pageSize = 3;
    
    int rowCount = reservationService.size(search);
    int totalPage = rowCount / pageSize;
    if (rowCount % pageSize > 0)
      totalPage++;
    
    if (pageNo < 1) 
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;
    
    List<Reservation> reservations = reservationService.list(pageNo, pageSize, search);
    
    HashMap<String,Object> content = new HashMap<>();
    content.put("list", reservations);
    content.put("pageNo", pageNo);
    content.put("pageSize", pageSize);
    content.put("totalPage", totalPage);
    
    return content;
  }
  
  @PostMapping("update")
  public Object update(Reservation reservation) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (reservationService.update(reservation) == 0) 
        throw new RuntimeException("해당 번호의 예약내역이 없습니다.");
      content.put("status", "success");
      
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
}
