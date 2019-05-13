var param = location.href.split('?')[1],
templateSrc = $('#comment-template').html(),
comment = $('#comment'),
pageNo = 1;

if(sessionStorage.getItem('loginUser') != undefined){
  var user = JSON.parse(sessionStorage.getItem('loginUser'));
}


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

    controlNextComment(obj);

    $(document.body).trigger('loaded-list');
  });

}

function controlNextComment(obj){
  if(obj.commentAmount <= obj.pageSize){
    $('#next-comment-btn').hide();
  } else{
    $('#next-comment-btn').show();
    $(document.body).trigger('activate-next-comment');
  }
  
    
    if (obj.tourComment.length){
//    giveId();
      a();
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
      memberNo : user.no,
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
              controlNextComment(obj);
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
    $(e.target).parent().append('<a href="#" >저장</a>  ');
    $(e.target).parent().append('<a href="#" >취소</a>');
    
    
    //comment-update-cancel
    $($(e.target).next().next().next()).off().click((e)=>{
      e.preventDefault();
      $(e.target).prev().prev().show();
      $(e.target).prev().prev().prev().show();
      $(e.target).prev().remove()
      $(e.target).remove();

      contentNode.attr("readonly",'true')
      contentNode.val(preContentValue);
    })

    //comment-update-save
    $($(e.target).next().next()).off().click((e)=>{
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
      a();

      if(pageNo >= obj.totalPage){
        $('#next-comment-btn').hide();
      }
      $(document.body).trigger('loaded-list');
    });

  });
});

//give delete-btn,update-btn id
function giveId() {

  var deleteButtons = $('.bit-comment-delete-btn');
  for(deleteButton of deleteButtons) {
    if ($(deleteButton).attr('id')) 
      continue;
    
    var commentNoNode = $(deleteButton).parent().prev().prev().children().first();
    $(deleteButton).attr('id', 'delete' + commentNoNode.val());

  }

  var updateButtons = $('.bit-comment-update-btn');
  for(updateButton of updateButtons) {
    if ($(updateButton).attr('id')) 
      continue;

    var commentNoNode = $(updateButton).parent().prev().prev().children().first();
    $(updateButton).attr('id', 'update' + commentNoNode.val());

  }
}

function a() {
  
  var memberNameNodes = $('.bit-member-name');
  for (memberNameNode of memberNameNodes) {
    
    if(user.name == $(memberNameNode).html()) {
      console.log(user.name);
      console.log($(memberNameNode).html());
      $(memberNameNode).parent().next().children().show();
      giveId();
    }
    
  }
};

