package com.eomcs.lms.web.json;

import java.util.HashMap;
import javax.servlet.http.HttpSession;
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

  public Object add(Member member,HttpSession session) throws Exception {
    HashMap<String, Object> content = new HashMap<>();
    try {

      memberService.signUp(member);

      content.put("status", "success");
      session.setAttribute("standby", member.getEmail());
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  @PostMapping("snsAdd")

  public Object snsAdd(Member member,HttpSession session) throws Exception {
    HashMap<String, Object> content = new HashMap<>();
    try {
      member.setPassword("naver123123");
      member.setLoginTypeNo(6);
      member.setCertification("sns-login");
      memberService.snsSignUp(member);

      content.put("status", "success");
      session.setAttribute("standby", member.getEmail());
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
  public ModelAndView confirm(String email, String certification) {
   
    if (memberService.confirm(email, certification) == 1) {
      return new ModelAndView("html/auth/success");
    } else {
      return new ModelAndView("html/auth/fail");
    }
  }

  @GetMapping("reeamil")
  public Object reEamil(HttpSession session) {

    HashMap<String, Object> content = new HashMap<>();
    String email = (String) session.getAttribute("standby");

    try {


      memberService.reEamil(email);

      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", email);
    }
    return content;
  }


}
