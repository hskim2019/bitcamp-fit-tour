//load user
if(sessionStorage.getItem('loginUser')){
  var user = JSON.parse(sessionStorage.getItem('loginUser'))
  var birthArray = user.birth.split('-');
  var birth = new Date(birthArray[0],birthArray[1],birthArray[2]);
  console.log(user);
}

$('#password-modal').modal({
  onCloseEnd : resetModal
});
  
$('.datepicker').datepicker({
  format : 'yyyy년 mm월 dd일',
  defaultDate : birth
});
  

//set profile
$('#profile-picture').attr('src','/bitcamp-fit-tour/upload/member/'+user.photo);
$('#profile-picture-full').attr('src','/bitcamp-fit-tour/upload/member/'+user.photo);
$('#info-name').html(user.name);
$('#info-email').html(user.email);
$('#info-phone').val(user.tel);
$('#info-birth').val(birthArray[0] + '년 ' + birthArray[1] +'월 ' + birthArray[2] + '일');
if(user.emailCheck)
  $('#info-email-agree').attr('checked',true);
if(user.smsCheck)
  $('#info-sms-agree').attr('checked',true);


// profile edit
$('#edit-info').click(function(e){
  editIconTag = $(this).find('i')
  if(editIconTag.html() == 'edit') {
    $('#info-birth').attr('disabled',false);
    $('#info-phone').attr('disabled',false);
    $('#info-email-agree').attr('disabled',false);
    $('#info-sms-agree').attr('disabled',false);
    editIconTag.html('check');
  } else {
    $('#info-birth').attr('disabled',true);
    $('#info-phone').attr('disabled',true);
    $('#info-email-agree').attr('disabled',true);
    $('#info-sms-agree').attr('disabled',true);
    editIconTag.html('check');
    editIconTag.html('edit');
  }
  
});


//profile overlay
$('#profile-picture-overlay').click(function(){
  $('#grey-overlay').show();
});

$('#grey-overlay').click(function(){
  $('#grey-overlay').hide();
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
              $('#password-modal').modal('close');
              M.toast({ html: '비밀번호가 변경되었습니다.' });
            } else {
              M.toast({ html: obj.message })
              resetModal();
            }
          });
});

//password update cancel
$('#password-update-cancel-btn').click(function(e){
  e.preventDefault();
  $('#password-modal').modal('close');
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


