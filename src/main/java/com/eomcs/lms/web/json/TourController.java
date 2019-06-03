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

  //Tour Detail
  @GetMapping("detail")
  public Object detail(int no) {
    HashMap<String, Object> map = new HashMap<>();
    Tour tour = tourService.get(no);
    map.put("tour", tour);
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
      int minHour,
      int maxHour,
      @RequestParam(value="theme[]", required=false, 
      defaultValue="자전거 투어, 야경 투어, 맛집 투어, 로컬 투어, 워킹 투어, 버스 투어, 반나절 투어, 종일 투어")List<String> theme,
      String orderby,
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

        for (String a : theme) {
        	System.out.println(a);
        }
    System.out.println(theme.size());
    
    int currMaxPrice = tourService.maxValue();
    if (maxPrice == 0) {
      maxPrice = currMaxPrice;
    }

    if (pageSize < 3 || pageSize > 8) 
      pageSize = 3;

    List<Tour> list = tourService.search(
        searchContinentName, searchCountryName, searchCityName, 
        minPrice, maxPrice, 
        minHour, maxHour,
        theme);
    int rowCount = list.size();
    //int rowCount = tourService.size();
    System.out.println("rowCount: " + rowCount);

    int totalPage = rowCount / pageSize;
    if (totalPage == 0 || rowCount % pageSize > 0)
      totalPage++;
    System.out.println("totalPage: " + totalPage);

    
    if (pageNo < 1) 
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;
    List<Tour> tours = tourService.list(
        searchContinentName, searchCountryName, searchCityName, 
        minPrice, maxPrice, 
        minHour, maxHour,
        theme,
        orderby,
        pageNo, pageSize);

    HashMap<String,Object> content = new HashMap<>();
    content.put("list", tours);
    content.put("pageNo", pageNo);
    content.put("pageSize", pageSize);
    content.put("totalPage", totalPage);
    content.put("rowCount", rowCount);
    content.put("currMaxPrice", currMaxPrice);

    return content;
  }


  //Tour Add
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

        String filename = UUID.randomUUID().toString();
        String filepath = request.getServletContext().getRealPath(("/upload/tourphoto/" + filename));
        System.out.println(filepath);
        part.write(filepath);

        try {
          makeThumbnail(filepath);
          makeThumbnail(filepath);
        } catch (Exception e) {
          System.out.println("썸네일 이미지만드는중 에러 발생");
          e.printStackTrace();
        }

        TourGuidancePhoto tourGuidancePhoto = new TourGuidancePhoto();
        tourGuidancePhoto.setName(filename + "THUMB");
        tourGuidancePhoto.setPath(filepath + "THUMB");
        photos.add(tourGuidancePhoto);
      }
    }

    System.out.println(tour);
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
  //Country List
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


  private void makeThumbnail(String filePath) throws Exception {
    BufferedImage srcImg = ImageIO.read(new File(filePath)); 
    int dw = 580, dh = 400;  
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