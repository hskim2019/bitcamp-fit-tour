var param = location.href.split('?')[1];

if (param) {
  $('h1').html('회원 조회');
  loadData(param.split('=')[1]);
  $('#typeName').attr('readonly','');  
  var el = $('.bit-new-item');
  for (e of el) {
    e.style.display = 'none';
  }
} else {
  $('h1').html('새 회원');
  
  var el = $('.bit-view-item');
  for (e of el) {
    e.style.display = 'none';
  }
}


$('#add-btn').click(() => {
  $.post('../../app/json/member/add', {

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
$('#delete-btn').click (() => {
  $.getJSON('../../app/json/member/delete?no=' + param.split('=')[1], 
      function(data) {
    
    if(data.status == 'success') {
      location.href = "index.html";  
    } else {
      alert('삭제 실패 입니다.\n' + data.message);
    }
  });
});

$('#update-btn').click (() => {
  
  $.post('../../app/json/member/update?no=' + param.split('=')[1],{
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
    photo: $('#photo').val()
  },
  function(data) {
   
    if(data.status == 'success') {
      location.href = "index.html";  
    } else {
      alert('수정 실패 입니다.\n' + data.message);
    }
  });
});

function loadData(no) {
  $.getJSON('../../app/json/member/detail?no=' + param.split('=')[1], 
      function(data) {
    $('#no').val(data.no);
    $('#email').val(data.email);
    $('#name').val(data.name);
    $('#nickname').val(data.nickname);
    $('#birth').val(data.birth);
    $('#smsCheck').val(data.smsCheck);
    $('#emailCheck').val(data.emailCheck);
    $('#phoneCheck').val(data.phoneCheck);
    $('#tel').val(data.tel);
    $('#registeredDate').val(data.registeredDate);
    $('#rank').val(data.rank);
    $('#typeName').val(data.loginType.typeName);
    $('#photo').val(data.photo);
    
  });
};







