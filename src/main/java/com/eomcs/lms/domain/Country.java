package com.eomcs.lms.domain;

public class Country {
	
	private int no;
	private String countryName;
	private String continentName;
	

	@Override
  public String toString() {
    return "Country [no=" + no + ", countryName=" + countryName + ", continentName=" + continentName
        + "]";
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


	public String getContinentName() {
		return continentName;
	}


	public void setContinentName(String continentName) {
		this.continentName = continentName;
	}
	
	
	
}
