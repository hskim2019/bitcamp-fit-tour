package com.eomcs.lms.web.json;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.eomcs.lms.domain.Member;
import com.eomcs.lms.service.MemberService;

@RestController("json/SignUpController")
@RequestMapping("/json/signup")
public class SignUpController {
  
  @Autowired MemberService memberService;
 

  @PostMapping("add")
  public Object add(Member member) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
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
    public Object emailoverlap(String email) {
      Member member  = memberService.get(email);
      return member;
    }
    
   
  
  

  
  
  
}
