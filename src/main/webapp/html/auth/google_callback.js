var naverLogin = new naver.LoginWithNaverId(
      {
        clientId: "{YOUR_CLIENT_ID}",
        callbackUrl: "http://team1.bitcamp.co.kr:8080/bitcamp-fit-tour/html/auth/callback.html",
        isPopup: false,
        callbackHandle: true
        /* callback 페이지가 분리되었을 경우에 callback 페이지에서는 callback처리를 해줄수 있도록 설정합니다. */
      }
    );

    /* (3) 네아로 로그인 정보를 초기화하기 위하여 init을 호출 */
    naverLogin.init();

    /* (4) Callback의 처리. 정상적으로 Callback 처리가 완료될 경우 main page로 redirect(또는 Popup close) */
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
          }
          
          
          $.post('../../app/json/auth/snsLogin', {
            
            email: email,
            loginTypeNo : 6
            
          },
          
         
          function(data) {
            
            if (data.status == 'success') {
              location.href = "../index.html"
            } else {
              $.post('../../app/json/signup/snsAdd', {
                
                email: email,
                
                name: name,
                birth: '2019-04-08 '

               
                
              },
             
              function(data) {
                
                if(data.status == 'success') {
                  $.post('../../app/json/auth/snsLogin', {
                    
                    email: email,
                    loginTypeNo : 6
                    
                  },
                  
                 
                  function(data) {
                    
                    if (data.status == 'success') {
                      location.href = "../index.html"
                    }else{
                      
                    }
                  })
                  
                  
                  
                  
                  
                  
                } else {
                 alert(data.message);
                
                }
              });
            }
          });
          
          
          
          
          
          

          //window.location.replace("http://" + window.location.hostname + ( (location.port==""||location.port==undefined)?"":":" + location.port) + "/bitcamp-fit-tour/html/index.html");
        } else {
          console.log("callback 처리에 실패하였습니다.");
        }
      });
    });