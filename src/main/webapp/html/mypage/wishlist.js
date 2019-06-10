//load user
$(document.body).bind('loadHeader', () => {
  if(!sessionStorage.getItem('loginUser')){
    alert('로그인 후 이용 가능합니다.')
    location.href = '/bitcamp-fit-tour/html/auth/login.html'
  }
  
  if(sessionStorage.getItem('loginUser')){
    var user = JSON.parse(sessionStorage.getItem('loginUser'))
    }
});


$('.tabs').tabs();