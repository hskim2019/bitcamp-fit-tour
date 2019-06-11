package com.eomcs.lms.service;

import java.util.List;
import java.util.Map;
import com.eomcs.lms.domain.City;
import com.eomcs.lms.domain.Country;
import com.eomcs.lms.domain.Tour;
import com.eomcs.lms.domain.TourGuidancePhoto;
import com.eomcs.lms.domain.TourTheme;

public interface TourService {
	List<Tour> list(
	String continentName,
	String countryName,
	String cityName,
	int minPrice, 
	int maxPrice,
	int minHour,
	int maxHour,
	List<String> theme,
	String orderby,
	int pageNo, int pageSize
	);
	int add(Tour tour);
	Tour get(int no);
	int update(Tour tour);
	int delete(int no);
	int size();
	int addTheme(List<TourTheme> theme);
	int addPhoto(List<TourGuidancePhoto> photo);
	int addWishlist (Map<String, Object> paramMap);
	int countWishlist (Map<String, Object> paramMap);
	int deleteWishlist (Map<String, Object> paramMap);
	List<Country> listCountry(String continent);
	List<City> listCity(int countryNo);
	int maxValue();
	List<Tour> search(
	String continentName,
	String countryName,
	String cityName,
	int minPrice, 
	int maxPrice,
	int minHour,
	int maxHour,
	List<String> theme
	);
	List<Tour> registeredcountry(String continent);
	List<Tour> registeredcity(String country);
	
}
