var param = location.href.split('?')[1];

if (param) {
  $('h1').html('회원가입을 축하합니다');
  
  var el = $('.bit-standby-item');
  for (e of el) {
    e.style.display = 'none';
  }
} else {
  $('h1').html('이메일 인증을 부탁합니다.');
  
  var el = $('.bit-success-item');
  for (e of el) {
    e.style.display = 'none';
  }
}



$('#reEamil').click (() => {
  $("#reEamil").hide();
  $.getJSON('../../app/json/signup/reeamil', 
      function(data) {
    
   
    if(data.status == 'success') {
      M.toast({html: '이메일 재전송 성공',displayLength: '10000'})
    } else {
      M.toast({html: '이메일 재전송 실패'})
      alert('재 전송 실패 입니다.\n' + data.message);
    }
    $("#reEamil").show();
  });
});

