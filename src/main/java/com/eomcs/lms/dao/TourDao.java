package com.eomcs.lms.dao;

import java.util.List;
import java.util.Map;
import com.eomcs.lms.domain.City;
import com.eomcs.lms.domain.Country;
import com.eomcs.lms.domain.Tour;
import com.eomcs.lms.domain.TourComment;
import com.eomcs.lms.domain.TourGuidancePhoto;
import com.eomcs.lms.domain.TourTheme;

public interface TourDao {
  int insert(Tour tour);
  List<Tour> findAll(Map<String,Object> params);
  Tour findByNo(int no);
  int increaseCount(int no);
  int update(Tour tour);
  int delete(int no);
  int countAll();
  TourComment findComment();
  void insertTheme (List<TourTheme> theme);
  void insertPhoto (List<TourGuidancePhoto> photo);
  List<Country> findCountryByContinent(String continent);
  List<City> findCityByCountry(int countryNo);
  int findMaxPrice();
  List<Tour> findRegisteredCountryCity();
}







