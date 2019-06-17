package com.eomcs.lms.service.impl;

import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import com.eomcs.lms.dao.MemberDao;
import com.eomcs.lms.domain.Member;
import com.eomcs.lms.service.MailService;
import com.eomcs.lms.util.MailUtils;

// 스프링 IoC 컨테이너가 관리하는 객체 중에서 
// 비즈니스 로직을 담당하는 객체는 
// 특별히 그 역할을 표시하기 위해 @Component 대신에 @Service 애노테이션을 붙인다.
// 이렇게 애노테이션으로 구분해두면 나중에 애노테이션으로 객체를 찾을 수 있다.
@Service
public class MailServiceImpl implements MailService {
  
  MemberDao memberDao;
  @Autowired
  private JavaMailSender mailSender;
  
  public MailServiceImpl(MemberDao memberDao) {
    this.memberDao = memberDao;
  }
  
  private void passwordTemp(MailUtils sendMail, String email, String temp) throws Exception {
    sendMail.setSubject("[FIT-TOUR] 안녕하세요 임시 비밀번호입니다.");
    sendMail.setText(new StringBuffer().append("<h1>[안녕하세요 FIT TOUR입니다]</h1><br><br><br>")
        .append("<p>아래의 임시 비밀번호를 사용하여 로그인 하신후 비밀변호 변경 하시기 바랍니다.</p><br><br><br>")
        .append(temp)
        .append("<br><br> 원하는 여행을 찾기 바랍니다.")
        .toString());
    sendMail.setFrom("FIT-TOUR", "FIT TOUR 자유여행");
    sendMail.setTo(email);
    sendMail.send();
    
  }
  
  private void emailSend(MailUtils sendMail, String email, String certification) throws Exception {
    sendMail.setSubject("[FIT-TOUR] 회원가입 이메일 인증");
    sendMail.setText(new StringBuffer().append("<h1>[안녕하세요 FIT TOUR입니다]</h1><br><br><br>")
        .append("<p>아래 링크를 클릭하시면 이메일 인증이 완료됩니다.</p><br><br><br>")
        .append("<a href='http://team1.bitcamp.co.kr:8080/bitcamp-fit-tour/app/json/signup/emailconfirm?")
        .append("email=")
        .append(email)
        .append("&certification=")
        .append(certification)
        .append("' target='_blenk'>이메일 인증 확인</a>")
        .toString());
    sendMail.setFrom("FIT-TOUR", "FIT TOUR 자유여행");
    sendMail.setTo(email);
    sendMail.send();
    
  }
  
  @Async  // 회원가입 이메일 비동기 처리 
  @Override
  public void sandTemp(Member member) throws Exception {
    MailUtils sendMail = new MailUtils(mailSender);

    passwordTemp(sendMail,member.getEmail(),member.getPassword());
    
    
  }
  

  @Async  // 회원가입 이메일 비동기 처리 
  @Override
  public void sandSignUp(Member member) throws Exception {
    MailUtils sendMail = new MailUtils(mailSender);

    emailSend(sendMail,member.getEmail(),member.getCertification());
    
    
  }
  
  @Override
  public void reEamil(String email) throws Exception {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("email", email);
   Member member =  memberDao.findByEmail(paramMap);
   MailUtils sendMail = new MailUtils(mailSender);
 
   emailSend(sendMail,member.getEmail(),member.getCertification());
   
  }

}







