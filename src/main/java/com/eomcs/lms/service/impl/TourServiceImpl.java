package com.eomcs.lms.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.eomcs.lms.dao.TourDao;
import com.eomcs.lms.domain.City;
import com.eomcs.lms.domain.Country;
import com.eomcs.lms.domain.Tour;
import com.eomcs.lms.domain.TourGuidancePhoto;
import com.eomcs.lms.domain.TourTheme;
import com.eomcs.lms.service.TourService;;

// 스프링 IoC 컨테이너가 관리하는 객체 중에서 
// 비즈니스 로직을 담당하는 객체는 
// 특별히 그 역할을 표시하기 위해 @Component 대신에 @Service 애노테이션을 붙인다.
// 이렇게 애노테이션으로 구분해두면 나중에 애노테이션으로 객체를 찾을 수 있다.
@Service
public class TourServiceImpl implements TourService {
  
  TourDao tourDao;
  
  public TourServiceImpl(TourDao tourDao) {
    this.tourDao = tourDao;
  }
  
  // 비지니스 객체에서 메서드 이름은 가능한 업무 용어를 사용한다.
  @Override
  public List<Tour> list(
		  String continentName,
		  String countryName,
		  String cityName,
		  int minPrice, int maxPrice,
		  int minHour, int maxHour,
		  List<String> theme,
		  String keyword,
		  String orderby,
		  int pageNo, int pageSize
		  ) {
    // 게시물 목록을 가져오는 경우 서비스 객체에서 특별하게 할 일이 없다.
    // 그럼에도 불구하고 Command 객체와 DAO 사이에 Service 객체를 두기로 했으면 
    // 일관성을 위해 Command 객체는 항상 Service 객체를 통해 데이터를 다뤄야 한다.
    // 
    
    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    params.put("minPrice", minPrice);
    params.put("maxPrice", maxPrice);
    params.put("minHour", minHour);
    params.put("maxHour", maxHour);
    params.put("theme", theme);
    params.put("keyword", keyword);
    
    System.out.println("orderby;;;;;" + orderby);
    switch (orderby) {
    case "priceAsc" : params.put("priceAsc", orderby); break;
    case "priceDesc" : params.put("priceDesc", orderby); break;
    case "tourDesc" : params.put("tourDesc", orderby); break;
    case "wishlistDesc" : params.put("wishlistDesc", orderby); break;
    case "reviewDesc" : params.put("reviewDesc", orderby); break;
    }
    
    
    if (continentName == null && countryName == null && cityName == null) {
    	return tourDao.findAll(params);
    } else {
    	System.out.println("continentname: " + continentName + "countryname: " + countryName + "cityname: " + cityName);
    	if (continentName != null) {
    		params.put("continentName", continentName);
    	}
    	
    	if (countryName != null) {
    		params.put("countryName", countryName);
    	}
    	if (cityName != null) {
    		params.put("cityName", cityName);
    	}
    	
    	return tourDao.findAll(params);
    }
  }
  
  
  public List<Tour> search(
		  String continentName,
		  String countryName,
		  String cityName,
		  int minPrice, int maxPrice,
		  int minHour, int maxHour,
		  List<String> theme,
		  String keyword
		  ) {
    
    HashMap<String,Object> params = new HashMap<>();
    params.put("minPrice", minPrice);
    params.put("maxPrice", maxPrice);
    params.put("minHour", minHour);
    params.put("maxHour", maxHour);
    params.put("theme", theme);
    
    if (continentName == null && countryName == null && cityName == null) {
    	return tourDao.findAll(params);
    } else {
    	
    	if (continentName != null) {
    		params.put("continentName", continentName);
    	}
    	
    	if (countryName != null) {
    		params.put("countryName", countryName);
    	}
    	if (cityName != null) {
    		params.put("cityName", cityName);
    	}
    	
    	return tourDao.findAll(params);
    }
  }
  
  @Override
  public int add(Tour tour) {
    return tourDao.insert(tour);
  }
  
  @Override
  public int addTheme(List<TourTheme> theme) {
    return tourDao.insertTheme(theme);
  }
  
  @Override
  public int addPhoto(List<TourGuidancePhoto> photo) {
    return tourDao.insertPhoto(photo);
  }
  
  @Override
  public int addWishlist(Map<String, Object> paramMap) {
    return tourDao.insertWishlist(paramMap);
  }
  
  @Override
  public Tour get(int no) {
    Tour tour = tourDao.findByNo(no);
    return tour;
  }
  
  @Override
  public int update(Tour tour) {
    return tourDao.update(tour);
  }
  
  @Override
  public int delete(int no) {
    // 이 메서드도 그냥 DAO에 명령을 전달하는 일을 한다.
    // 그래도 항상 Command 객체는 이 Service 객체를 통해서 데이터를 처리해야 한다.
    return tourDao.delete(no);
  }
  
  @Override
  public int size() {
    // 전체 게시물의 개수
    return tourDao.countAll();
  }

  @Override
  public List<Country> listCountry(String continent) {
    return tourDao.findCountryByContinent(continent);
  }

  @Override
  public List<City> listCity(int countryNo) {
    return tourDao.findCityByCountry(countryNo);
  }

  @Override
	public int maxValue() {
		return tourDao.findMaxPrice();
	}

  @Override
	public List<Tour> registeredcountry(String continent) {
		return tourDao.findRegisteredCountry(continent);
	}
  
  @Override
	public List<Tour> registeredcity(String country) {
		return tourDao.findRegisteredCity(country);
	}

  @Override
  public int countWishlist(Map<String, Object> paramMap) {
    return tourDao.countWishlist(paramMap);
  }
  
  @Override
  public int deleteWishlist(Map<String, Object> paramMap) {
    return tourDao.deleteWishlist(paramMap);
  }
  
  @Override
  public List<String> findWishlistCityName(int memberNo) {
    return tourDao.findWishlistCityName(memberNo);
  }
  
  @Override
  public List<Tour> findTourByCityname(Map<String, Object> paramMap) {
    return tourDao.findTourByCityname(paramMap);
  }

  @Override
  public List<Tour> findTourLately() {
    return tourDao.findTourLately();
  }

  @Override
  public List<String> findWishlistByMemberNo(int memberNo) {
    return tourDao.findWishlistByMemberNo(memberNo);
  }

  @Override
  public List<City> findCity() {
    return tourDao.findCity();
  }

  @Override
  public List<Country> findCountry() {
    return tourDao.findCountry();
  }

}







