//load user
$(document.body).bind('loadHeader', () => {
  if(!sessionStorage.getItem('loginUser')){
    alert('로그인 후 이용 가능합니다.')
    location.href = '/bitcamp-fit-tour/html/auth/login.html'
  }

  if(sessionStorage.getItem('loginUser')){
    var user = JSON.parse(sessionStorage.getItem('loginUser'))
    console.log(user)
    var birthArray = user.birth.split('-');
    var birth = new Date(birthArray[0],birthArray[1],birthArray[2]);
    console.log(user);
    loadProfile();
  }

  //load profile
  function loadProfile(){

    $('#profile-picture').attr('src','/bitcamp-fit-tour/upload/member/'+user.photo);
    $('#profile-picture-update').attr('src','/bitcamp-fit-tour/upload/member/'+user.photo);
    $('#profile-picture-full').attr('src','/bitcamp-fit-tour/upload/member/'+user.photo);
    $('#info-name').html(user.name);
    $('#info-email').html(user.email);
    $('#info-tel').val(user.tel);
    $('#info-birth').val(birthArray[0] + '년 ' + birthArray[1] +'월 ' + birthArray[2] + '일');
    if(user.emailCheck)
      $('#info-email-agree').attr('checked',true);
    if(user.smsCheck)
      $('#info-sms-agree').attr('checked',true);
  }

  $('.datepicker').datepicker({
    format : 'yyyy년 mm월 dd일',
    defaultDate : birth
  });
});

//modal init
$('#password-modal').modal({
  onCloseEnd : resetModal
});

$('#photo-modal').modal({
});

$('#id-delete-modal').modal({
});

//profile edit
$('#edit-info').click(function(e){
  editIconTag = $(this).find('i')
  if(editIconTag.html() == 'edit') {
    $('#info-birth').attr('disabled',false);
    $('#info-tel').attr('disabled',false);
    $('#info-email-agree').attr('disabled',false);
    $('#info-email-agree').parent().css('box-shadow','0 1px 0 0 #26a69a');
    $('#info-email-agree').parent().css('border-bottom','1px solid #26a69a');
    $('#info-sms-agree').attr('disabled',false);
    $('#info-sms-agree').parent().css('box-shadow','0 1px 0 0 #26a69a');
    $('#info-sms-agree').parent().css('border-bottom','1px solid #26a69a');
    editIconTag.html('check');
  } else {

    var newBirthArray = $('#info-birth').val().split(' ')
    var newBirth = newBirthArray[0].substring(0, 4) + '-' +
    newBirthArray[1].substring(0, 2) + '-' +
    newBirthArray[2].substring(0, 2);
    $.post('../../app/json/member/update',
            {
      birth: newBirth,
      smsCheck: $('#info-sms-agree').is(':checked'),
      emailCheck: $('#info-email-agree').is(':checked'),
      tel: $('#info-tel').val(),
            }, 
            function(obj) {
              if(obj.status == 'success'){
                sessionStorage.clear();
                $.post('../../app/json/auth/relogin');
                M.toast({ html: '프로필이 변경되었습니다.' });
              } else {
                M.toast({ html: '' });
              }
            });

    $('#info-birth').attr('disabled',true);
    $('#info-tel').attr('disabled',true);
    $('#info-email-agree').attr('disabled',true);
    $('#info-sms-agree').attr('disabled',true);
    $('#info-email-agree').parent().css('box-shadow','');
    $('#info-email-agree').parent().css('border-bottom','');
    $('#info-sms-agree').parent().css('box-shadow','');
    $('#info-sms-agree').parent().css('border-bottom','');
    editIconTag.html('edit');
  }

});


//profile overlay
$('#profile-picture-overlay').click(function(){
  $('#photo-modal').modal('open');
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

//photo update
$('#photo-update-btn').off().click(function(e) {
  e.preventDefault();
  M.toast({ html: '사진을 업로드 하세요.' });
});

//photo delete
$('#photo-delete-btn').click(function(e) {
  e.preventDefault();
  $('#profile-picture-update').attr('src', '/bitcamp-fit-tour/upload/member/default.jpg');
  $('#photo-update-btn').off().click(function(e) {
    $.post('../../app/json/member/photoupdate',{
      photo : 'default.jpg'
    },
    function(data){
      if(data.status == 'success'){
        $('#photo-modal').modal('close');
        sessionStorage.clear();
        $.post('../../app/json/auth/relogin');
        $('#login-user-photo').css('background-image','url(/bitcamp-fit-tour/upload/member/' + data.photo + ')');
        $('#sidnav-user-photo').attr('src','/bitcamp-fit-tour/upload/member/' + data.photo);
        $('#profile-picture').attr('src','/bitcamp-fit-tour/upload/member/' + data.photo);
        M.toast({ html: '프로필 사진이 변경되었습니다.' });
        $('#photo-update-btn').off().click(function(e) {
          e.preventDefault();
          M.toast({ html: '사진을 업로드 하세요.' });
        });
      }
    });
  });

});

//photo update cancel
$('#photo-update-cancel-btn').click(function(e){
  e.preventDefault();
  $('#photo-modal').modal('close');
});

$('#fileupload').fileupload({
  url: '../../app/json/member/photoupdate',        // 서버에 요청할 URL
  dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
  sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
  singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
  autoUpload: false,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
  disableImageResize: /Android(?!.*Chrome)|Opera/
    .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
    previewMaxWidth: 170,   // 미리보기 이미지 너비
    previewMaxHeight: 150,  // 미리보기 이미지 높이 
    previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기

    processalways: function (e, data) {
      $('#profile-picture-update').attr('src', data.files[0].preview.toDataURL());
      $('#photo-update-btn').off().click(function(e) {
        console.log('a');
        e.preventDefault();
        data.submit();
      });

    },
    done: function (e, data) {
      $('#photo-modal').modal('close');
      sessionStorage.clear();
      $.post('../../app/json/auth/relogin');
      $('#login-user-photo').css('background-image','url(/bitcamp-fit-tour/upload/member/' + data.result.photo + ')');
      $('#sidnav-user-photo').attr('src','/bitcamp-fit-tour/upload/member/' + data.result.photo);
      $('#profile-picture').attr('src','/bitcamp-fit-tour/upload/member/' + data.result.photo);
      M.toast({ html: '프로필 사진이 변경되었습니다.' });
      $('#photo-update-btn').off().click(function(e) {
        e.preventDefault();
        M.toast({ html: '사진을 업로드 하세요.' });
      });

    }
});


//add click event id delete button
$('#id-delete').click(function(e){
  e.preventDefault();
  $('#id-delete-modal').modal('open');
});

//add click event id delete comfirm button
$('#id-delete-btn').click(function(e){
  e.preventDefault();

  if(!$('input[name="reason"]:checked').length){
    M.toast({ html: '계정을 삭제하려는 이유를 선택하세요.' });
    return;
  }

  var reason;
  if($('input[name="reason"]:checked').hasClass('other')){
    console.log($('#ohter-reason').val());
    reason = $('#ohter-reason').val();
  } else {
    console.log($('input[name="reason"]:checked').next().html());
    reason = $('input[name="reason"]:checked').next().html();
  }

  $.get('../../app/json/member/withdrawal',
          {
    reason : reason
          },
          function(obj){
            if(obj.status == 'success'){
              $.get('/bitcamp-fit-tour/app/json/auth/logout', function(obj){
                sessionStorage.removeItem('loginUser');
                location.href = '/bitcamp-fit-tour/html/index.html';
              });
            } else {
            }
          });
});

//add click event id delete cancel button
$('#id-delete-cancel-btn').click(function(e){
  e.preventDefault();
  $('#id-delete-modal').modal('close');
});

