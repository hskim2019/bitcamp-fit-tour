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
    birth: $('#birth').val(),
    smsCheck: $('#smsCheck').val(),
    emailCheck: $('#emailCheck').prop("checked"),
    phoneCheck: $('#phoneCheck').prop("checked")

   
    
  },
  function(data) {
    
    if(data.status == 'success') {
      location.href = "../../html/index.html";  
    } else {
      alert('등록 실패 입니다.\n' + data.message);
    }
  });
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
$("#password").keyup(function(){
  var password=$(this).val();
  // 비밀번호 검증할 정규 표현식
  var reg=/^.{8,}$/;
  
  if(reg.test(password)){// 정규표현식을 통과 한다면
              $("#passwordRegErr").hide();
              successState("#password");
            
  }else{// 정규표현식을 통과하지 못하면
              $("#passwordRegErr").show();
              errorState("#password");
  }
  passwordCheckup();
});

$("#rePwd").keyup(function(){
  passwordCheckup();
});

$("#name").keyup(function(){
  var name=$(this).val();
  // 검증할 정규 표현식
  var reg=/^[가-힣a-zA-Z0-9_-]{2,15}$/;
  if(reg.test(name)){// 정규표현식을 통과 한다면
              $("#nameRegErr").hide();
              successState("#name");
              
  }else{// 정규표현식을 통과하지 못하면
              $("#nameRegErr").show();
              errorState("#name");
             
  }
});

$("#birth").on("mouseleave keyup",function(){
  var birth=$(this).val();
  // 생일 검증할 정규 표현식
  var reg=/^.{10,}$/;
  
  if(reg.test(birth)){// 정규표현식을 통과 한다면
              $("#birthRegErr").hide();
              successState("#birth");
              
  }else{// 정규표현식을 통과하지 못하면
              $("#birthRegErr").show();
              errorState("#birth");
             
  }
});

function passwordCheckup(){  // 비밀번호 같은지
  var rePwd=$("#rePwd").val();
  var pw=$("#password").val();
  // 비밀번호 같은지 확인
  if(rePwd==pw){// 비밀번호 같다면
      $("#rePwdErr").hide();
      successState("#rePwd");
  }else{// 비밀번호 다르다면
      $("#rePwdErr").show();
      errorState("#rePwd");
  }

}



// 성공 상태로 바꾸는 함수
function successState(sel){
  $(sel)
  .removeClass("is-invalid")
  .addClass("is-valid")
  .show();
 
  var countInvalid=0;
  var invalids = $('.is-invalid');
  for (invalid of invalids) {
    countInvalid++;
    if(countInvalid >0){
    $("#add-btn")
    .removeClass("btn-success")
  .addClass("btn-danger")
                .attr("disabled","disabled");
    }
  }
  if(countInvalid == 0){
    var countValid=0;
    var valids = $('.is-valid');
    for (valid of valids) {
      
      countValid++;
      if(countValid ==5){ // 입력폼 수
        
        $("#add-btn")
        .removeClass("btn-danger")
  .addClass("btn-success")
        .removeAttr("disabled");
      }
    }

  }
};
// 에러 상태로 바꾸는 함수
function errorState(sel){
  $(sel)
.removeClass("is-valid")
  .addClass("is-invalid")

     var countInvalid=0;
  var invalids = $('.is-invalid');
  for (invalid of invalids) {
    
    countInvalid++;
    if(countInvalid >0){
    
    $("#add-btn")
    .removeClass("btn-success")
  .addClass("btn-danger")
                .attr("disabled","disabled");
    }
  }
};

function allCheckFunc( obj ) {
  $("[name=checkOne]").prop("checked", $(obj).prop("checked") );
}

/* 체크박스 체크시 전체선택 체크 여부 */
function oneCheckFunc( obj )
{
var allObj = $("[name=checkAll]");
var objName = $(obj).attr("name");

if( $(obj).prop("checked") )
{
  checkBoxLength = $("[name="+ objName +"]").length;
  checkedLength = $("[name="+ objName +"]:checked").length;

  if( checkBoxLength == checkedLength ) {
    allObj.prop("checked", true);
  } else {
    allObj.prop("checked", false);
  }
}
else
{
  allObj.prop("checked", false);
}
}

$(function(){
$("[name=checkAll]").click(function(){
  allCheckFunc( this );
});
$("[name=checkOne]").each(function(){
  $(this).click(function(){
    oneCheckFunc( $(this) );
  });
});
});




