var commentTemplateSrc = $('#comment-template').html(),
    reCommenttemplateSrc = $('#reComment-template').html(),
    commentGenerator = Handlebars.compile(commentTemplateSrc),
    reCommentGenerator = Handlebars.compile(reCommenttemplateSrc),
    pageNo = 1,
    addDeleteCount = 0,
    storage = {};
    
if(sessionStorage.getItem('loginUser')){
  var user = JSON.parse(sessionStorage.getItem('loginUser'))
}

//CommentList
function commentList(tourNo, pageNo, addDeleteCount, originCommentNo) {
    //console.log(tourNo, pageNo, addDeleteCount);
    $.getJSON('../../app/json/tourcomment/list?tourNo=' + tourNo +
        '&pageNo=' + pageNo + 
        '&addDeleteCount=' + addDeleteCount + 
        '&originCommentNo=' + originCommentNo,
      function(obj) {
      console.log(obj);
    $(commentGenerator(obj)).appendTo($('#comment'));
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
    }
  }
};


//CommentAmount Update
function commentAmountUpdate(commentAmount, init) {
  
  if(init){
    $('#commentAmount').html('댓글 ' + commentAmount + '개');
    
  }else {    
    var UpdatedCommentAmount = Number($('#commentAmount').html().replace(/[^0-9]/g,"")) + commentAmount;
    $('#commentAmount').html
    ('댓글 ' + UpdatedCommentAmount + '개');
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
            'member' : {name: user.name, no: user.no, photo: user.photo}
            }]
          };
          
          $(commentGenerator(newComment)).prependTo($('#comment'));
          showUpdateDeleteButton();
          $(document.body).trigger('addEventUpdateDeleteButton');
          commentAmountUpdate(1, false);
          $('#comment-add').val('');
          addDeleteCount--;
          showReCommentAddButton();
          } else {
            alert('등록 실패입니다!\n' + obj.message)
          }
    });
  });
  
  //CommentAddButton Active Check
  $('#comment-add').keyup(function() {
    
    var noBlacnkComment = $('#comment-add').val().replace(/\s/gi, ""); // remove blanck comment

    if (noBlacnkComment == null || noBlacnkComment ==''){
      $('#comment-add-button').addClass("disabled");
      return;
    }
    
    $('#comment-add-button').removeClass("disabled");
    
  });

  
});

//AddEvent Comment Update,Delete Button
$(document.body).bind('addEventUpdateDeleteButton', () => {
  
  //AddEvent Comment Delete Button
  $('.bit-comment-delete-btn').off().click((e) => {
    e.preventDefault();
    var commentNo = $(e.target).parent().parent().attr('id');
    var originCommentNo = $(e.target).parent().parent().parent().parent().attr('id');
    $.getJSON('../../app/json/tourcomment/delete?no=' + commentNo,
        function(obj) {
          if (obj.status == 'success') {
            $(e.target).parent().parent().remove();
            commentAmountUpdate(-1);
            addDeleteCount++;
            storage['addDeleteCount' + originCommentNo] = storage['addDeleteCount' + originCommentNo] +1;
            console.log(storage['addDeleteCount' + originCommentNo]);
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
    $(e.target).parent().append(' <a href="#" >취소</a>');

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
            no : $(e.target).parent().parent().attr('id'),
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
      allCommentAmount = Number($('#commentAmount').html().replace(/[^0-9]/g,""));
      
      if(allCommentAmount > currentPageCommentAmount){
        $('#more-comment-btn').show();
        $('#more-comment-btn').html('댓글' + (allCommentAmount -currentPageCommentAmount) + '개 더보기 ' + '<i class="fas fa-angle-down"></i>');
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
    $('#more-comment-btn').html()
  });
});



/*************************************************************************************************/
/********************************ReComment************************************/
/************************************************************************************************/

//ReCommentList
function reCommentList(tourNo, pageNo, addDeleteCount, originCommentNo, ReCommnetListButton) {
    var allReCommentAmount;
    //console.log(tourNo , pageNo , addDeleteCount);
    $.ajaxSetup({async:false});
    $.getJSON('../../app/json/tourcomment/list?tourNo=' + tourNo +
        '&pageNo=' + pageNo + 
        '&addDeleteCount=' + addDeleteCount + 
        '&originCommentNo=' + originCommentNo,
      function(obj) {
        $(ReCommnetListButton).parent().prev().append(reCommentGenerator(obj));
        showUpdateDeleteButton();
    if(user){
      $(document.body).trigger('addEventUpdateDeleteButton');
    }
    allReCommentAmount = obj.commentAmount;
  });
    $.ajaxSetup({async:true});
    return allReCommentAmount;
}


//Show ReCommentListButton
function showReCommentListButton() {
  
  for(commentRow of $('.commentRow')){
    
    var originCommentNo = $(commentRow).attr('id');
    $.ajaxSetup({async:false});
    $.getJSON('../../app/json/tourcomment/count?tourNo=' + tourNo +'&originCommentNo=' + originCommentNo,
       function(obj) {
         if(obj.commentAmount != 0){
           var reCommentListBtn = $(commentRow).children().eq(4).children().first();
             $(reCommentListBtn).removeClass('bit-invisible');
             $(reCommentListBtn).html('답글 ' + obj.commentAmount + '개 보기 ' + '<i class="fas fa-angle-down"></i>');
             
             storage['pageNo' + originCommentNo] = 1;
             storage['addDeleteCount' + originCommentNo] = 0;
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
    var originCommentNo = $(e.target).parent().parent().attr('id');
    
    var allReCommentAmount = reCommentList(
          tourNo, 
          storage['pageNo' + originCommentNo], 
          storage['addDeleteCount' + originCommentNo], 
          originCommentNo, 
          e.target);
    storage['pageNo' + originCommentNo] = storage['pageNo' + originCommentNo] + 1
    checkMoreReComment(e.target, allReCommentAmount);
  });
});

//CheckMoreReComment
function checkMoreReComment(reCommentListButton, allReCommentAmount) {
  var currentPageReCommentAmount = $(reCommentListButton).parent().prev().children('div').length;
      
      if(allReCommentAmount > currentPageReCommentAmount){
        $(reCommentListButton).show();
        $(reCommentListButton).html('답글 '+(allReCommentAmount-currentPageReCommentAmount) +'개 더보기 ' + '<i class="fas fa-angle-down"></i>')
        $(reCommentListButton).addClass('bit-recomment-list-button');
      } else {
        $(reCommentListButton).hide();
      }
}


//Show ReCommentAddButton
function showReCommentAddButton() {
  if(user){
    $('.bit-recomment-add-btn').removeClass('bit-invisible');
    $(document.body).trigger('addEventReCommentAddButton');
  }
}

//AddEvnet ReCommentAddButton and AddEventReCommentSaveButton
$(document.body).bind('addEventReCommentAddButton', () => {
  
  //AddEvent ReCommentAddButton
  $('.bit-recomment-add-btn').off().click((e)=>{
    
    e.preventDefault();
    $(e.target).off();
    $('<div class="col-sm-12" style="font-size:15px; padding: 30px 0px 30px 0px">'+
        '<input type="text" name="recommentContent" class="col-sm-10" >' +
          ' <button type="button" class="btn btn-default btn-secondary recomment-save-button" disabled>답글</button></div>')
          .insertAfter($(e.target));
    $(document.body).trigger('addEventReCommentSaveButton');
  
    $(e.target).next().children().first().keyup(function() {
      
      var noBlacnkComment = $(e.target).next().children().first().val().replace(/\s/gi, ""); // remove blanck comment
  
      if (noBlacnkComment == null || noBlacnkComment ==''){
        $(e.target).next().children().first().next().attr("disabled", true);
        $(e.target).next().children().first().next().addClass("btn-secondary");
        return;
      }
      
      $(e.target).next().children().first().next().removeClass("btn-secondary",);
      $(e.target).next().children().first().next().addClass("btn-primary",);
      $(e.target).next().children().first().next().removeAttr("disabled");
      
    });
  });
  
  
  //AddEventReCommentSaveButton
  $(document.body).bind('addEventReCommentSaveButton', () => {
    
  $('.recomment-save-button').off().click((e)=>{
    
    var originCommentNo = ($(e.target).parent().parent().parent().attr('id'));
    $.post('../../app/json/tourcomment/add',
        {
          tourNo : tourNo,
          memberNo : user.no,
          originCommentNo : originCommentNo,
          level : 2,
          content : $(e.target).prev().val()
        }, 
        
        function(obj) {
          if (obj.status == 'success') {
            var newReComment ={
                'tourComment' : [{
                  'no': obj.no,
                  'content': $(e.target).prev().val(),
                  'createdDate' : now_yyyy_mm_dd_hh_mm(),
                  'member' : {name: user.name, no: user.no, photo:user.photo}
                }]
            };
            
            $(reCommentGenerator(newReComment)).insertAfter($(e.target).parent());
            showUpdateDeleteButton();
            $(document.body).trigger('addEventUpdateDeleteButton');
            $(e.target).prev().val('');
            storage['addDeleteCount' + originCommentNo] = storage['addDeleteCount' + originCommentNo] -1;
            $(e.target).attr("disabled", true);
            $(e.target).addClass("btn-secondary");
            console.log(storage['addDeleteCount' + originCommentNo]);
          } else {
            alert('등록 실패입니다!\n' + obj.message)
          }
        });
  });
});
});


//Print current time yyyy_mm_dd_hh_mm format
function now_yyyy_mm_dd_hh_mm () {
  now = new Date();
  year = "" + now.getFullYear();
  month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
  day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
  hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
  minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
  return year + "-" + month + "-" + day + " " + hour + ":" + minute;
}