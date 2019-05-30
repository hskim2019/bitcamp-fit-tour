if (window.localStorage.getItem('email')) {
  // document.querySelector('#email').value = localStorage.getItem('email')
  $('#email').val(localStorage.email)
}

$('#login-btn').click(() => {
  if (document.querySelector('#saveEmail:checked') != null) {
    // 웹브라우저의 로컬 스토리지에 이메일을 저장한다.
    // window.localStorage.setItem("email", email);
    window.localStorage.email = email;
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
      callbackUrl: "http://team1.bitcamp.co.kr:8080/bitcamp-fit-tour/html/auth/callback.html",
      isPopup: false, /* 팝업을 통한 연동처리 여부 */
      loginButton: {color: "green", type: 3, height: 35} /* 로그인 버튼의 타입을 지정 */
    }
  );
  
  /* 설정정보를 초기화하고 연동을 준비 */
naverLogin.init();
  


function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}

