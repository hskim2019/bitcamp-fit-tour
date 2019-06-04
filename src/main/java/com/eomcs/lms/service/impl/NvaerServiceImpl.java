package com.eomcs.lms.service.impl;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.eomcs.lms.service.NaverService;
import com.fasterxml.jackson.databind.ObjectMapper;

// 스프링 IoC 컨테이너가 관리하는 객체 중에서 
// 비즈니스 로직을 담당하는 객체는 
// 특별히 그 역할을 표시하기 위해 @Component 대신에 @Service 애노테이션을 붙인다.
// 이렇게 애노테이션으로 구분해두면 나중에 애노테이션으로 객체를 찾을 수 있다.
@Service
public class NvaerServiceImpl implements NaverService {
  
  @SuppressWarnings({"rawtypes", "unchecked"})
  @Override
  public Map getLoginUser(String accessToken) {
    // Facebook의 Graph API 실행하기
    // => HTTP 요청을 할 때 스프링에서 제공하는 RestTemplate을 사용하라! 
    // 
    String header = "Bearer " + accessToken; // Bearer 다음에 공백 추가
    try {
      String apiURL = "https://openapi.naver.com/v1/nid/me";
      URL url = new URL(apiURL);
      HttpURLConnection con = (HttpURLConnection) url.openConnection();
      con.setRequestMethod("GET");
      con.setRequestProperty("Authorization", header);
      System.out.println(con.getURL().toString());
      int responseCode = con.getResponseCode();
      BufferedReader br;
      if (responseCode == 200) { // 정상 호출
        br = new BufferedReader(new InputStreamReader(con.getInputStream()));
      } else { // 에러 발생
        br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
      }
      String inputLine;
      StringBuffer response = new StringBuffer();
      while ((inputLine = br.readLine()) != null) {
        response.append(inputLine);
      }
      br.close();
      HashMap<String, Object> rs = new ObjectMapper().readValue(response.toString(), HashMap.class) ; 
      HashMap<String, Object> r2 =(HashMap)rs.get("response");
      
      return r2;
      
    } catch (Exception e) {
      System.out.println(e);
      return null;
    }
    
  }
}







