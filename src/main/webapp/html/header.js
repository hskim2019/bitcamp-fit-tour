//ready
$(document).ready(function(){
    var sideNav = $('.sidenav').sidenav({
    });
});

//load header
(function () {
  $('.bit-main-header').load('/bitcamp-fit-tour/html/header.html', function(){
    $(document.body).trigger('loaded.header');
  });
})();


//load
$(document.body).bind('loaded.header', () => {

  loadLoginUser();

  //add click event logout button
  $('#logout-menu').click( (e) => {
    e.preventDefault();
    $.get('/bitcamp-fit-tour/app/json/auth/logout', function(obj){
      sessionStorage.clear();
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
      
      //set login user name
      $('#login-user-name').html(data.user.name);
      
      //set side nav
      $('#nav-user-name').html(data.user.name);
      $('#nav-user-email').html(data.user.email);
      
      //set login user photo
      if(data.user.photo) {
        $('#login-user-photo').css('background-image','url(/bitcamp-fit-tour/images/' + data.user.photo + ')');
      } else {
        $('#login-user-photo').css('background-image','url(/bitcamp-fit-tour/images/default.jpg)');
      }

    } else {
      var notLoginStateTags = $('.bit-not-login-state');
      for(notLoginStateTag of notLoginStateTags){
        $(notLoginStateTag).removeClass('bit-invisible');
      }
    }
  });
}




