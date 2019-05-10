package com.eomcs.lms.domain;
import java.io.Serializable;
import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

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
  private boolean phoneCheck;
  private String tel;
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date registeredDate;
  private LoginType loginType; 
  
  private int rank;
  private int loginTypeNo;
  private String photo;
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
  public boolean isPhoneCheck() {
    return phoneCheck;
  }
  public void setPhoneCheck(boolean phoneCheck) {
    this.phoneCheck = phoneCheck;
  }
  public String getTel() {
    return tel;
  }
  public void setTel(String tel) {
    this.tel = tel;
  }
  public Date getRegisteredDate() {
    return registeredDate;
  }
  public void setRegisteredDate(Date registeredDate) {
    this.registeredDate = registeredDate;
  }
  public LoginType getLoginType() {
    return loginType;
  }
  public void setLoginType(LoginType loginType) {
    this.loginType = loginType;
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
  public String getPhoto() {
    return photo;
  }
  public void setPhoto(String photo) {
    this.photo = photo;
  }
  @Override
  public String toString() {
    return "Member [no=" + no + ", email=" + email + ", password=" + password + ", name=" + name
        + ", nickname=" + nickname + ", birth=" + birth + ", smsCheck=" + smsCheck + ", emailCheck="
        + emailCheck + ", phoneCheck=" + phoneCheck + ", tel=" + tel + ", registeredDate="
        + registeredDate + ", loginType=" + loginType + ", rank=" + rank + ", loginTypeNo="
        + loginTypeNo + ", photo=" + photo + "]";
  }
 

  
}
