package com.eomcs.lms.conf;

import java.util.Properties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

// DispatcherServlet의 IoC 컨테이너가 준비해야 할 객체에 대한 정보.
// => app-servlet.xml의 설정을 이 클래스가 대체한다.
// 

/*
@Configuration 
public class MailConfig {
  
  @Bean
  public JavaMailSender getJavaMailSender() {
      JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
      mailSender.setHost("smtp.gmail.com");
      mailSender.setPort(587);
       
      mailSender.setUsername("fittour8253@gmail.com");
      mailSender.setPassword("qlxmzoavm1");
      mailSender.setDefaultEncoding("UTF-8");
     
      
      
       
      Properties props = mailSender.getJavaMailProperties();
      props.put("mail.transport.protocol", "smtp");
      props.put("mail.smtp.auth", "true");
      props.put("mail.smtp.starttls.enable", "true");
      props.put("mail.debug", "true");
       
      return mailSender;
  }
  

}
*/








