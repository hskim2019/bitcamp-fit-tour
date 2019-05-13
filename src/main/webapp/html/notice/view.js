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

  var text = this.quill.getText();

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

      [{ header: [1, 2, false] }],

      ['bold', 'italic', 'underline'],

      ['image', 'code-block']

    ]

  },

 

  

       placeholder: 'Compose an epic...',

  theme: 'snow'  // or 'bubble'

  

});

 

var counter = quill.getModule('counter');

 

// We can now access calculate() directly

console.log(counter.calculate(), 'words');