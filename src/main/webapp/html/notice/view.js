var param = location.href.split('?')[1],
    noticeNo = param.split('=')[1];

//if (param) {
//  $('h1').html('게시물 보기');
//  loadData(param.split('=')[1]);
//  var el =  $('.bit-new-item');
//  for (e of el) {
//    e.style.display = 'none';
//  }
//} else {
//  $('h1').html('새글');
//  var el = $('.bit-view-item');
//
//  for (e of el) {
//    e.style.display = 'none';
//  }
//}
loadData(noticeNo);

function loadData(no) {
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

//$('#update-btn').click (() => {
//
//  $.post('../../app/json/notice/update?no=' + param.split('=')[1],{
//    title: $('#title').val(),
//    content: $('#content').val()
//  },
//  function(data) {
//
//    if(data.status == 'success') {
//      location.href = "index.html";  
//    } else {
//      alert('수정 실패 입니다.\n' + data.message);
//    }
//  });
//});

$(document.body).bind('loaded-list', () => {
  $('#update-btn').click((e) => {
    e.preventDefault();
    window.location.href = 'add.html?no=' + noticeNo;
  });
});

var Counter = function(quill, options) {

  this.quill = quill;

  this.options = options;

  var container = document.querySelector(options.container);

  var _this = this;

  quill.on('text-change', function() {

    var length = _this.calculate();

    container.innerText = length + ' ' + options.unit + 's';

  });

};

Counter.prototype.calculate = function() {

  var delta =JSON.stringify(quill.getContents());
  var text = this.quill.getText();
  var quillHtml = quill.root.innerHTML.trim();

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

  if (this.options.unit === 'word') {

    return text.split(/\s+/).length;

  } else {

    return text.length;
  }
};

Quill.register('modules/counter', Counter);

var quill = new Quill('#editor', {
  modules: {
    counter: {
      container: '#counter',
      unit: 'word'
    },
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }], 
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }],  
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],      
      [{ 'align': [] }],
      ['image', 'link', 'video']
      ]
  },
  placeholder: '내용을 입력해 주세요',

  theme: 'snow'  // or 'bubble'

});

var counter = quill.getModule('counter');

//We can now access calculate() directly

console.log(counter.calculate(), 'words');