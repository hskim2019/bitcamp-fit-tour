package com.eomcs.lms.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.eomcs.lms.dao.TourDao;
import com.eomcs.lms.domain.City;
import com.eomcs.lms.domain.Country;
import com.eomcs.lms.domain.ImposibilityDate;
import com.eomcs.lms.domain.Tour;
import com.eomcs.lms.domain.TourGuidancePhoto;
import com.eomcs.lms.domain.TourTheme;
import com.eomcs.lms.service.TourService;;

@Service
public class TourServiceImpl implements TourService {
  
  TourDao tourDao;
  
  public TourServiceImpl(TourDao tourDao) {
    this.tourDao = tourDao;
  }
  
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
    params.put("keyword", keyword);
    
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
    return tourDao.delete(no);
  }
  
  @Override
  public int size() {
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

  @Override
  public int addImposibilityDate(List<ImposibilityDate> imposibilityDate) {
    return tourDao.insertImposibilityDate(imposibilityDate);
  }

}







