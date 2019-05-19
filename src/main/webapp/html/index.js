  
  // 웹 페이지에 header.html을 삽입했으면 로그인 정보를 가져와 설정한다.
  loadLoginUser();
  
  // 로그아웃 버튼의 click 리스너를 등록한다.
  document.querySelector('#logout-menu').addEventListener('click', (e) => {
    e.preventDefault();
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4 || xhr.status != 200)
        return;
       sessionStorage.clear();
      location.href = '/bitcamp-fit-tour/html/index.html';
      
    };
    xhr.open('GET', '/bitcamp-fit-tour/app/json/auth/logout', true)
    xhr.send()
  });

// header.html이 웹 페이지에 삽입된 후 로그인 정보를 받아온다. 
function loadLoginUser() {

  // 서버에서 로그인 한 사용자 정보를 가져온다.
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 || xhr.status != 200)
      return;
    
    
    var data = JSON.parse(xhr.responseText);
    

    var loginState = document.querySelector('#bit-login-state'),
        notLoginState = document.querySelector('#bit-not-login-state');
    
    if (data.status == 'success') {
      sessionStorage.setItem('loginUser',JSON.stringify(data.user));
      
      loginState.className = 
        loginState.className.replace('bit-invisible', '');
      document.querySelector('#login-username').innerHTML = data.user.name;
      
      if(data.user.photo){
        document.querySelector('#login-userphoto').src = 
          "/bitcamp-fit-tour/upload/member/" + data.user.photo;
      }
      
    } else {
      notLoginState.className = 
        notLoginState.className.replace('bit-invisible', '');
    }
    
    //console.log(document.querySelector('#bit-login-state').className);
  };
  xhr.open('GET', '/bitcamp-fit-tour/app/json/auth/user', true)
  xhr.send()
}








