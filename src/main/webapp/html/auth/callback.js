var token = location.href.split('#')[1].split('=')[1].split('&')[0]


var naverLogin = new naver.LoginWithNaverId(
{
  clientId: "g1zszuM3r0V5AW37KxIg",
  callbackUrl: "http://team1.bitcamp.co.kr:8080/bitcamp-fit-tour/html/auth/callback.html",
  isPopup: false,
  callbackHandle: true
});

    /* (3) 네아로 로그인 정보를 초기화하기 위하여 init을 호출 */
naverLogin.init();

    /*
     * (4) Callback의 처리. 정상적으로 Callback 처리가 완료될 경우 main page로 redirect(또는 Popup
     * close)
     */
window.addEventListener('load', function () {
  naverLogin.getLoginStatus(function (status) {
    if (status) {
      /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
      var email = naverLogin.user.getEmail();
      var name = naverLogin.user.getName();
     
      var isRequire = true;
      if(name == 'undefined' || name == null || name == '') {
        alert('이름은 필수 정보입니다. 정보제공을 동의해주세요.');
        isRequire = false;
      } else if(email == 'undefined' || email == null || email == '') {
        alert('이메일은 필수 정보입니다. 정보제공을 동의해주세요.');
        isRequire = false;
      } 

      if(isRequire == false) {
        naverLogin.reprompt(); // 필수정보를 얻지 못 했을 때 다시 정보제공 동의 화면으로 이동
        return; 
      } else {
        login(6)
      }
      //console.log("callback 처리에 실패하였습니다.");
    }
   // window.location.replace("http://" + window.location.hostname + ( (location.port==""||location.port==undefined)?"":":" + location.port) + "/bitcamp-fit-tour/html/index.html");
  })
});


function login(loginTypeNo){
  $.post('../../app/json/auth/snsLogin', {
    token:token,
    loginTypeNo : loginTypeNo
    
  },
  
 
  function(data) {
    
    if (data.status == 'success') {
      location.href = '../index.html'
    }else if (data.status == 'overlap') {
      alert(data.message)
      location.href = '../index.html'
    } else if (data.status == 'tokenerr') {
      alert(data.message)
      location.href = '../index.html'
    }else {
      alert("알수없는 에러")
      location.href = '../index.html'
    }
    

  })
}
  


      
      
      