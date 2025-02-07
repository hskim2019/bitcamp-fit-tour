package com.eomcs.lms.web.json;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.eomcs.lms.domain.Member;
import com.eomcs.lms.domain.Tour;
import com.eomcs.lms.service.TourService;

@RestController("json/TourWishListController")
@RequestMapping("/json/wishlist")
public class TourWishListController {

  @Autowired TourService tourService;

  //add Wish list
  @GetMapping("add")
  public Object add(String tourNo, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");
    HashMap<String,Object> content = new HashMap<String,Object>();
    HashMap<String,Object> paramMap = new HashMap<String,Object>();

    paramMap.put("tourNo", tourNo);
    paramMap.put("memberNo", loginUser.getNo());
    try {
      tourService.addWishlist(paramMap);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  //add Wish list
  @GetMapping("delete")
  public Object delete(String tourNo, HttpSession session) {
    
    HashMap<String,Object> content = new HashMap<String,Object>();
    HashMap<String,Object> paramMap = new HashMap<String,Object>();
    
    if(session.getAttribute("loginUser") == null) {
      content.put("status", "notlogin");
      return content;
    }
    
    Member loginUser = (Member) session.getAttribute("loginUser");
    
    paramMap.put("tourNo", tourNo);
    paramMap.put("memberNo", loginUser.getNo());
    try {
      tourService.deleteWishlist(paramMap);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  @GetMapping("findcityname")
  public Object findCityname(HttpSession session) {
    
    HashMap<String,Object> content = new HashMap<String,Object>();
    
    if(session.getAttribute("loginUser") == null) {
      content.put("status", "notlogin");
      return content;
    }
    
    Member loginUser = (Member) session.getAttribute("loginUser");
    
    try {
      List<String> citynames = tourService.findWishlistCityName(loginUser.getNo());
      content.put("status", "success");
      content.put("citynames", citynames);
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  // detail wish list
  @GetMapping("count")
  public Object count(String tourNo, HttpSession session) {
    
    HashMap<String,Object> content = new HashMap<String,Object>();
    HashMap<String,Object> paramMap = new HashMap<String,Object>();
    
    if(session.getAttribute("loginUser") == null) {
      content.put("status", "notlogin");
      content.put("count", 0);
      return content;
    }
    
    Member loginUser = (Member) session.getAttribute("loginUser");
    System.out.println("!!!" +loginUser.getNo());
    paramMap.put("tourNo", tourNo);
    paramMap.put("memberNo", loginUser.getNo());
    try {
      int count = tourService.countWishlist(paramMap);
      content.put("status", "success");
      content.put("count", count);
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  //wish list by city name
  @GetMapping("list")
  public Object list(String cityName, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");
    HashMap<String,Object> content = new HashMap<String,Object>();
    HashMap<String,Object> paramMap = new HashMap<String,Object>();
    
    paramMap.put("cityName", cityName);
    paramMap.put("memberNo", loginUser.getNo());
    try {
      List<Tour> tours = tourService.findTourByCityname(paramMap);
      System.out.println(tours);
      content.put("status", "success");
      content.put("tours", tours);
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  //wish list by member no
  @GetMapping("wish")
  public Object list(HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");
    HashMap<String,Object> content = new HashMap<String,Object>();
    
    if(session.getAttribute("loginUser") == null) {
      content.put("status", "notlogin");
      content.put("count", 0);
      return content;
    }
    
    
    try {
      List<String> wishlist = tourService.findWishlistByMemberNo(loginUser.getNo());
      System.out.println(wishlist);
      content.put("status", "success");
      content.put("wishlist", wishlist);
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

}





