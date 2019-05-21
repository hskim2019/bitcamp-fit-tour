package com.eomcs.lms.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.eomcs.lms.dao.MemberDao;
import com.eomcs.lms.domain.Member;
import com.eomcs.lms.service.MemberService;
import com.eomcs.lms.util.MailUtils;
import com.eomcs.lms.util.TempKey;

// 스프링 IoC 컨테이너가 관리하는 객체 중에서 
// 비즈니스 로직을 담당하는 객체는 
// 특별히 그 역할을 표시하기 위해 @Component 대신에 @Service 애노테이션을 붙인다.
// 이렇게 애노테이션으로 구분해두면 나중에 애노테이션으로 객체를 찾을 수 있다.
@Service
public class MemberServiceImpl implements MemberService {
  
  MemberDao memberDao;
  @Autowired
  private JavaMailSender mailSender;
  
  public MemberServiceImpl(MemberDao memberDao) {
    this.memberDao = memberDao;
  }
  
  // 비지니스 객체에서 메서드 이름은 가능한 업무 용어를 사용한다.
  @Override
  public List<Member> list(int pageNo, int pageSize, String search) {
    
    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    params.put("search", search);
    
    return memberDao.findAll(params);
  }
  
  @Override
  public int add(Member member) {
    return memberDao.insert(member);
  }
  
  @Override
  public int signUp(Member member) throws Exception {
    String certification = new TempKey().getKey(50, false);
    member.setCertification(certification);
 // mail 작성 관련 

    MailUtils sendMail = new MailUtils(mailSender);

    sendMail.setSubject("[FIT-TOUR] 회원가입 이메일 인증");
    sendMail.setText(new StringBuffer().append("<h1>[안녕하세요 FIT TOUR입니다]</h1>")
        .append("<p>아래 링크를 클릭하시면 이메일 인증이 완료됩니다.</p>")
        .append("<a href='http://localhost:8080/bitcamp-fit-tour/app/json/signup/emailconfirm?")
        .append("email=")
        .append(member.getEmail())
        .append("&certification=")
        .append(certification)
        .append("' target='_blenk'>이메일 인증 확인</a>")
        .toString());
    sendMail.setFrom("FIT-TOUR", "FIT TOUR 자유여행");
    sendMail.setTo(member.getEmail());
    sendMail.send();
    return memberDao.signUp(member);
  }
  
  @Override
  public Member get(int no) {
    return memberDao.findByNo(no);
  }
  
  @Override
  public int update(Member member) {
    return memberDao.update(member);
  }
  
  @Override
  public int delete(int no) {
    return memberDao.delete(no);
  }
  
  @Override
  public Member get(String email, String password) {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("email", email);
    paramMap.put("password", password);
    
    return memberDao.findByEmailPassword(paramMap);
  }
  
  @Override
  public Member get(String email) {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("email", email);
   
    
    return memberDao.findByEmail(paramMap);
  }
  
  @Override
  public int size(String search) {
    return memberDao.countAll(search);
  }

  @Override
  public int confirm(String email, String certification) {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("email", email);
    paramMap.put("certification", certification);
    
   return memberDao.confirm(paramMap);
  }
}







