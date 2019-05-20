package com.eomcs.lms.domain;

public class City {

	private int no;
	private int countryNo;
	private String cityName;
	

	@Override
	public String toString() {
		return "City [no=" + no + ", countryNo=" + countryNo + ", cityName=" + cityName + "]";
	}


	public int getNo() {
		return no;
	}


	public void setNo(int no) {
		this.no = no;
	}


	public int getCountryNo() {
		return countryNo;
	}


	public void setCountryNo(int countryNo) {
		this.countryNo = countryNo;
	}


	public String getCityName() {
		return cityName;
	}


	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	
	
}
