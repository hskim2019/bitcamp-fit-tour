package com.eomcs.lms.web.json;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.eomcs.lms.domain.Member;
import com.eomcs.lms.service.FacebookService;
import com.eomcs.lms.service.MemberService;
import com.eomcs.lms.service.NaverService;

@RestController("json/AuthController")
@RequestMapping("/json/auth")
public class AuthController {

  final static Logger logger = LogManager.getLogger(AuthController.class);

  static final String REFERER_URL = "refererUrl";

  @Autowired
  MemberService memberService;
  @Autowired
  ServletContext servletContext;
  @Autowired
  FacebookService facebookService;
  @Autowired
  NaverService naverService;

  @GetMapping("form")
  public void form(@RequestHeader(value = "Referer", required = false) String refererUrl,
      HttpSession session) {

    logger.debug("refererUrl: " + refererUrl);

    if (refererUrl != null && !refererUrl.endsWith("/auth/login")) {
      session.setAttribute(REFERER_URL, refererUrl);
    } else {
      session.removeAttribute(REFERER_URL);
    }
  }

  @PostMapping("login")
  public Object login(String email, String password, HttpSession session,
      HttpServletResponse response) {

    Member member = memberService.get(email, password);

    HashMap<String, Object> content = new HashMap<>();

    if (member == null) {
      content.put("status", "fail");
      content.put("message", "이메일이 없거나 암호가 맞지 않습니다.");
    } else if (member.getRank() == 0) {
      session.setAttribute("standby", email);
      content.put("status", "stand-by");
    } else if (member.getRank() == 3) {
      content.put("status", "withdrawal");
    } else {
      session.setAttribute("loginUser", member);
      System.out.println(member);
      content.put("status", "success");
    }

    return content;
  }

  @GetMapping("logout")
  public Object logout(HttpSession session) throws Exception {

    logger.debug("세션 무효화시킴!");
    logger.debug("loginUser: " + session.getAttribute("loginUser"));
    session.invalidate();

    HashMap<String, Object> content = new HashMap<>();
    content.put("status", "success");

    return content;
  }

  @GetMapping("user")
  public Object user(HttpSession session) throws Exception {

    Member loginUser = (Member) session.getAttribute("loginUser");

    HashMap<String, Object> content = new HashMap<>();

    if (loginUser != null) {
      content.put("status", "success");
      content.put("user", loginUser);
    } else {
      content.put("status", "fail");
    }
    return content;
  }

  @SuppressWarnings("rawtypes")
  @PostMapping("snsLogin")
  public Object snsLogin(int loginTypeNo, String token, HttpSession session,
      HttpServletResponse response) {
    HashMap<String, Object> content = new HashMap<>();

    Map LoginUser = null;

    if (loginTypeNo == 2) {
      LoginUser = facebookService.getLoginUser(token);
    } else if (loginTypeNo == 6) {
      LoginUser = naverService.getLoginUser(token);
    }
    
    if (LoginUser == null) {
      content.put("status", "tokenerr");
      content.put("message", "잘못된 토큰입니다.");
      return content;
    }

    String email = (String) LoginUser.get("email");
    String name = (String) LoginUser.get("name");


    Member member = memberService.get(email);
    if (member == null) {
      member = new Member();
      member.setEmail(email);
      member.setName(name);
      member.setPassword("snspassword");
      member.setLoginTypeNo(loginTypeNo);
      member.setCertification("sns-login");
     member.setPhoto("default.jpg");
      member.setRank(1);
      member.setBirth("0000-00-00");
      memberService.snsSignUp(member);
        System.out.println(member);
      session.setAttribute("loginUser", member);
      content.put("status", "success");
      content.put("member", member);
      return content;
    }else {
      if(memberService.get(email,loginTypeNo) == null) {
        content.put("status", "overlap");
        content.put("message", "일반회원이나 다른 SNS로 가입되어있습니다.");
        return content;
      }else {
        session.setAttribute("loginUser", member);
        content.put("status", "success");
        content.put("member", member);
        return content;
      }
    }

  }
  
  @PostMapping("relogin")
  public Object reLogin(HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");
    Member member = memberService.get(loginUser.getEmail());
    System.out.println("!!" +member);
    HashMap<String, Object> content = new HashMap<>();

    if (member == null) {
      content.put("status", "fail");
      content.put("message", "이메일이 없거나 암호가 맞지 않습니다.");
    } else if (member.getRank() == 0) {
      session.setAttribute("standby", loginUser.getEmail());
      content.put("status", "stand-by");

    } else {
      session.setAttribute("loginUser", member);
      System.out.println(member);
      content.put("status", "success");
    }

    return content;
  }



}


