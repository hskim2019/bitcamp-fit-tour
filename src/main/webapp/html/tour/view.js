var param = location.href.split('?')[1],
templateSrc = $('#comment-template').html(),
comment = $('#comment'),
totalPage,
pageNo = 1,
addDeleteCount = 0,
user;

if(sessionStorage.getItem('loginUser') != undefined){
  user = JSON.parse(sessionStorage.getItem('loginUser'));
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
    totalPage = obj.totalPage;
      
    controlNextComment(obj);

    $(document.body).trigger('addEventAddButton');
    $(document.body).trigger('addEventUpdateDetailButton');
    $(document.body).trigger('addEventRecommentListButton');
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
    showUpdateDeleteButton();
  }
}

//comment-add
$(document.body).bind('addEventAddButton', () => {
  $('#comment-add-button').off().click((e) => {
    e.preventDefault();
    var tourNo = location.href.split('?')[1].split('=')[1];
    var content = $('#comment-add').val();
    addDeleteCount--;
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
            var no = obj.no;
            var name = user.name;
            var content = $('#comment-add').val();
            var d = now_yyyy_mm_dd_hh_mm();

            var obj ={
                'tourComment' : [{
                  'no': no,
                  'content': content,
                  'createdDate' : d,
                  'member' : {name: name}
                }]
            };

            $(trGenerator(obj)).prependTo(comment);
            $(document.body).trigger('addEventUpdateDetailButton');
            showUpdateDeleteButton();
            var commentAmount = Number($('#commentAmount').html().replace(/[^0-9]/g,"")),
                nextCommentAmount =commentAmount + 1
                
            $('#commentAmount').html('댓글수' + nextCommentAmount);
            $('#comment-add').val('');

          } else {
            alert('등록 실패입니다!\n' + obj.message)
          }

        });
  });
});


$(document.body).bind('addEventUpdateDetailButton', () => {

  //comment-delete
  $('.bit-comment-delete-btn').off().click((e) => {
    e.preventDefault();
    var no = $(e.target).attr('id').replace(/[^0-9]/g,"");
    $.getJSON('../../app/json/tourcomment/delete?no=' + no,
        function(obj) {
      if (obj.status == 'success') {
        $(e.target).parent().parent().remove();
        var commentAmount = Number($('#commentAmount').html().replace(/[^0-9]/g,"")),
        nextCommentAmount =commentAmount + -1;
        
        $('#commentAmount').html('댓글수' + nextCommentAmount);
        
        addDeleteCount++;
        
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
    var no = param.split('=')[1];
    
    console.log(pageNo);
    $.getJSON('../../app/json/tour/detail?no=' + no + '&pageNo=' + pageNo + '&addDeleteCount=' + addDeleteCount,
        function(obj) {
      $(trGenerator(obj)).appendTo(comment);
      showUpdateDeleteButton();
      
      if(pageNo >= window.totalPage){
        $('#next-comment-btn').hide();
      }
      $(document.body).trigger('addEventUpdateDetailButton');
    });

  });
});

$(document.body).bind('addEventRecommentListButton', () => {
  $('#bit-recomment-list-btn').off().click((e)=>{
    e.preventDefault();
    pageNo++;
    var no = param.split('=')[1];
    
    console.log(pageNo);
    $.getJSON('../../app/json/tour/detail?no=' + no + '&pageNo=' + pageNo + '&addDeleteCount=' + addDeleteCount,
        function(obj) {
      $(trGenerator(obj)).appendTo(comment);
      showUpdateDeleteButton();
      
      if(pageNo >= window.totalPage){
        $('#next-comment-btn').hide();
      }
      $(document.body).trigger('addEventUpdateDetailButton');
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

//show Update,Delte Button
function showUpdateDeleteButton() {

  if(user == undefined) 
    return;

  var memberNameNodes = $('.bit-member-name');
  for (memberNameNode of memberNameNodes) {

    if(user.name == $(memberNameNode).html()) {

      $(memberNameNode).parent().next().children().show();
      giveId();
    }

  }
};

//function showReCommentAddButton() {
//  
//  if(user == undefined){
//    alert('로그인이 되어있지 않습니다.');
//    location.href = "/bitcamp-fit-tour/html/auth/login.html";
//  }
//    
//}


function now_yyyy_mm_dd_hh_mm () {
  now = new Date();
  year = "" + now.getFullYear();
  month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
  day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
  hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
  minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
  return year + "-" + month + "-" + day + " " + hour + ":" + minute;
}

