var param = location.href.split('?')[1];

$('h1').html('새 회원');
var el = $('.bit-view-item');
for (e of el) {
    e.style.display = 'none';
}



$('#add-btn').click(() => {
  $.post('../../app/json/signup/add', {

    email: $('#email').val(),
    password: $('#password').val(),
    name: $('#name').val(),
    nickname: $('#nickname').val(),
    birth: $('#birth').val(),
    smsCheck: $('#smsCheck').val(),
    emailCheck: $('#emailCheck').val(),
    phoneCheck: $('#phoneCheck').val(),
    tel: $('#tel').val(),
    rank: $('#rank').val(),
    loginTypeNo: $('#typeName').val()
   
    
  },
  function(data) {
    
    if(data.status == 'success') {
      location.href = "index.html";  
    } else {
      alert('등록 실패 입니다.\n' + data.message);
    }
  });
});


$("#pwd").keyup(function(){
  var pwd=$(this).val();
  // 비밀번호 검증할 정규 표현식
  var reg=/^.{8,}$/;
  if(reg.test(pwd)){// 정규표현식을 통과 한다면
              $("#pwdRegErr").hide();
              successState("#pwd");
  }else{// 정규표현식을 통과하지 못하면
              $("#pwdRegErr").show();
              errorState("#pwd");
  }
});
$("#rePwd").keyup(function(){
  var rePwd=$(this).val();
  var pwd=$("#pwd").val();
  // 비밀번호 같은지 확인
  if(rePwd==pwd){// 비밀번호 같다면
      $("#rePwdErr").hide();
      successState("#rePwd");
  }else{// 비밀번호 다르다면
      $("#rePwdErr").show();
      errorState("#rePwd");
  }
});
$("#email").keyup(function(){
  $("#overlapErr").hide();
  var email=$(this).val();
  // 이메일 검증할 정규 표현식
  var reg=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if(reg.test(email)){// 정규표현식을 통과 한다면
              $("#emailErr").hide();
              successState("#email");
  }else{// 정규표현식을 통과하지 못하면
              $("#emailErr").show();
              errorState("#email");
  }
  $.getJSON('../../app/json/signup/emailoverlap?email='+email, 
          function(data) {

  if(email == data.email){// 사용 가능한 아이디가 아니라면
    $("#overlapErr").show();
    errorState("#email");
  }
  
  });
  
  
});
// 성공 상태로 바꾸는 함수
function successState(sel){
  $(sel)
  .removeClass("is-invalid")
  .addClass("is-valid")
  .show();

  $("#myForm button[type=submit]")
              .removeAttr("disabled");
};
// 에러 상태로 바꾸는 함수
function errorState(sel){
  $(sel)
.removeClass("is-valid")
  .addClass("is-invalid")

  $("#myForm button[type=submit]")
              .attr("disabled","disabled");
};






