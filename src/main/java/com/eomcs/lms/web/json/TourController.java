package com.eomcs.lms.web.json;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.eomcs.lms.domain.City;
import com.eomcs.lms.domain.Country;
import com.eomcs.lms.domain.Theme;
import com.eomcs.lms.domain.Tour;
import com.eomcs.lms.domain.TourComment;
import com.eomcs.lms.domain.TourGuidancePhoto;
import com.eomcs.lms.domain.TourTheme;
import com.eomcs.lms.service.TourCommentService;
import com.eomcs.lms.service.TourService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController("json/TourController")
@RequestMapping("/json/tour")
public class TourController {

    @Autowired TourService tourService;
    @Autowired TourCommentService tourCommentService;

    //tourDetail
    @GetMapping("detail")
    public Object detail(int no,
            @RequestParam(defaultValue="1") int pageNo,
            @RequestParam(defaultValue="3") int pageSize,
            @RequestParam(defaultValue="0") int addDeleteCount) {

        if (pageSize < 3 || pageSize > 8) 
            pageSize = 3;

        int rowCount = tourCommentService.countCommentbyTourNo(no, 0);
        int totalPage;

        if(rowCount == 0) {
            totalPage = 0;
            pageSize = 0;
        } else {

            totalPage = rowCount / pageSize;
            if (rowCount % pageSize > 0)
                totalPage++;
        }

        //    if (pageNo < 1) 
        //      pageNo = 1;
        //    else if (pageNo > totalPage)
        //      pageNo = totalPage;


        HashMap<String, Object> map = new HashMap<>();
        Tour tour = tourService.get(no);
        List<TourComment> tourComments = tourCommentService.get(no, pageNo, pageSize, addDeleteCount, 0);
        int commentAmount = tourCommentService.countCommentbyTourNo(no, 0);

        map.put("pageNo", pageNo);
        map.put("pageSize", pageSize);
        map.put("totalPage", totalPage);
        map.put("tour", tour);
        map.put("commentAmount", commentAmount);
        map.put("tourComment", tourComments);

        return map;
    }

    //tourList
    @GetMapping("list")
    public Object list(
            String continentName,
            String countryName,
            String cityName,
            @RequestParam(defaultValue="0") int minPrice,
            int maxPrice,
            @RequestParam(defaultValue="1") int pageNo,
            @RequestParam(defaultValue="3") int pageSize) {

        String searchContinentName = null;
        String searchCountryName = null;
        String searchCityName = null;
        
        if (continentName.length() > 0) { 
            searchContinentName = continentName;
        }
        
        if (countryName.length() > 0) {
            searchCountryName = countryName;
        }
        if (cityName.length() > 0) {
            searchCityName = cityName;
        }
        
        int currMaxPrice = tourService.maxValue();
        if (maxPrice == 0) {
            maxPrice = currMaxPrice;
        }
        
        if (pageSize < 3 || pageSize > 8) 
            pageSize = 3;

        int rowCount = tourService.size();
        int totalPage = rowCount / pageSize;
        if (rowCount % pageSize > 0)
            totalPage++;

        if (pageNo < 1) 
            pageNo = 1;
        else if (pageNo > totalPage)
            pageNo = totalPage;

        List<Tour> tours = tourService.list(searchContinentName, searchCountryName, searchCityName, minPrice, maxPrice, pageNo);
        
        HashMap<String,Object> content = new HashMap<>();
        content.put("list", tours);
        content.put("pageNo", pageNo);
        //content.put("pageSize", pageSize);
        content.put("totalPage", totalPage);

        return content;
    }
    
//  @PostMapping("add")
//  public Object add(/* HttpServletRequest request, */Tour tour, String themeJson) throws IOException, ServletException {
//       ObjectMapper mapper = new ObjectMapper();
//       JavaType type = mapper.getTypeFactory().constructCollectionType(ArrayList.class, Theme.class);
//       ArrayList<Theme> list = mapper.readValue(themeJson, type);
//       System.out.println(list);
//       System.out.println(tour);
//       System.out.println(themeJson);
//    /*
//     * StringBuffer json = new StringBuffer(); String line = null;
//     * 
//     * try { BufferedReader reader = request.getReader(); while((line = reader.readLine()) != null)
//     * { json.append(line); }
//     * 
//     * System.out.println(json); }catch(Exception e) {
//     * System.out.println("Error reading JSON string: " + e.toString()); }
//     */
//        
//        
//        tour.setTitle("투어123");
//        tour.setSubHeading("안녕");
//        tour.setTotalHour(30);
//        tour.setHashTag(UUID.randomUUID().toString().substring(0, 5));
//        tour.setPersonnel(5);
//        tour.setTransportation("버스");
//        tour.setPrice(300000);
//        tour.setCityNo(1);
//         
//        
//      HashMap<String,Object> content = new HashMap<String,Object>();
//      try {
//        tourService.add(tour);
//        tourService.addTheme(tour.getNo(), 1);
//        content.put("status", "success");
//      } catch (Exception e) {
//        content.put("status", "fail");
//        content.put("message", e.getMessage());
//      }
//      return content;
//    }
    
@PostMapping("add")
public Object add(HttpServletRequest request /*,@RequestBody String json*/) throws IOException, ServletException {
     Tour tour = new Tour();
     List<TourGuidancePhoto> photos = new ArrayList<>();
     
     Collection<Part> parts = request.getParts();
     for(Part part : parts) {
       if (part.getContentType() == null) {
         ObjectMapper mapper = new ObjectMapper();
         tour = mapper.readValue(URLDecoder.decode(request.getParameter(part.getName()), "UTF-8"), Tour.class);
         tour.setHashTag(UUID.randomUUID().toString().substring(0, 5));
         System.out.println(tour);
         
       } else if (part.getSize() > 0) {
         
         
         
         String filename = UUID.randomUUID().toString() + ".jpg";
         String filepath = request.getServletContext().getRealPath(("/upload/tourphoto/" + filename + ".jpg"));
         part.write(filepath+".jpg");
         
         //makeThumbnail(filepath+".jpg", filename+".jpg", );
         
         TourGuidancePhoto tourGuidancePhoto = new TourGuidancePhoto();
         tourGuidancePhoto.setName(filename + "thumbnail.jpg");
         tourGuidancePhoto.setPath(filepath + "thumbnail.jpg");
         photos.add(tourGuidancePhoto);
       }
     }
     
     HashMap<String,Object> content = new HashMap<String,Object>();
     
     try {
       tourService.add(tour);
       List<Theme> themes = tour.getTheme();
       List<TourTheme> TourThemes = new ArrayList<>();
       for(Theme theme : themes ) {
         TourTheme tourTheme = new TourTheme();
         tourTheme.setTourNo(tour.getNo());
         tourTheme.setThemeNo(theme.getNo());
         TourThemes.add(tourTheme);
       }
       tourService.addTheme(TourThemes);
       
       for(TourGuidancePhoto tourGuidance : photos) {
         tourGuidance.setTourNo(tour.getNo());
       }
       tourService.addPhoto(photos);
       
       content.put("status", "success");
       content.put("tourNo", tour.getNo());
     } catch (Exception e) {
       content.put("status", "fail");
       content.put("message", e.getMessage());
     }
     return content;
}
  
  @GetMapping("countrylist")
  public Object countryList(String continent) {
    
    List<Country> countryList =tourService.listCountry(continent);
    HashMap<String,Object> content = new HashMap<String,Object>();
    content.put("countryList", countryList);
    return content;
  }
  
  @GetMapping("citylist")
  public Object cityList(int countryNo) {
    
    List<City> cityList =tourService.listCity(countryNo);
    HashMap<String,Object> content = new HashMap<String,Object>();
    content.put("cityList", cityList);
    return content;
  }

    //  tourUpdate
    //  @PostMapping("update")
    //  public Object update(Tour tour) {
    //    HashMap<String,Object> content = new HashMap<>();
    //    try {
    //      if (tourService.update(tour) == 0) 
    //        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
    //      content.put("status", "success");
    //      
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
  //      if (tourService.delete(no) == 0) 
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
  
  
//  private void makeThumbnail(String filePath, String fileName, String fileExt) throws Exception {
//    // 저장된 원본파일로부터 BufferedImage 객체를 생성합니다. 
//    BufferedImage srcImg = ImageIO.read(new File(filePath)); 
//    // 썸네일의 너비와 높이 입니다. 
//    int dw = 250, dh = 150; // 원본 이미지의 너비와 높이 입니다. 
//    int ow = srcImg.getWidth(); 
//    int oh = srcImg.getHeight(); // 원본 너비를 기준으로 하여 썸네일의 비율로 높이를 계산합니다.
//    int nw = ow; 
//    int nh = (ow * dh) / dw; // 계산된 높이가 원본보다 높다면 crop이 안되므로 // 원본 높이를 기준으로 썸네일의 비율로 너비를 계산합니다. 
//    if(nh > oh) { nw = (oh * dw) / dh; nh = oh; } // 계산된 크기로 원본이미지를 가운데에서 crop 합니다.
//    BufferedImage cropImg = Scalr.crop(srcImg, (ow-nw)/2, (oh-nh)/2, nw, nh); // crop된 이미지로 썸네일을 생성합니다.
//    BufferedImage destImg = Scalr.resize(cropImg, dw, dh); // 썸네일을 저장합니다. 이미지 이름 앞에 "THUMB_" 를 붙여 표시했습니다.
//    String thumbName = PATH + "THUMB_" + fileName; 
//    File thumbFile = new File(thumbName); 
//    ImageIO.write(destImg, fileExt.toUpperCase(), thumbFile); 
//    }
  

}
