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
      M.toast({html: data.message,displayLength: '10000'})
      location.href = '../index.html'
    }else if (data.status == 'tokenerr') {
      M.toast({html: data.message,displayLength: '10000'})
      location.href = '../index.html'
    } else {
      alert("알수없는 에러")
      location.href = '../index.html'
    }
    

  })
}
  