//var param = location.href.split('?')[1],
//    noticeNo = param.split('=')[1];
//loadData(noticeNo);

function loadData(noticeNo) {
  $.getJSON('../../app/json/notice/detail?no=' + noticeNo, 
      function(data) {
    $('#titleTd').html(data.title);
    $('#createdDateTd').html(data.createdDate);
    $('#countViewTd').html(data.viewCount);
    $('#content').html(data.content);
    
    $(document.body).trigger('loaded-list');
  });
  
};

$('#delete-btn').click(() => {
  $.getJSON('../../app/json/notice/delete?no=' + param.split('=')[1], 
      function(data) {

    if(data.status == 'success') {
      location.href = "index.html";  
    } else {
      alert('삭제 실패 입니다.\n' + data.message);
    }
  });
});


$(document.body).bind('loaded-list', () => {
  $('#update-btn').click((e) => {
    e.preventDefault();
    window.location.href = 'add.html?no=' + noticeNo;
  });
});


