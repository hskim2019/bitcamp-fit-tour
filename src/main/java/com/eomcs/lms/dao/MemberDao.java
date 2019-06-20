// 프록시 패턴 적용 - MemberDao에서 인터페이스를 추출한다.
package com.eomcs.lms.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.eomcs.lms.domain.Member;

public interface MemberDao {
  int insert(Member member);
  int signUp(Member member);
  int snsSignUp(Member member);
  List<Member> findAll(Map<String,Object> paramMap);
  Member findByNo(int no);
  Member findByEmailPassword(Map<String,Object> paramMap);
  Member findByEmailLoginTypeNo(HashMap<String, Object> paramMap);
  Member findByEmail(Map<String,Object> paramMap);
  int update(Member member);
  int delete(int no);
 // int countAll(String search);
  int countAll(HashMap<String,Object> paramMap);
  int confirm(Map<String,Object> paramMap);
  int updatePassWord(Map<String,Object> paramMap);
  int updatePhoto(Map<String,Object> paramMap);
  int withdrawal(Map<String,Object> paramMap);
  int tempPassWord(Member member);
}







