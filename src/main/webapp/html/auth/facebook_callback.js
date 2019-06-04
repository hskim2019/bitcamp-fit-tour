var token = location.href.split('=')[1]


login(2);
function login(loginTypeNo){
  $.post('../../app/json/auth/snsLogin', {
    token:token,
    loginTypeNo :loginTypeNo
    
  },
  
 
  function(data) {
    
    if (data.status == 'success') {
      location.href = '../index.html'
    }else if (data.status == 'accessTokenFail') {
      alert('올바르지 않는 접근이다')
      location.href = '../index.html'
    } else {
      
    }
    

  })
}
  