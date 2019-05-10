var param = location.href.split('?')[1];


if (param) {
  $('h1').html('게시물 보기');
  loadData(param.split('=')[1]);
  var el =  $('.bit-new-item');
  for (e of el) {
    e.style.display = 'none';
  }
} else {
  $('h1').html('새글');
  var el = $('.bit-view-item');
  for (e of el) {
    e.style.display = 'none';
  }
}
function loadData(no) {
  $.getJSON('../../app/json/notice/detail?no=' + param.split('=')[1], function(data) {
    $('#no').val(data.no);
    $('#content').val(data.content);
    $('#title').val(data.title);
    $('#createdDate').val(data.createdDate);
    $('#viewCount').val(data.viewCount);
  });
};
$('#add-btn').click(() => {
  $.post('../../app/json/notice/add', {

    content: $('#content').val(),
    title: $('#title').val()
   
  },

  function(data) {
    
    if(data.status == 'success') {
      location.href = "index.html";  
    } else {
      alert('등록 실패 입니다.\n' + data.message);
    }
  });
});
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

$('#update-btn').click (() => {
 
  $.post('../../app/json/notice/update?no=' + param.split('=')[1],{
    title: $('#title').val(),
    content: $('#content').val()
  },
  function(data) {
    
    if(data.status == 'success') {
      location.href = "index.html";  
    } else {
      alert('수정 실패 입니다.\n' + data.message);
    }
  });
});


