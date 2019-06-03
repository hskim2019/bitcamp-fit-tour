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
      $('#comment-add-div').removeClass('bit-invisible');
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
  if($(memberNode).parents('.comment-row').hasClass('bit-update-state'))
    continue;
  if(user.no ==  $(memberNode).attr('id'))
    $(memberNode).parent().next().show(); 
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
          $('#comment-add-button').addClass("disabled");
          $('#comment-add-button').removeClass("pulse");
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
      $('#comment-add-button').removeClass("pulse");
      return;
    }
    
    $('#comment-add-button').removeClass("disabled");
    $('#comment-add-button').addClass("pulse");
  });

  
});

//AddEvent Comment Update,Delete Button
$(document.body).bind('addEventUpdateDeleteButton', () => {
  
  $('.fixed-action-btn').floatingActionButton({
    direction: 'bottom',
    hoverEnabled: false
  });
  
  //AddEvent Comment Delete Button
  $('.bit-comment-delete-btn').off().click((e) => {
    e.preventDefault();
    var commentNo = $(e.target).parents('div .comment-row').attr('id');
    var originCommentNo = $(e.target).parents('div .comment-origin').attr('id');
    $.getJSON('../../app/json/tourcomment/delete?no=' + commentNo,
        function(obj) {
          if (obj.status == 'success') {
            $(e.target).parents('div .comment-row')[0].remove();
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
    var content = $($(e.target).parents('div .row')[0]).next().find('input'),
    preContentValue = content.val(),
    actionBtn = $(e.target).parents('div .bit-action-btn'),
    recommentBtn =  $(e.target).parents('div .bit-comment-name-date-content').next().children().eq(0),
    cancelBtn =  $(e.target).parents('div .bit-comment-name-date-content').next().children().eq(1),
    saveBtn =  $(e.target).parents('div .bit-comment-name-date-content').next().children().eq(2),
    btnNode = $(e.target).parents('div .bit-comment-name-date-content').next(),
    commentRow = $(e.target).parents('div .comment-row');
    commentRow.addClass('bit-update-state');
    
    content.removeAttr("readonly")
    content.focus();
    actionBtn.hide();
    recommentBtn.hide();
    cancelBtn.show();
    saveBtn.show();
    
    //AddEvent Comment Update Cancle
    cancelBtn.click((e)=>{ 
      e.preventDefault();
      content.val(preContentValue);
      content.attr('readonly','true');
      content.css('color','black');
      actionBtn.show();
      recommentBtn.eq(0).show();
      saveBtn.hide();
      cancelBtn.hide();
      commentRow.removeClass('bit-update-state');
    }) 

    //AddEvent Comment Update Save
    saveBtn.click((e)=>{
      
      e.preventDefault();
      $.post('../../app/json/tourcomment/update',
          {
            no : commentRow.attr('id'),
            content : content.val()
          }, 
          function(obj) {
            if (obj.status == 'success') {
              content.attr("readonly",'true')
              content.css('color','black');
              actionBtn.show();
              recommentBtn.eq(0).show();
              saveBtn.hide();
              cancelBtn.hide();
              commentRow.removeClass('bit-update-state');
            } else {
              alert('수정 실패입니다!\n' + obj.message)
            }
          });
    });
    
  })
});


//CheckMoreComment
function checkMoreComment() {
  
  var currentPageCommentAmount = $('.comment-origin').length,
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
  
  for(commentRow of $('.comment-row')){
    
    var originCommentNo = $(commentRow).attr('id');
    $.ajaxSetup({async:false});
    $.getJSON('../../app/json/tourcomment/count?tourNo=' + tourNo +'&originCommentNo=' + originCommentNo,
       function(obj) {
         if(obj.commentAmount != 0){
           var reCommentListBtn = $(commentRow).children().eq(3).children().first();
             $(reCommentListBtn).removeClass('bit-invisible');
             $(reCommentListBtn).html('답글' + obj.commentAmount + '개 보기'/* + '<i class="fas fa-angle-down"></i>'*/);
             
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
    console.log(addDeleteCount);
  });
});

//CheckMoreReComment
function checkMoreReComment(reCommentListButton, allReCommentAmount) {
  var currentPageReCommentAmount = $(reCommentListButton).parent().prev().children('div').length;
      
      if(allReCommentAmount > currentPageReCommentAmount){
        $(reCommentListButton).show();
        $(reCommentListButton).html('답글'+(allReCommentAmount-currentPageReCommentAmount) +'개 더보기'/* + '<i class="fas fa-angle-down"></i>'*/)
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
    $('<div class="form-group">' +
      '<div class="input-field recomment-inputfield">' +
      '<i class="material-icons prefix">mode_edit</i>' +
      '<textarea class="recomment-add materialize-textarea" maxlength="50" data-length="50" name="recomment-content"></textarea>' +
      '<label for="">공개 답글 추가..</label>'+
      '</div>' +
      '<button type="button" class="waves-effect waves-light disabled btn recomment-save-button ml5 mb40">답글</button>' +
      '<button type="button" class="waves-effect waves-light btn recomment-cancel-button ml5 mb40">취소</button>' +
      '</div>').prependTo($(e.target).parent());
    $(e.target).parent().find('textarea').focus();
    $(e.target).hide();
    
    $('textarea.recomment-add').characterCounter();
    $(document.body).trigger('addEventReCommentSaveCancelButton');
    
    $(e.target).prev().find('textarea').keyup(function() {
      
      var noBlacnkComment = $(this).val().replace(/\s/gi, ""); // remove blanck comment
      
      if (noBlacnkComment == null || noBlacnkComment ==''){
        $(this).parent().next().addClass("disabled");
        $(this).parent().next().removeClass("pulse");
        return;
      }
      
      $(this).parent().next().removeClass('disabled');
      $(this).parent().next().addClass('pulse');
      
    });
  });
  
  
  //AddEventReCommentSaveButton
  $(document.body).bind('addEventReCommentSaveCancelButton', () => {
    
  $('.recomment-save-button').off().click((e)=>{
    
    var originCommentNo = ($(e.target).parents('div .comment-origin').attr('id'));
    $.post('../../app/json/tourcomment/add',
        {
          tourNo : tourNo,
          memberNo : user.no,
          originCommentNo : originCommentNo,
          level : 2,
          content : $(e.target).parent().find('textarea').val()
        }, 
        
        function(obj) {
          if (obj.status == 'success') {
            var newReComment ={
                'tourComment' : [{
                  'no': obj.no,
                  'content': $(e.target).parent().find('textarea').val(),
                  'createdDate' : now_yyyy_mm_dd_hh_mm(),
                  'member' : {name: user.name, no: user.no, photo:user.photo}
                }]
            };
            console.log($(e.target).parent().parent().next().children().first())
            $(reCommentGenerator(newReComment)).insertAfter($(e.target).parent().next().next().next());
            $(e.target).parent().parent().next().children().first().css('padding','30px 30px 30px 50px')
            showUpdateDeleteButton();
            $(document.body).trigger('addEventUpdateDeleteButton');
            storage['addDeleteCount' + originCommentNo] = storage['addDeleteCount' + originCommentNo] -1;
            console.log(storage['addDeleteCount' + originCommentNo]);
            $(e.target).parent().next().show();
            $(e.target).parent().remove();
          } else {
            alert('등록 실패입니다!\n' + obj.message)
          }
        });
  });
  
  $('.recomment-cancel-button').off().click((e)=>{
    $(e.target).parent().next().show();
    $(e.target).parent().remove();
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