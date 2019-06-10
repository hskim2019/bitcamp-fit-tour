package com.eomcs.lms.web.json;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eomcs.lms.domain.Faq;
import com.eomcs.lms.service.FaqService;

// AJAX 기반 JSON 데이터를 다루는 컨트롤러
@RestController("json/FaqController")
@RequestMapping("/json/faq")
public class FaqController {
  
  @Autowired FaqService faqService;
  
//  @PostMapping("add")
//  public Object add(Faq faq) {
//	  System.out.println(faq);
//    HashMap<String,Object> content = new HashMap<>();
//    try {
//      faqService.add(faq);
//      content.put("status", "success");
//    } catch (Exception e) {
//      content.put("status", "fail");
//      content.put("message", e.getMessage());
//    }
//    return content;
//  }
  
//  @GetMapping("delete")
//  public Object delete(int no) {
//  
//    HashMap<String,Object> content = new HashMap<>();
//    try {
//      if (faqService.delete(no) == 0) 
//        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
//      content.put("status", "success");
//      
//    } catch (Exception e) {
//      content.put("status", "fail");
//      content.put("message", e.getMessage());
//    }
//    return content;
//  }
//  
  @GetMapping("detail")
  public Object detail(int no) {
    Faq faq = faqService.get(no);
    return faq;
  }
  
  @GetMapping("list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="3") int pageSize) {
    
    if (pageSize < 3 || pageSize > 8) 
      pageSize = 3;
    
    int rowCount = faqService.size();
    int totalPage = rowCount / pageSize;
    if (rowCount % pageSize > 0)
      totalPage++;
    
    if (pageNo < 1) 
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;
    
    List<Faq> faqs = faqService.list(pageNo, pageSize);
    
    HashMap<String,Object> content = new HashMap<>();
    content.put("faqlist", faqs);
    content.put("faqpageNo", pageNo);
    content.put("faqpageSize", pageSize);
    content.put("faqtotalPage", totalPage);
    
    return content;
  }
  
//  @PostMapping("update")
//  public Object update(Faq faq) {
//    HashMap<String,Object> content = new HashMap<>();
//    try {
//      if (faqService.update(faq) == 0) 
//        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
//      content.put("status", "success");
//      
//    } catch (Exception e) {
//      content.put("status", "fail");
//      content.put("message", e.getMessage());
//    }
//    return content;
//  }


}

