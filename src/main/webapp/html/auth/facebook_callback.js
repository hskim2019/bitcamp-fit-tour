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
      Swal.fire({
        title: '이미 다른 SNS나 이메일 계정으로 가입 상태입니다.',
        text: '비밀번호를 찾겠습니까?',
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        cancelButtonText: '취소',
        confirmButtonText: '확인'
      }).then((result) => {
        if (result.value) {
          location.href = 'password.html'
        }else{
          location.href = '../index.html'
        }
       });
    } else if (data.status == 'tokenerr') {
      Swal.fire({
        title: '잘못된 로그인 시도입니다.',
        text: '로그인 페이지로 가시겠습니까?',
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        cancelButtonText: '취소',
        confirmButtonText: '확인'
      }).then((result) => {
        if (result.value) {
          location.href = 'login.html'
        }else{
          location.href = '../index.html'
        }
       });
    } else {
      alert("알수없는 에러")
      location.href = '../index.html'
    }
    

  })
}
  