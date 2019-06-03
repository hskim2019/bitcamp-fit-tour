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
      var birthday  = naverLogin.user.getBirthday();
     
      var isRequire = true;
      if(name == 'undefined' || name == null || name == '') {
        alert('이름은 필수 정보입니다. 정보제공을 동의해주세요.');
        isRequire = false;
      } else if(email == 'undefined' || email == null || email == '') {
        alert('이메일은 필수 정보입니다. 정보제공을 동의해주세요.');
        isRequire = false;
      } else if(birthday == 'undefined' || birthday == null || birthday == '') {
        alert('생일은 필수 정보입니다. 정보제공을 동의해주세요.');
        isRequire = false;
      }

      if(isRequire == false) {
        naverLogin.reprompt(); // 필수정보를 얻지 못 했을 때 다시 정보제공 동의 화면으로 이동
        return; 
      } else {
        login(email,name,birthday)
      }
      //console.log("callback 처리에 실패하였습니다.");
    }
   // window.location.replace("http://" + window.location.hostname + ( (location.port==""||location.port==undefined)?"":":" + location.port) + "/bitcamp-fit-tour/html/index.html");
  })
});


function login(email,name,birthday){
  $.post('../../app/json/auth/snsLogin', {
    token:token,
    email: email,
    loginTypeNo : 6
    
  },
  
 
  function(data) {
    
    if (data.status == 'success') {
      location.href = '../index.html'
    }else if (data.status == 'accessTokenFail') {
      alert('올바르지 않는 접근이다')
      location.href = '../index.html'
    } else {
      signup(email,name,birthday);
    }
    

  })
}
  
function signup(email,name,birthday){
  $.post('../../app/json/signup/snsAdd', {      
    email: email,  
    name: name,
    birth: birthday
    },
    function(data) {
    
    if (data.status == 'fail') {
      alert('계정생성오류')
      location.href = '../index.html'
    }else if (data.status == 'overlap') {
     // alert('이미 있는 계정입니다.')
      location.href = '../index.html'
    } else if (data.status == 'success') {
      login(email,name,birthday)
    }
    

  })
}

      
      
      