$(document).ready(function(){
    $('.modal').modal();
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
$('#info-birth').html(birth[0] + '년' + birth[1] + '월' + birth[2] + '일');

$('#profile-picture-overlay').click(function(){
  $('#grey-overlay').show();
});

$('#grey-overlay').click(function(){
    $('#grey-overlay').hide();
});

$('#edit-info').click(function(){
});


$('#password-modfiy-btn').click(function(){
});


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
      required: '기존 비밀번호를 입력해주세요.',
      minlength: '8글자 이상 입력하세요.'
  },
  newPassword: {
    required: '새 비밀번호를 입력해주세요.',
    minlength: '8글자 이상 입력하세요.',
},

  newPasswordConfirm: {
    required: '새 비밀번호를 입력해주세요.',
    minlength: '8글자 이상 입력하세요.',
    equalTo: '비밀번호와 일치하지 않습니다. 다시 입력해 주세요'
}
},
  
  
errorElement : 'div',
/*errorPlacement: function(error, element) {
  var placement = $(element).data('error');
  if (placement) {
    $(placement).append(error)
  } else {
    error.insertAfter(element);
  }
}*/
});


