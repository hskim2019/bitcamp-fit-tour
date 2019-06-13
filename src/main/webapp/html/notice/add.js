var param = location.href.split('?')[1];
var noticeNo;    

if(param) {
  $('#update-btn').removeClass('bit-invisible');
  noticeNo = param.split('=')[1];
  loadDate(noticeNo);
} else {
  $('#add-btn').removeClass('bit-invisible');
}


var quill = new Quill('#editor', {
  modules: {
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }], 
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }],  
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],      
      [{ 'align': [] }],
      ['image', 'link', 'video']
      ],imageResize: {}, 
  },
  placeholder: '내용을 입력해 주세요',

  theme: 'snow'  // or 'bubble'

});


//var delta =JSON.stringify(quill.getContents());
//var delta = quill.getContents();
//console.log(delta);
//var text = this.quill.getText();
//var quillHtml = quill.root.innerHTML.trim();



$('#add-btn').click((e) => {
  if(!$('#input-title').val() || $('#input-title').val().replace(/\s/g,"").length == 0) {
    $('#input-title').focus();
    $('.titleLabel').addClass('warning');
    M.toast({html: '제목을 입력 해 주세요'})
  } else if($('.ql-editor').html() == '<p><br></p>') {
    $('.ql-editor').focus();
    M.toast({html: '내용을 입력 해 주세요'})
  } 
  
  else {
  $.post('../../app/json/notice/add', {
     title: $('#input-title').val(),
     content: $('.ql-editor').html()
  },

  function(data) {
    if(data.status == 'success') {
      location.href = "index.html";  
    } else {
      alert('등록 실패 입니다.\n' + data.message);
    }
  });
  } 
});

$('.ql-editor').click((e) => {
  $('.titleLabel').removeClass('warning');
});

$('#update-btn').click(() => {
  
  if(!$('#input-title').val() || $('#input-title').val().replace(/\s/g,"").length == 0) {
    $('#input-title').focus();
    $('.titleLabel').addClass('warning');
    M.toast({html: '제목을 입력 해 주세요'})
  } else if($('.ql-editor').html() == '<p><br></p>') {
    $('.ql-editor').focus();
    M.toast({html: '내용을 입력 해 주세요'})
  } 
  
  else {
  $.post('../../app/json/notice/update?no=' + noticeNo,
      {
      title: $('#input-title').val(),
      content: $('.ql-editor').html()
      
      },
  function(data) {
        if(data.status == 'success') {
        location.href = "index.html";  
      } else {
        alert('수정 실패 입니다.\n' + data.message);
      }
      });
  }
});


$('h2').click(() => {
  location.href = "index.html";
});

function loadDate(noticeNo) {
  $.getJSON('../../app/json/notice/detail?no=' + noticeNo,
   function(data) {
    $('#input-title').val(data.title);
    $('.ql-editor').html(data.content);
  })
  $('#input-title').focus();
};
  
