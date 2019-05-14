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
  quilljsediterInit();
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

$('#add-btn').click(() => {
  $.post('../../app/json/notice/add', {

    content: delta,
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

function quilljsediterInit() {
  var options = {
      modules: {
          toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['image', 'code-block']
          ]
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'
  };
  quill = new Quill('#editor', options);
  
  quill.setContexts($('#content')); 
  
  quill.getModule('toolbar').addHandler('image', function() {
      selectLocalImage();
  });
}
function selectLocalImage() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.click();

  // Listen upload local image and save to server
  input.onchange = function() {
      const fd = new FormData();
      const file = $(this)[0].files[0];
      fd.append('image', file);

      $.ajax({
          type: 'post',
          enctype: 'multipart/form-data',
          url: '/bitcamp-fit-tour/upload/',
          data: fd,
          processData: false,
          contentType: false,
          beforeSend: function(xhr) {
              xhr.setRequestHeader($("#_csrf_header").val(), $("#_csrf").val());
          },
          success: function(data) {
              const range = quill.getSelection();
              quill.insertEmbed(range.index, 'image', '/bitcamp-fit-tour/upload/'+data);
          },
          error: function(err) {
              console.error("Error ::: "+err);
          }
      });
  };
}