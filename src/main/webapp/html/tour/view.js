var param = location.href.split('?')[1],
templateSrc = $('#comment-template').html(),
comment = $('#comment'),
pageNo = 1;


var trGenerator = Handlebars.compile(templateSrc);

if (param) {
  document.querySelector('h1').innerHTML = "투어 조회"
    loadData(param.split('=')[1])
    var el = document.querySelectorAll('.bit-new-item');
  for (e of el) {
    e.style.display = 'none';
  }
} 
else {
  document.querySelector('h1').innerHTML = "새 글"
    var el = document.querySelectorAll('.bit-view-item');
  for (e of el) {
    e.style.display = 'none';
  }
}


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
    $('#commentAmount').html($('#commentAmount').html()+obj.commentAmount);

    a(obj);

    $(document.body).trigger('loaded-list');
  });

}

function a(obj){
  if(obj.commentAmount <= obj.pageSize){
    $('#next-comment-btn').hide();
  } else{
    $('#next-comment-btn').show();
    $(document.body).trigger('activate-next-comment');
  }

  if (obj.tourComment.length){
    giveId();
  }
}

$(document.body).bind('loaded-list', () => {

  //comment-add
  $('#comment-add-button').off().click((e) => {
    e.preventDefault();
    var tourNo = location.href.split('?')[1].split('=')[1];
    var content = $('#comment-add').val();
    $.post('../../app/json/tourcomment/add',
            {
      tourNo : tourNo,
      memberNo : 101,
      order : 0,
      level : 0,
      content : content
            }, 
            function(obj) {
              if (obj.status == 'success') {
                $.post('../../app/json/tourcomment/list',{
                  tourNo : tourNo
                },
                function(obj) {

                  var el = $('#comment').contents();
                  for(e of el){
                    e.remove();
                      }
                  
                  $(trGenerator(obj)).appendTo(comment);
                  pageNo = 1;
                  a(obj);
                  $('#commentAmount').html('댓글수' + obj.commentAmount)
                  $('#comment-add').val('');
                  
                });
                
                

              } else {
                alert('등록 실패입니다!\n' + obj.message)
              }
            });
  });

  //comment-delete
  $('.bit-comment-delete-btn').off().click((e) => {
    e.preventDefault();
    $.getJSON('../../app/json/tourcomment/delete?no=' + $(e.target).attr('id').replace(/[^0-9]/g,""),
            function(obj) {
      if (obj.status == 'success') {
        location.reload(true);

      } else {
        alert('삭제 실패입니다!\n' + obj.message)
      }
    });
  });

  //comment-update
  $('.bit-comment-update-btn').off().click((e) => {
    e.preventDefault();

    var contentNode = $(e.target).parent().next().children(),
    preContentValue = contentNode.val();


    contentNode.removeAttr("readonly")
    contentNode.focus();

    $(e.target).hide();
    $(e.target).next().hide();
    $(e.target).parent().append('<a href="#" class="bit-comment-updateSave-btn">저장</a>  ');
    $(e.target).parent().append('<a href="#" class="bit-comment-updateCancel-btn">취소</a>');

    //comment-update-cancel
    $('.bit-comment-updateCancel-btn').off().click((e)=>{
      e.preventDefault();
      $(e.target).prev().prev().show();
      $(e.target).prev().prev().prev().show();
      $(e.target).prev().remove()
      $(e.target).remove();

      contentNode.attr("readonly",'true')
      contentNode.val(preContentValue);
    })

    //comment-update-save
    $('.bit-comment-updateSave-btn').off().click((e)=>{
      e.preventDefault();
      $.post('../../app/json/tourcomment/update',
              {

        no : $(e.target).prev().attr('id').replace(/[^0-9]/g,""),
        content : contentNode.val()
              }, 
              function(obj) {
                if (obj.status == 'success') {
                  contentNode.attr("readonly",'true')
                  $(e.target).prev().prev().show();
                  $(e.target).prev().show();
                  $(e.target).next().remove();
                  $(e.target).remove();
                } else {
                  alert('수정 실패입니다!\n' + obj.message)
                }
              });
    });

  }) //comment-update

}); //loaded-list


//next-comment
$(document.body).bind('activate-next-comment', () => {
  $('#next-comment-btn').off().click((e)=>{
    e.preventDefault();
    pageNo++;
    console.log(pageNo);
    var no = param.split('=')[1];

    $.getJSON('../../app/json/tour/detail?no=' + no + '&pageNo=' + pageNo,
            function(obj) {
      $(trGenerator(obj)).appendTo(comment);
      giveId();
      
      if(pageNo >= obj.totalPage){
        $('#next-comment-btn').hide();
      }
      $(document.body).trigger('loaded-list');
    });
    
  });
});

//give delete-btn,update-btn id
function giveId() {

  var deleteBottons = $('.bit-comment-delete-btn');
  for(deleteBotton of deleteBottons) {
    if (!$(deleteBotton).attr('id')) {
      var commentNoNode = $(deleteBotton).parent().prev().children().first();
      $(deleteBotton).attr('id', 'delete' + commentNoNode.val());
    }
  }

  var updateBottons = $('.bit-comment-update-btn');
  for(updateBotton of updateBottons) {
    if (!$(updateBotton).attr('id')) {
      var commentNoNode = $(updateBotton).parent().prev().children().first();
      $(updateBotton).attr('id', 'update' + commentNoNode.val());
    }
  }
}

