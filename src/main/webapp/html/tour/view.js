var param = location.href.split('?')[1];
templateSrc = $('#comment-template').html(),
comment = $('#comment');

var trGenerator = Handlebars.compile(templateSrc);

if (param) {
  document.querySelector('h1').innerHTML = "투어 조회"
    loadData(param.split('=')[1])
    var el = document.querySelectorAll('.bit-new-item');
  for (e of el) {
    e.style.display = 'none';
  }
} 
//else {
//document.querySelector('h1').innerHTML = "새 글"
//var el = document.querySelectorAll('.bit-view-item');
//for (e of el) {
//e.style.display = 'none';
//}
//}

//document.querySelector('#add-btn').onclick = () => {
//var xhr = new XMLHttpRequest()
//xhr.onreadystatechange = function() {
//if (xhr.readyState != 4 || xhr.status != 200)
//return;

//var data = JSON.parse(xhr.responseText);

//if (data.status == 'success') {
//location.href = "index.html"

//} else {
//alert('등록 실패입니다!\n' + data.message)
//}
//};
//xhr.open('GET', '../../app/json/board/add', true)
//xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

//var contents = document.querySelector('#contents').value;

//xhr.send("contents=" + encodeURIComponent(contents));
//};


//document.querySelector('#update-btn').onclick = () => {
//var xhr = new XMLHttpRequest()
//xhr.onreadystatechange = function() {
//if (xhr.readyState != 4 || xhr.status != 200)
//return;

//var data = JSON.parse(xhr.responseText);

//if (data.status == 'success') {
//location.href = "index.html"

//} else {
//alert('변경 실패입니다!\n' + data.message)
//}
//};
//xhr.open('POST', '../../app/json/board/update', true)
//xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

//var no = document.querySelector('#no').value;
//var contents = document.querySelector('#contents').value;

//var qs = 'contents=' + encodeURIComponent(contents) +
//'&no=' + no;

//xhr.send(qs);
//};


//tour-list
function loadData(no) {

  $.getJSON('../../app/json/tour/detail?no=' + no,
          function(obj) {

    $('#title').val(obj.tour.title);
    $('#subHeading').val(obj.tour.subHeading);
    $('#content').val(obj.tour.content);
    $('#totalHour').val(obj.tour.totalHour);
    $('#hashTag').val(obj.tour.hashTag);
    $('#personnel').val(obj.tour.personnel);
    $('#transportation').val(obj.tour.transportation);
    $('#price').val(obj.tour.price);
    $('#photoname').val(obj.tour.tourPhoto[0].name);
    $('#photpath').val(obj.tour.tourPhoto[0].path);
    $('#theme').val(obj.tour.theme[0].theme);
    $(trGenerator(obj)).appendTo(comment);
    
    var deleteBottons = $('.bit-comment-delete-btn');
    for(deleteBotton of deleteBottons){
      var commentNoNode = $(deleteBotton).parent().prev().children().first();
      $(deleteBotton).attr('id', 'delete' + commentNoNode.val());
    }
    
    var updateBottons = $('.bit-comment-update-btn');
    for(updateBotton of updateBottons){
      var commentNoNode = $(updateBotton).parent().prev().children().first();
      $(updateBotton).attr('id', 'update' + commentNoNode.val());
    }
    
    
    $(document.body).trigger('loaded-list');
    
    
  });
}


//comment-add
$(document.body).bind('loaded-list', () => {

  $('#comment-add-button').click((e) => {
    e.preventDefault();
    var tourNo = location.href.split('?')[1].split('=')[1];
    var content = $('#comment-add').val();
    $.post('../../app/json/tourcomment/add',
            {
      tourNo : tourNo,
      memberNo : 101,
      order : 1,
      level : 1,
      content : content
            }, 
            function(obj) {
              if (obj.status == 'success') {
                location.href = location.href;

              } else {
                alert('등록 실패입니다!\n' + obj.message)
              }
            });
  });
});

//comment-delete
$(document.body).bind('loaded-list', () => {
  $('.bit-comment-delete-btn').click((e) => {
    e.preventDefault();
    $.getJSON('../../app/json/tourcomment/delete?no=' + $(e.target).attr('id').replace(/[^0-9]/g,""),
            function(obj) {
      if (obj.status == 'success') {
        location.href = location.href;

      } else {
        alert('삭제 실패입니다!\n' + obj.message)
      }
    });
  });
});

//comment-update
$(document.body).bind('loaded-list', () => {
  $('.bit-comment-update-btn').click((e) => {
    e.preventDefault();
    
    var contentNode = $(e.target).parent().parent().next().children().children(),
        preContentValue = contentNode.val();
    

    contentNode.removeAttr("readonly")
    contentNode.focus();
    
    $(e.target).hide();
    $(e.target).next().hide();
    $(e.target).parent().append('<a href="#" class="bit-comment-updateSave-btn">저장</a>  ');
    $(e.target).parent().append('<a href="#" class="bit-comment-updateCancel-btn">취소</a>');
    
    //comment-update-cancel
    $('.bit-comment-updateCancel-btn').click((e)=>{
      e.preventDefault();
      $(e.target).prev().prev().show();
      $(e.target).prev().prev().prev().show();
      $(e.target).prev().remove()
      $(e.target).remove();
      
      contentNode.attr("readonly",'ture')
      contentNode.val(preContentValue);
    })
    
    //comment-update-save
    $('.bit-comment-updateSave-btn').click((e)=>{
      e.preventDefault();
      
      $.post('../../app/json/tourcomment/update',
              {
                
                no : $(e.target).prev().attr('id').replace(/[^0-9]/g,""),
                content : contentNode.val()
              }, 
              function(obj) {
                if (obj.status == 'success') {
                  location.href = location.href;

                } else {
                  alert('등록 실패입니다!\n' + obj.message)
                }
              });
    });
    
    }) // bit-comment-update-btn
    
}); //comment-update
