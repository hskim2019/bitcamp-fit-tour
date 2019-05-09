var param = location.href.split('?')[1];
if (param) {
  document.querySelector('h1').innerHTML = "회원 조회"
  loadData(param.split('=')[1])
  var el = document.querySelectorAll('.bit-new-item');
  for (e of el) {
    e.style.display = 'none';
  }
} else {
  document.querySelector('h1').innerHTML = "새 회원"
  var el = document.querySelectorAll('.bit-view-item');
  for (e of el) {
    e.style.display = 'none';
  }
}

document.querySelector('#add-btn').onclick = () => {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 || xhr.status != 200)
      return;
    
    var data = JSON.parse(xhr.responseText);
    
    if (data.status == 'success') {
      location.href = "index.html"
        
    } else {
      alert('등록 실패입니다!\n' + data.message)
    }
  };
  xhr.open('POST', '../../app/json/member/add', true)
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  var email = document.querySelector('#email').value;
  var password = document.querySelector('#password').value;
  var name = document.querySelector('#name').value;
  var nickname = document.querySelector('#nickname').value;
  var birth = document.querySelector('#birth').value;
  var smsCheck = document.querySelector('#smsCheck').value;
  var emailCheck = document.querySelector('#emailCheck').value;
  var phoneCheck = document.querySelector('#phoneCheck').value;
  var tel = document.querySelector('#tel').value;
  var rank = document.querySelector('#rank').value;
  var loginTypeNo = document.querySelector('#loginTypeNo').value;
  xhr.send("email=" + encodeURIComponent(email));
  xhr.send("password=" + encodeURIComponent(password));
  xhr.send("name=" + encodeURIComponent(name));
  xhr.send("birth=" + encodeURIComponent(birth));
  xhr.send("smsCheck=" + encodeURIComponent(smsCheck));
  xhr.send("emailCheck=" + encodeURIComponent(emailCheck));
  xhr.send("phoneCheck=" + encodeURIComponent(phoneCheck));
  xhr.send("tel=" + encodeURIComponent(tel));
  xhr.send("rank=" + encodeURIComponent(rank));
  xhr.send("loginTypeNo=" + encodeURIComponent(loginTypeNo));
};

document.querySelector('#delete-btn').onclick = () => {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 || xhr.status != 200)
      return;
    
    var data = JSON.parse(xhr.responseText);
    
    if (data.status == 'success') {
      location.href = "index.html"
        
    } else {
      alert('삭제 실패입니다!\n' + data.message)
    }
  };
  var no = document.querySelector('#no').value;
  xhr.open('GET', '../../app/json/member/delete?no=' + no, true)
  xhr.send();
};

document.querySelector('#update-btn').onclick = () => {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 || xhr.status != 200)
      return;
    
    var data = JSON.parse(xhr.responseText);
    
    if (data.status == 'success') {
      location.href = "index.html"
        
    } else {
      alert('변경 실패입니다!\n' + data.message)
    }
  };
  xhr.open('POST', '../../app/json/member/update', true)
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  var no = document.querySelector('#no').value;
  var email = document.querySelector('#email').value;
  var password = document.querySelector('#password').value;
  var name = document.querySelector('#name').value;
  var nickname = document.querySelector('#nickname').value;
  var birth = document.querySelector('#birth').value;
  var smsCheck = document.querySelector('#smsCheck').value;
  var emailCheck = document.querySelector('#emailCheck').value;
  var phoneCheck = document.querySelector('#phoneCheck').value;
  var tel = document.querySelector('#tel').value;
  var rank = document.querySelector('#rank').value;
  var loginTypeNo = document.querySelector('#loginTypeNo').value;
  var qs = 'name=' + encodeURIComponent(name) +
  '&email=' + encodeURIComponent(email) +
  '&password=' + encodeURIComponent(password) +
  '&nickname=' + encodeURIComponent(nickname) +
  '&birth=' + encodeURIComponent(birth) +
  '&smsCheck=' + encodeURIComponent(smsCheck) +
  '&emailCheck=' + encodeURIComponent(emailCheck) +
  '&tel=' + encodeURIComponent(tel) +
  '&phoneCheck=' + encodeURIComponent(phoneCheck) +
  '&loginTypeNo=' + encodeURIComponent(loginTypeNo) +
  '&photo=' + encodeURIComponent(photo)+
  
    '&no=' + no;
  
  xhr.send(qs);
  console.log(qs);
};

function loadData(no) {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 || xhr.status != 200)
      return;
    
    var data = JSON.parse(xhr.responseText);
    console.log(data);
    document.querySelector('#no').value = data.no;
    document.querySelector('#email').value = data.email;
    document.querySelector('#name').value = data.name;
    document.querySelector('#nickname').value = data.nickname;
    document.querySelector('#birth').value = data.birth;
    document.querySelector('#smsCheck').value = data.smsCheck;
    document.querySelector('#emailCheck').value = data.emailCheck;
    document.querySelector('#phoneCheck').value = data.phoneCheck;
    document.querySelector('#tel').value = data.tel;
    document.querySelector('#registeredDate').value = data.registeredDate;
    document.querySelector('#rank').value = data.rank;
    document.querySelector('#loginTypeNo').value = data.loginTypeNo;
    document.querySelector('#photo').value = data.photo;
  

  };
  xhr.open('GET', '../../app/json/member/detail?no=' + no, true)
  xhr.send()
}







