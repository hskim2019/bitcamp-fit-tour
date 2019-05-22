package com.eomcs.lms.web.json;

import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import com.eomcs.lms.domain.Member;
import com.eomcs.lms.service.MemberService;

@RestController("json/SignUpController")
@RequestMapping("/json/signup")
public class SignUpController {

  @Autowired
  MemberService memberService;


  @PostMapping("add")

  public Object add(Member member) throws Exception {
    HashMap<String, Object> content = new HashMap<>();
    try {
      
      memberService.signUp(member);

      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  
  @GetMapping("emailoverlap")
  
  public Object emailOverlap(String email) {
    Member member = memberService.get(email);
    return member;
  }

  @GetMapping("emailconfirm")
  public ModelAndView confirm(String email,String certification) {
    memberService.confirm(email,certification);
    return  new ModelAndView("html/auth/success");
  }
  @GetMapping("reeamil")
  public Object reEamil(String email) {
    
    HashMap<String, Object> content = new HashMap<>();
    try {
      
      memberService.reEamil(email);

      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }


}
