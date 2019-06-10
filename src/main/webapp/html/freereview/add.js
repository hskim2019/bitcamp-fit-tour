$('#add-btn').click(() => {
  $.post('../../app/json/freereview/add', {

    memberNo: 128,
    reservationNo: 1005,
    title: '제목입니다',
    content: '내용입니다2'
  
   
    
  },
  function(data) {
    
    if(data.status == 'success') {
      location.href = "index.html";  
    } else {
      alert('등록 실패 입니다.\n' + data.message);
    }
  });
});