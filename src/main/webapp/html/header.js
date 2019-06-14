
//load header
(function () {
  $('.bit-main-header').load('/bitcamp-fit-tour/html/header.html', function(){
    $(document.body).trigger('loaded.header');
    $('.sidenav').sidenav({});
  });
})();

//load
$(document.body).bind('loaded.header', () => {

  loadLoginUser();

  //add click event logout button
  $('#logout-menu').click( (e) => {
    e.preventDefault();
    $.get('/bitcamp-fit-tour/app/json/auth/logout', function(obj){
      sessionStorage.removeItem('loginUser');
      location.href = '/bitcamp-fit-tour/html/index.html';
    });
  });
});

//load login user
function loadLoginUser() {

  $.get('/bitcamp-fit-tour/app/json/auth/user', function(data){
    if (data.status == 'success') {
      sessionStorage.setItem('loginUser',JSON.stringify(data.user));

      var loginStateTags = $('.bit-login-state');
      for(loginStateTag of loginStateTags){
        $(loginStateTag).removeClass('bit-invisible');
      }
      
      console.log(data.user.loginType.no);
      
      if(data.user.rank == 1){
        $('.user-status').removeClass('bit-invisible');
      }
      
      if(data.user.rank == 2){
        $('.manager-status').removeClass('bit-invisible');
      }
      
      //set login user name
      $('#login-user-name').html(data.user.name);
      
      //set side nav
      $('#nav-user-name').html(data.user.name);
      $('#nav-user-email').html(data.user.email);
      
      //set login user photo
      if(data.user.photo) {
        $('#login-user-photo').css('background-image','url(/bitcamp-fit-tour/upload/member/' + data.user.photo + ')');
        $('#sidnav-user-photo').attr('src','/bitcamp-fit-tour/upload/member/' + data.user.photo);
      } else {
        $('#login-user-photo').css('background-image','url(/bitcamp-fit-tour/upload/member/default.jpg)');
        $('#sidnav-user-photo').attr('src','/bitcamp-fit-tour/upload/member/default.jpg');
      }
      
    } else {
      var notLoginStateTags = $('.bit-not-login-state');
      for(notLoginStateTag of notLoginStateTags){
        $(notLoginStateTag).removeClass('bit-invisible');
      }
    }
    $(document.body).trigger('loadHeader');
  });
}




