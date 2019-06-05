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
    }else if (data.status == 'overlap') {
      alert(data.message)
      location.href = '../index.html'
    }else if (data.status == 'tokenerr') {
      alert(data.message)
      location.href = '../index.html'
    } else {
      alert("알수없는 에러")
      location.href = '../index.html'
    }
    

  })
}
  