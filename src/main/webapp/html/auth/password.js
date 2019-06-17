 
$('#temp-btn').click(() => {
  if (!$('#email').val()) {
    $('#email').focus();
    M.toast({ html: '이메일을 적으세요..' })
    return;
  }
  
$.getJSON('../../app/json/signup/emailoverlap?email='+$('#email').val(), 
          function(data) {
 if(data.status =='fail'){
   M.toast({html: '존재하지 않는 이메일 입니다. 회원가입 하시길 바랍니다.',displayLength: '10000'})
 }
  if($('#email').val() == data.email){// 사용 가능한 아이디가 아니라면
    $.post('../../app/json/signup/temp', {
      
      email: $('#email').val()
  }, function(data) {
    
    if(data.status == 'success') {
      M.toast({html: '이메일로 임시 비밀번호 전송 하였습니다.',displayLength: '10000'})
      location.href = "login.html?ps";  
    } else {
      alert(data.message)
      M.toast({html: '변경실패 입니다',displayLength: '10000'})
    }
  });
  }
  })
});


$(document).keypress(function(e) { if (e.keyCode == 13) e.preventDefault(); });
