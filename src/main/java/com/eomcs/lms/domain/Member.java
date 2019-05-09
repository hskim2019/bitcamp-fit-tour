package com.eomcs.lms.domain;
import java.io.Serializable;
import java.sql.Date;

public class Member implements Cloneable, Serializable {
  private static final long serialVersionUID = 1L;
  
  private int no;
  private String email;
  private String password;
  private String name;
  private String nickname;
  private String birth;
  private boolean smsCheck;
  private boolean emailCheck;
  private int tel;
  private Date registeredDate;
  private boolean phoneCheck;
  private int rank;
  private int loginTypeNo;
  
  @Override
  public String toString() {
    return "Member [no=" + no + ", email=" + email + ", password=" + password + ", name=" + name
        + ", nickname=" + nickname + ", birth=" + birth + ", smsCheck=" + smsCheck + ", emailCheck="
        + emailCheck + ", tel=" + tel + ", registeredDate=" + registeredDate + ", phoneCheck="
        + phoneCheck + ", rank=" + rank + ", loginTypeNo=" + loginTypeNo + "]";
  }
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getNickname() {
    return nickname;
  }
  public void setNickname(String nickname) {
    this.nickname = nickname;
  }
  public String getBirth() {
    return birth;
  }
  public void setBirth(String birth) {
    this.birth = birth;
  }
  public boolean isSmsCheck() {
    return smsCheck;
  }
  public void setSmsCheck(boolean smsCheck) {
    this.smsCheck = smsCheck;
  }
  public boolean isEmailCheck() {
    return emailCheck;
  }
  public void setEmailCheck(boolean emailCheck) {
    this.emailCheck = emailCheck;
  }
  public int getTel() {
    return tel;
  }
  public void setTel(int tel) {
    this.tel = tel;
  }
  public Date getRegisteredDate() {
    return registeredDate;
  }
  public void setRegisteredDate(Date registeredDate) {
    this.registeredDate = registeredDate;
  }
  public boolean isPhoneCheck() {
    return phoneCheck;
  }
  public void setPhoneCheck(boolean phoneCheck) {
    this.phoneCheck = phoneCheck;
  }
  public int getRank() {
    return rank;
  }
  public void setRank(int rank) {
    this.rank = rank;
  }
  public int getLoginTypeNo() {
    return loginTypeNo;
  }
  public void setLoginTypeNo(int loginTypeNo) {
    this.loginTypeNo = loginTypeNo;
  }
  

  
  
}
