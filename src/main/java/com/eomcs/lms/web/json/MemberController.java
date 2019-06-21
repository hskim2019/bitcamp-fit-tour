package com.eomcs.lms.web.json;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.eomcs.lms.domain.Member;
import com.eomcs.lms.service.MemberService;

@RestController("json/MemberController")
@RequestMapping("/json/member")
public class MemberController {
  
  @Autowired MemberService memberService;
  

  @PostMapping("add")
  public Object add(Member member) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
    try {
      memberService.add(member);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  @GetMapping("delete")
  public Object delete(int no) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (memberService.delete(no) == 0) 
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");
      
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
    
    
  
  }
  
  @GetMapping("detail")
  public Object detail(int no) {
    Member member  = memberService.get(no);
    return member;
  }
  
  @GetMapping("list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="3") int pageSize, 
      @RequestParam(defaultValue="9") int searchCategory,
      String search) {
    
//	  String searchWord = null;
//	  if (search.length() > 0) {
//		  searchWord = search;
//	  }
	  
//    if (pageSize < 3 || pageSize > 8) 
//      pageSize = 3;
	  
    if (pageSize < 10 || pageSize > 10) 
    pageSize = 10;
    
    int rowCount = memberService.size(searchCategory, search);
    System.out.println("rowCount: " + rowCount);
    int totalPage = rowCount / pageSize;
    if (totalPage == 0 || rowCount % pageSize > 0)
      totalPage++;
    
    if (pageNo < 1) 
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;
    
    List<Member> members = memberService.list(pageNo, pageSize, searchCategory, search);
    
    HashMap<String,Object> content = new HashMap<>();
    content.put("list", members);
    content.put("pageNo", pageNo);
    content.put("pageSize", pageSize);
    content.put("totalPage", totalPage);
    
    return content;
  }
  
  @PostMapping("update")
  public Object update(Member member, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");
    member.setNo(loginUser.getNo());
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (memberService.update(member) == 0) 
        throw new RuntimeException("해당 번호의 회원이 없습니다.");
      content.put("status", "success");
      
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  
  @PostMapping("updatePassword")
  public Object updatePassword(String password, String newPassword, HttpSession session) {
    
    Member loginUser = (Member) session.getAttribute("loginUser");
    HashMap<String,Object> content = new HashMap<>();
    HashMap<String,Object> paramMap = new HashMap<>();
    
    paramMap.put("password", password);
    paramMap.put("newPassword", newPassword);
    paramMap.put("no", loginUser.getNo());
    
    try {
      if (memberService.updatePassWord(paramMap) == 0) 
        throw new RuntimeException("비밀번호를 정확하게 입력해 주세요.");
      content.put("status", "success");
      
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  @GetMapping("withdrawal")
  public Object withdrawal(HttpSession session,String reason) {
    
    Member loginUser = (Member) session.getAttribute("loginUser");
    HashMap<String,Object> content = new HashMap<>();
    HashMap<String,Object> paramMap = new HashMap<>();
    
    paramMap.put("reason", reason);
    paramMap.put("memberNo", loginUser.getNo());
    
    try {
      if (memberService.withdrawal(paramMap) == 0) 
        throw new RuntimeException("회원 탈퇴중 오류 발생!");
      content.put("status", "success");
      
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  
  @PostMapping("photoupdate")
  public Object photoUpdate(HttpServletRequest request, HttpSession session, String photo) throws IOException, ServletException {
    
    System.out.println(photo);
    Member loginUser = (Member) session.getAttribute("loginUser");
    HashMap<String,Object> paramMap = new HashMap<String,Object>();
    HashMap<String,Object> content = new HashMap<String,Object>();
    
    if (photo == null) {
    
      Collection<Part> parts = request.getParts();
      String filename = null;
      for(Part part : parts) {
        filename = UUID.randomUUID().toString();
        String filepath = request.getServletContext().getRealPath("/upload/member/" + filename);
        part.write(filepath);
        try {
          makeThumbnail(filepath);
        } catch (Exception e) {
          System.out.println("썸네일 이미지만드는중 에러 발생");
          e.printStackTrace();
        }
        paramMap.put("photo", filename + "THUMB");
        paramMap.put("no", loginUser.getNo());
      }

      memberService.updatePhoto(paramMap);
      
      try {
          if (memberService.updatePhoto(paramMap) == 0) 
            throw new RuntimeException("프로필 사진변경중 오류발생");
          content.put("status", "success");
          content.put("photo", filename + "THUMB");
      } catch (Exception e) {
          content.put("status", "fail");
          content.put("message", e.getMessage());
      }
      return content;
    } 
    
    // update default photo
    paramMap.put("photo", photo);
    paramMap.put("no", loginUser.getNo());
    try {
      if (memberService.updatePhoto(paramMap) == 0) 
        throw new RuntimeException("프로필 사진변경중 오류발생");
      content.put("status", "success");
      content.put("photo", photo);
    } catch (Exception e) {
        content.put("status", "fail");
        content.put("message", e.getMessage());
    }
    return content;
  }
  
  private void makeThumbnail(String filePath) throws Exception {
    BufferedImage srcImg = ImageIO.read(new File(filePath)); 
    int dw = 170, dh = 150;  
    int ow = srcImg.getWidth(); 
    int oh = srcImg.getHeight();
    int nw = ow; 
    int nh = (ow * dh) / dw; 
    if(nh > oh) { nw = (oh * dw) / dh; nh = oh; } 
    BufferedImage cropImg = Scalr.crop(srcImg, (ow-nw)/2, (oh-nh)/2, nw, nh); 
    BufferedImage destImg = Scalr.resize(cropImg, dw, dh); 
    File thumbFile = new File(filePath + "THUMB"); 
    ImageIO.write(destImg, "jpg", thumbFile);
}
  
}
