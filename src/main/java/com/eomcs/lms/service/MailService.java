package com.eomcs.lms.service;

import com.eomcs.lms.domain.Member;

public interface MailService {
  
  void sandSignUp(Member member) throws Exception;

  void reEamil(String email) throws Exception;

  void sandTemp(Member member) throws Exception;
  
}
