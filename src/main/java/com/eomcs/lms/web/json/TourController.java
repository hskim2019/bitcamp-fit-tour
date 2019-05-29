package com.eomcs.lms.web.json;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;

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

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.name.Rename;

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

		List<Tour> tours = tourService.list(
				searchContinentName, searchCountryName, searchCityName, 
				minPrice, maxPrice
				, pageNo
//				, pageSize
				);
        
		HashMap<String,Object> content = new HashMap<>();
		content.put("list", tours);
		content.put("pageNo", pageNo);
//		content.put("pageSize", pageSize);
		content.put("totalPage", totalPage);
		content.put("currMaxPrice", currMaxPrice);

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
         
         
         
         String filename = UUID.randomUUID().toString();
         String filepath = request.getServletContext().getRealPath(("/upload/tourphoto/" + filename));
         part.write(filepath+".jpg");
         
//         File image = new File(filepath);
//         File thumbnail = new File(filepath + "thumbnail");
//         if (image.exists()) {
//           System.out.println("exists()");
//           Thumbnails.of(image).size(530, 400).outputFormat("jpg").toFile(thumbnail);
//         }
         
         Thumbnails.of(filepath+".jpg")
         .size(380, 400)
         .outputFormat("jpg").width(100).height(100)
         .toFiles(Rename.PREFIX_DOT_THUMBNAIL);
         
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

  
}
