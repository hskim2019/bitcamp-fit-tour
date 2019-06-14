if (window.localStorage.getItem('email')) {
  // document.querySelector('#email').value = localStorage.getItem('email')
  $('#email').val(localStorage.email)
}
//$('#naverIdLogin').hide();
$('#naver-btn').click(() => {
  alert('hh')

});

$('#login-btn').click(() => {
  if (document.querySelector('#saveEmail:checked') != null) {
    // 웹브라우저의 로컬 스토리지에 이메일을 저장한다.
    // window.localStorage.setItem("email", email);
    window.localStorage.email = $('#email').val();
  } else {
    window.localStorage.removeItem("email");
  }
  
  $.post('../../app/json/auth/login', {
   
    email: $('#email').val(),
    password: $('#password').val()
    
  },
  
 
  function(data) {
    
    if (data.status == 'success') {
      location.href = "../index.html"
    } else if(data.status == 'stand-by'){
      location.href = 'success.html';
    } else {
      M.toast({html: '아이디나 비밀번호가 틀렸습니다.',displayLength: '10000'})
    }
  });
});


$(function(){
  $("#check_all").click(function(){
      var chk = $(this).is(":checked");// .attr('checked');
      if(chk) $(".select_subject input").prop('checked', true);
      else  $(".select_subject input").prop('checked', false);
  });
});

$('#reservation').click(() => {
  
  location.href = "signup.html";
})

$('#find-password').click(() => {
  
  location.href = "password.html";
})


var naverLogin = new naver.LoginWithNaverId(
    {
      clientId: "g1zszuM3r0V5AW37KxIg",
      callbackUrl: "http://localhost:8080/bitcamp-fit-tour/html/auth/callback.html",
      isPopup: false, /* 팝업을 통한 연동처리 여부 */
      loginButton: {color: "green", type: 3, height: 40} /* 로그인 버튼의 타입을 지정 */
    }
  );
  
  /* 설정정보를 초기화하고 연동을 준비 */
naverLogin.init();
$('#naverIdLogin_loginButton').find('img').attr('src','/bitcamp-fit-tour/images/naver.png');
$('#naverIdLogin_loginButton').find('img').addClass('naver-img');
$('#naverIdLogin_loginButton').addClass('waves-effect waves-dark btn');
$('#naverIdLogin_loginButton').html($('#naverIdLogin_loginButton').html() + '<span class="naver">네이버 로그인</span>');



function getUserInfo(accessToken) {
  // 자바스크립트에서 페이스북에 서비스를 요청할 때는 
  // accessToken을 따로 지정하지 않아도 된다.
  // 왜? 
  // => 서비스를 요청할 때 내부에 보관된 accessToken을 사용할 것이다.
  
  // FB.api('서비스 URL', 서비스 결과를 받았을 때 호출될 함수);
  // => '/me' : 현재 로그인 한 사용자의 정보를 가져오는 서비스이다.
  FB.api('/me?fields=name,email', function(response) {
      console.log(response);
  });
}



function autoServerLogin(accessToken) {
 location.href = "facebook_callback.html?accessToken=" + accessToken;

}

function checkLoginState() {
  FB.getLoginStatus(function(response) { 
      if (response.status === 'connected') { // 로그인이 정상적으로 되었을 때,
        autoServerLogin(response.authResponse.accessToken);
        
        console.log(response.authResponse.accessToken);
      } else { // 로그인이 되지 않았을 때,
          console.log("로그인 되지 않았음");
      }
  });
}

window.fbAsyncInit = function() {
FB.init({
  appId      : '815103412179816', // 개발자가 등록한 앱 ID
  cookie     : true,  
  xfbml      : true,  
  version    : 'v3.3' 
});

FB.AppEvents.logPageView();
};

(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "https://connect.facebook.net/ko_KR/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


var finished_rendering = function() {
  console.log("finished rendering plugins");
  var spinner = document.getElementById("spinner");
  spinner.removeAttribute("style");
  spinner.removeChild(spinner.childNodes[0]);
}

$('#facebook-btn').click(() => {
  FB.login((response) => {
    if (response.authResponse) {
      //user just authorized your app
      checkLoginState();
    }
  }, {scope: 'email,public_profile', return_scopes: true});
})
