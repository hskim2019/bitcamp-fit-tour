//loadHeader
(function () {
  $('.bit-main-header').load('/bitcamp-fit-tour/html/header.html', function(){
    $(document.body).trigger('loaded.header');
  });
})();

//header.html의 내용을 웹 페이지에 삽입했다고 연락이 오면,
//즉시 로그아웃 버튼에 click listener를 등록한다.
//header.html이 삽입되지도 않았는데 로그아웃 버튼을 찾아서는 안된다.
$(document.body).bind('loaded.header', () => {

  // 웹 페이지에 header.html을 삽입했으면 로그인 정보를 가져와 설정한다.
  loadLoginUser();

  // 로그아웃 버튼의 click 리스너를 등록한다.
  $('#logout-menu').click( (e) => {
    e.preventDefault();
    $.get('/bitcamp-fit-tour/app/json/auth/logout', function(obj){
      sessionStorage.clear();
      location.href = '/bitcamp-fit-tour/html/index.html';
    });
  });
});

//header.html이 웹 페이지에 삽입된 후 로그인 정보를 받아온다. 
function loadLoginUser() {

  $.get('/bitcamp-fit-tour/app/json/auth/user', function(data){
    var loginState = $('#bit-login-state'),
    notLoginState = $('#bit-not-login-state');

    if (data.status == 'success') {
      sessionStorage.setItem('loginUser',JSON.stringify(data.user));
      
      loginState.removeClass('bit-invisible');
      $('#login-username').html(data.user.name);

      if(data.user.photo)
        $('#login-userphoto').attr('src',"/bitcamp-fit-tour/images/" + data.user.photo);

    } else {
      notLoginState.removeClass('bit-invisible');
    }
  });
}








