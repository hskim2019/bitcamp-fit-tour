package com.eomcs.lms.service;

import java.util.List;
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
	int pageNo, int pageSize);
	int add(Tour tour);
	Tour get(int no);
	int update(Tour tour);
	int delete(int no);
	int size();
	void addTheme(List<TourTheme> theme);
	void addPhoto(List<TourGuidancePhoto> photo);
	List<Country> listCountry(String continent);
	List<City> listCity(int countryNo);
	int maxValue();
}
