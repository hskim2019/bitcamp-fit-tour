var param = location.href.split('?')[1],
    reviewNo = param.split('=')[1];
//$('#delete-btn').show();
loadData(reviewNo);
function loadData(no) {
  $.getJSON('../../app/json/freereview/detail?no=' + reviewNo, 
      function(data) {
    $('#titleTd').html(data.title);
    $('#nameTd').html(data.member.name);
    $('#createdDateTd').html(data.createdDate);
    $('#countViewTd').html(data.viewCount);
    $('#content').html(data.content);
    $.getJSON('../../app/json/reservation/detail?no=' + data.reservationNo,
            function(obj) {
      
      $('#tourTd').html(obj.tour.title);
    });
    
    
   
  });
};

$('#delete-btn').click(() => {
  $.getJSON('../../app/json/freereview/delete?no=' + reviewNo, 
      function(data) {

    if(data.status == 'success') {
      location.href = "index.html";  
    } else {
      alert('삭제 실패 입니다.\n' + data.message);
    }
  });
});


