package com.eomcs.lms.domain;

public class Country {
	
	private int no;
	private String countryName;
	
	@Override
	public String toString() {
		return "Country [no=" + no + ", countryName=" + countryName + "]";
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public String getCountryName() {
		return countryName;
	}

	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}
	
}
