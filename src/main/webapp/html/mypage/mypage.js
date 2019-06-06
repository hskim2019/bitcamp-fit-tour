$(document).ready(function(){
  $('#modal1').modal({
    onCloseEnd : resetModal
  });
});

//load user
if(sessionStorage.getItem('loginUser')){
  var user = JSON.parse(sessionStorage.getItem('loginUser'))
}

console.log(user);

//set profile
$('#profile-picture').attr('src','/bitcamp-fit-tour/upload/member/'+user.photo);
$('#profile-picture-full').attr('src','/bitcamp-fit-tour/upload/member/'+user.photo);
$('#info-name').html(user.name);
$('#info-email').html(user.email);
$('#info-phone').html(user.tel);
var birth = user.birth.split('-');
console.log(birth);
$('#info-birth').html(birth[0] + '년 ' + birth[1] + '월 ' + birth[2] + '일');

$('#profile-picture-overlay').click(function(){
  $('#grey-overlay').show();
});

$('#grey-overlay').click(function(){
  $('#grey-overlay').hide();
});

$('#edit-info').click(function(){
});



$('#password-update-cancel-btn').click(function(e){
  e.preventDefault();
  $('#modal1').modal('close');
});

//password update
$('#password-update-btn').click(function(e){
  e.preventDefault();
  if(!$('#originPassword').val()){
    $('#originPassword').focus();
    M.toast({ html: '비밀번호를 입력하세요.' });
    return;
  }

  if(!$('#newPassword').val()){
    $('#newPassword').focus();
    M.toast({ html: '새 비밀번호를 입력하세요.' });
    return;
  }

  if(!$('#newPasswordConfirm').val()){
    $('#newPasswordConfirm').focus();
    M.toast({ html: '새 비밀번호를 한 번 더 입력하세요.' });
    return;
  }
  
  if($('#newPassword').val() != $('#newPasswordConfirm').val()){
    $('#newPasswordConfirm').val('');
    $('#newPasswordConfirm').focus();
    M.toast({ html: '새 비밀번호와 비밀번호 확인이 일치하지 않습니다.' });
    return;
  }

  $.post('../../app/json/member/updatePassword',
          {
            'password' : $('#originPassword').val(),
            'newPassword' : $('#newPassword').val()
          }, 
          function(obj) {
            if(obj.status == 'success'){
              $('#modal1').modal('close');
              M.toast({ html: '비밀번호가 변경되었습니다.' });
            } else {
              M.toast({ html: obj.message })
              resetModal();
            }
          });
});


//password modal reset
function resetModal(){
  $('#form-password input').each(function() {
    $(this).val('');
    if($(this).hasClass('error')){
      $(this).next().remove();
      $(this).removeClass('error');
    }
    $(this).removeClass('aria-invalid');
    $(this).removeClass('valid');
  });
}

//password validate
$("#form-password").validate({
  rules: {
    originPassword: {
      required: true,
      minlength: 8
    },

    newPassword: {
      required: true,
      minlength: 8,
    },

    newPasswordConfirm: {
      required: true,
      minlength: 8,
      equalTo: "#newPassword"
    },

  },

  messages: {
    originPassword: {
      required: '비밀번호를 입력하세요.',
      minlength: '비밀번호는 8자 이상 입력하셔야 합니다.'
    },
    newPassword: {
      required: '새 비밀번호를 입력하세요.',
      minlength: '비밀번호는 8자 이상 입력하셔야 합니다.',
    },

    newPasswordConfirm: {
      required: '새 비밀번호를 한 번 더 입력하세요.',
      minlength: '비밀번호는 8자 이상 입력하셔야 합니다.',
      equalTo: '새 비밀번호와 비밀번호 확인이 일치하지 않습니다.'
    }
  },

  errorElement : 'div',
});


