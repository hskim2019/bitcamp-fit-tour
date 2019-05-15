var param = location.href.split('?')[1],
    tourNo = param.split('=')[1],
    templateSrc = $('#comment-template').html(),
    trGenerator = Handlebars.compile(templateSrc),
    pageNo = 1,
    addDeleteCount = 0,
    storage = {};
    


if(sessionStorage.getItem('loginUser')){
  var user = JSON.parse(sessionStorage.getItem('loginUser'))
}


if (param) {
  $('h1').html('투어 조회');
  tourList(tourNo);
  commentList(tourNo, pageNo, addDeleteCount, 0);
}


//TourList
function tourList(tourNo) {

  $.getJSON('../../app/json/tour/detail?no=' + tourNo,
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
    
  });
}

//CommentList
function commentList(tourNo, pageNo, addDeleteCount, originCommentNo) {
    console.log(tourNo, pageNo, addDeleteCount);
    $.getJSON('../../app/json/tourcomment/list?tourNo=' + tourNo +
        '&pageNo=' + pageNo + 
        '&addDeleteCount=' + addDeleteCount + 
        '&originCommentNo=' + originCommentNo,
      function(obj) {
    $(trGenerator(obj)).appendTo($('#comment'));
    commentAmountUpdate(obj.commentAmount, true);
    showUpdateDeleteButton();
    showReCommentListButton();
    showReCommentAddButton();
    if(user){
      $('#comment-textarea').removeClass('bit-invisible');
      $(document.body).trigger('addEventAddButton');
      $(document.body).trigger('addEventUpdateDeleteButton');
    }
    checkMoreComment();
  });
}

//Show Update,Delete Button
function showUpdateDeleteButton() {
  if(user == undefined) 
    return;

  var memberNodes = $('.bit-member');
  for (memberNode of memberNodes) {
    
  if(user.no ==  $(memberNode).attr('id')) {
    $(memberNode).parent().next().children().show();
      giveUdpateDeleteBtnId();
    }
  }
};

//Give Update,Delete Button Id
function giveUdpateDeleteBtnId() {

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

//CommentAmount Update
function commentAmountUpdate(commentAmount, init) {
  
  if(init){
    $('#commentAmount').html('댓글수' + commentAmount);
    
  }else {    
    var UpdatedCommentAmount = Number($('#commentAmount').html().replace(/[^0-9]/g,"")) + commentAmount;
    $('#commentAmount').html
    ('댓글수' + UpdatedCommentAmount);
  }
}

//AddEvent Comment Add Button
$(document.body).bind('addEventAddButton', () => {
  $('#comment-add-button').off().click((e) => {
    e.preventDefault();
    $.post('../../app/json/tourcomment/add',
      {
        tourNo : tourNo,
        memberNo : user.no,
        parentNo : 0,
        level : 1,
        content : $('#comment-add').val()
      }, 
      function(obj) {
        if (obj.status == 'success') {
          var newComment ={
            'tourComment' : [{
            'no': obj.no,
            'content': $('#comment-add').val(),
            'createdDate' : now_yyyy_mm_dd_hh_mm(),
            'member' : {name: user.name, no: user.no}
            }]
          };
          
          $(trGenerator(newComment)).prependTo($('#comment'));
          showUpdateDeleteButton();
          $(document.body).trigger('addEventUpdateDeleteButton');
          commentAmountUpdate(1, false);
          $('#comment-add').val('');
          addDeleteCount--;
          checkMoreComment();
          } else {
            alert('등록 실패입니다!\n' + obj.message)
          }
    });
  });
});

//AddEvent Comment Update,Delete Button
$(document.body).bind('addEventUpdateDeleteButton', () => {
  
  //AddEvent Comment Delete Button
  $('.bit-comment-delete-btn').off().click((e) => {
    e.preventDefault();
    var commentNo = $(e.target).attr('id').replace(/[^0-9]/g,"");
    $.getJSON('../../app/json/tourcomment/delete?no=' + commentNo,
        function(obj) {
          if (obj.status == 'success') {
            $(e.target).parent().parent().remove();
            commentAmountUpdate(-1);
            addDeleteCount++;
          } else {
            alert('삭제 실패입니다!\n' + obj.message)
          }
        });
  });

  //AddEvent Comment Update Button
  $('.bit-comment-update-btn').off().click((e) => {
    
    e.preventDefault();
    var contentNode = $(e.target).parent().next().children(),
    preContentValue = contentNode.val();
    contentNode.removeAttr("readonly")
    contentNode.focus();
    $(e.target).hide();
    $(e.target).next().hide();
    $(e.target).parent().append('<a href="#" >저장</a>');
    $(e.target).parent().append('<a href="#" >취소</a>');

    //AddEvent Comment Update Cancle
    $($(e.target).next().next().next()).off().click((e)=>{
      
      e.preventDefault();
      $(e.target).prev().prev().show();
      $(e.target).prev().prev().prev().show();
      $(e.target).prev().remove()
      $(e.target).remove();
      contentNode.attr("readonly",'true')
      contentNode.val(preContentValue);
    })

    //AddEvent Comment Update Save
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
  })
});


//CheckMoreComment
function checkMoreComment() {
  
  var currentPageCommentAmount = $('.commentRow').length,
      allCommentAmout = Number($('#commentAmount').html().replace(/[^0-9]/g,""));
      
      if(allCommentAmout > currentPageCommentAmount){
        $('#more-comment-btn').show();
        $(document.body).trigger('addEventMoreCommentButton');
      } else {
        $('#more-comment-btn').hide();
      }
}

//AddEventMoreCommentButton
$(document.body).bind('addEventMoreCommentButton', () => {
  
  $('#more-comment-btn').off().click((e)=>{
    e.preventDefault();
    pageNo++;
    commentList(tourNo, pageNo, addDeleteCount, 0);
  });
});



/************************************************************************************************/
//ReComment
/************************************************************************************************/

//ReCommentList
function reCommentList(tourNo, pageNo, addDeleteCount, originCommentNo, ReCommnetListButton) {
  
    console.log(tourNo , pageNo , addDeleteCount);
    $.getJSON('../../app/json/tourcomment/list?tourNo=' + tourNo +
        '&pageNo=' + pageNo + 
        '&addDeleteCount=' + addDeleteCount + 
        '&originCommentNo=' + originCommentNo,
      function(obj) {
        for(tourComment of obj.tourComment){
          tourComment.member.name = '　└─　' + tourComment.member.name
          tourComment.content = '　　　　' + tourComment.content
        }
        $(ReCommnetListButton).parent().parent().after(trGenerator(obj));
        showUpdateDeleteButton();
    if(user){
      $(document.body).trigger('addEventUpdateDeleteButton');
    }
    checkMoreComment();
  });
}


//Show ReCommentListButton
function showReCommentListButton() {
  
  for(commentRow of $('.commentRow')){
    
    var commentNo = $(commentRow).children().first().children().first().val();
    $.ajaxSetup({async:false});
    $.getJSON('../../app/json/tourcomment/count?tourNo=' + tourNo +'&originCommentNo=' + commentNo,
       function(obj) {
         if(obj.commentAmount != 0){
           var reCommentListBtn = $(commentRow).children().eq(5).children().first();
             $(reCommentListBtn).removeClass('bit-invisible');
             $(reCommentListBtn).html('답글 ' + obj.commentAmount + '개 보기');
             
           }
         });
  }
  
  $.ajaxSetup({async:true});
  $(document.body).trigger('addEventReCommentListButton');

}

//AddEvnet ReCommnetListButton
$(document.body).bind('addEventReCommentListButton', () => {
  
  $('.bit-recomment-list-btn').off().click((e)=>{
    e.preventDefault();
    $(e.target).hide();
    var originCommentNo = $(e.target).parent().parent().children().first().children().first().val();
    reCommentList(tourNo, 1, 0, originCommentNo, e.target);
    
  });
});


//Show ReCommentAddButton
function showReCommentAddButton() {
  if(user){
    $('.bit-recomment-add-btn').removeClass('bit-invisible');
    $(document.body).trigger('addEventReCommentAddButton');
  }
}

//AddEvnet ReCommentAddButton
$(document.body).bind('addEventReCommentAddButton', () => {
  
  $('.bit-recomment-add-btn').off().click((e)=>{
    $('.bit-recomment-add-btn').off();
    e.preventDefault();
    $('<div class="col-sm-12" ><input type="text" name="recommentContent" class="col-sm-11" >' +
          '<button type="button" class="btn btn-primary col-sm-0">등록</button>')
          .insertAfter($(e.target).parent());
  });
});

//AddEvent Comment Add Button
$(document.body).bind('addEventRecommentAddButton', () => {
  $('#comment-add-button').off().click((e) => {
    e.preventDefault();
    $.post('../../app/json/tourcomment/add',
      {
        tourNo : tourNo,
        memberNo : user.no,
        parentNo : 0,
        level : 1,
        content : $('#comment-add').val()
      }, 
      function(obj) {
        if (obj.status == 'success') {
          var newComment ={
            'tourComment' : [{
            'no': obj.no,
            'content': $('#comment-add').val(),
            'createdDate' : now_yyyy_mm_dd_hh_mm(),
            'member' : {name: user.name, no: user.no}
            }]
          };
          
          $(trGenerator(newComment)).prependTo($('#comment'));
          showUpdateDeleteButton();
          $(document.body).trigger('addEventUpdateDeleteButton');
          commentAmountUpdate(1, false);
          $('#comment-add').val('');
          addDeleteCount--;
          checkMoreComment();
          } else {
            alert('등록 실패입니다!\n' + obj.message)
          }
    });
  });
});



function now_yyyy_mm_dd_hh_mm () {
  now = new Date();
  year = "" + now.getFullYear();
  month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
  day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
  hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
  minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
  return year + "-" + month + "-" + day + " " + hour + ":" + minute;
}



////addEventReplyButton
//$(document.body).bind('addEventReplyButton', () => {
//$('#comment-reply-button').off().click((e) => {
//e.preventDefault();
//if(user == undefined) {
//  location.href = "/bitcamp-fit-tour/html/auth/login.html";
//}
//
//var tourNo = location.href.split('?')[1].split('=')[1];
//var content = $('#comment-add').val();
//addDeleteCount--;
//$.post('../../app/json/tourcomment/add',
//    {
//  tourNo : tourNo,
//  memberNo : user.no,
//  originCommentNo : 0,
//  level : 2,
//  content : content
//    }, 
//    function(obj) {
//      if (obj.status == 'success') {
//        var no = obj.no;
//        var name = user.name;
//        var content = $('#comment-add').val();
//        var d = now_yyyy_mm_dd_hh_mm();
//
//        var obj ={
//            'tourComment' : [{
//              'no': no,
//              'content': content,
//              'createdDate' : d,
//              'member' : {name: name}
//            }]
//        };
//
//        $(trGenerator(obj)).prependTo(comment);
//        $(document.body).trigger('addEventUpdateDeleteButton');
//        showUpdateDeleteButton();
//        var commentAmount = Number($('#commentAmount').html().replace(/[^0-9]/g,"")),
//            nextCommentAmount =commentAmount + 1
//            
//        $('#commentAmount').html('댓글수' + nextCommentAmount);
//        $('#comment-add').val('');
//
//      } else {
//        alert('등록 실패입니다!\n' + obj.message)
//      }
//
//    });
//});
//});  // addEventReplyButton

//Print current time yyyy_mm_dd_hh_mm format
