var pageNo = 1,
    pageSize = 10,
    tbody = $('tbody'),
    prevPageLi = $('#prevPage'),
    nextPageLi = $('#nextPage'),
    currSpan = $('#currPage > span'),
    templateSrc = $('#tr-template').html(); // script 태그에서 템플릿 데이터를 꺼낸다.

var search = '';
var searchCategory = '';
//Handlebars를 통해 템플릿 데이터를 가지고 최종 결과를 생성할 함수를 준비한다.
var trGenerator = Handlebars.compile(templateSrc);

//$('.dropdown-trigger').dropdown();
$(document).ready(function(){
  $('.modal').modal();
  $('.modal2').modal();
});
      

// JSON 형식의 데이터 목록 가져오기
function loadList(pn, searchCategory, search) {
  
  $.getJSON('../../app/json/member/list?pageNo=' + pn + '&pageSize=' + pageSize + '&searchCategory=' + searchCategory + '&search=' +search, 
    function(obj) {
      // 서버에 받은 데이터 중에서 페이지 번호를 글로벌 변수에 저장한다.
      pageNo = obj.pageNo;
      
      // TR 태그를 생성하여 테이블 데이터를 갱신한다.
      tbody.html(''); // 이전에 출력한 내용을 제거한다.
      
      // 템플릿 엔진을 실행하여 tr 태그 목록을 생성한다. 그리고 바로 tbody에 붙인다.
      $(trGenerator(obj)).appendTo(tbody);

//      for(listRow of $('.listRow')) {
//        $.ajaxSetup({async:false});
//        var rank = $(listRow).children().eq(1).html();
//        if (rank == 0) {
//          $(listRow).children().eq(1).html('일반회원');
//        } else if (rank == 1) {
//          $(listRow).children().eq(1).html('인증회원');
//        } else if(rank == 3) {
//          $(listRow).children().eq(1).html('탈퇴');
//        } else {
//          $(listRow).children().eq(1).html('관리자');
//        }
//        var smsCheckHtml = $(listRow).children().eq(8).html();
//        var emailCheckHtml = $(listRow).children().eq(9).html();
//        if(smsCheckHtml == 'true') {
//          $(listRow).children().eq(8).html('<i class="tiny material-icons">check</i>');
//        } else {
//          $(listRow).children().eq(8).html('<i class="tiny material-icons">remove</i>');
//        }
//        if(emailCheckHtml == 'true') {
//          $(listRow).children().eq(9).html('<i class="tiny material-icons">check</i>');
//        } else {
//          $(listRow).children().eq(9).html('<i class="tiny material-icons">remove</i>');
//        }
//        $.ajaxSetup({async:true});
 //     }
        
        for(memberRank of $('.memberRank')) {
          var rankId = $(memberRank).attr('id');
          if (rankId == 0) {
            $(memberRank).append('일반회원');
          } else if (rankId == 1) {
            $(memberRank).append('인증회원');
          } else if (rankId == 3) {
            $(memberRank).append('탈퇴');
            $(memberRank).addClass('reason');
            $(memberRank).parent().addClass('leaveMember');
          } else if (rankId == 2) {
            $(memberRank).append('관리자');
          }
        }
        
        for(smsCheck of $('.smsCheck')) {
          var smsCheckStatus = $(smsCheck).attr('id');
          if(smsCheckStatus == 'true') {
            $(smsCheck).append('<i class="tiny material-icons">check</i>');
          } else {
            $(smsCheck).append('<i class="tiny material-icons">remove</i>');
          }
        }
        for(emailCheck of $('.emailCheck')) {
          var emailCheckStatus = $(emailCheck).attr('id');
          if(emailCheckStatus == 'true') {
            $(emailCheck).append('<i class="tiny material-icons">check</i>');
          } else {
            $(emailCheck).append('<i class="tiny material-icons">remove</i>');
          }
        }
        
        
      
      // 현재 페이지의 번호를 갱신한다.
      currSpan.html(String(pageNo));
      
      // 1페이지일 경우 버튼을 비활성화 한다.
      if (pageNo == 1) {
        prevPageLi.addClass('disabled');
      } else {
        prevPageLi.removeClass('disabled');
      } 
        
      // 마지막 페이지일 경우 버튼을 비활성화 한다.
      if (pageNo == obj.totalPage) {
        nextPageLi.addClass('disabled');
      } else {
        nextPageLi.removeClass('disabled');
      }
      
      // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
      $(document.body).trigger('loaded-list');
      
    }); // Bitcamp.getJSON()
  
} // loadList()

$('#prevPage > a').click((e) => {
  e.preventDefault();
  loadList(pageNo - 1, searchCategory, search);
});

$('#nextPage > a').click((e) => {
  e.preventDefault();
  loadList(pageNo + 1, searchCategory, search);
});

//페이지를 출력한 후 1페이지 목록을 로딩한다.
loadList(1, searchCategory, search);

// 테이블 목록 가져오기를 완료했으면 제목 a 태그에 클릭 리스너를 등록한다. 
//$(document.body).bind('loaded-list', () => {
//  // 제목을 클릭했을 때 view.html로 전환시키기
//  $('.bit-view-link').click((e) => {
//    e.preventDefault();
//    window.location.href = 'view.html?no=' + 
//      $(e.target).attr('data-no');
//  });
//});

//function    changeIntoText(CheckHtml, check) {
//  switch (CheckHtml) {
//  case 'true' :
//    check.html('동의');
//    break;
//  case 'false' :
//    check.html('거부');
//    break;
//  }
//}

$('#search-btn').click((e) => {
  e.preventDefault();
  searchCategory = $('#search-categories option:selected').val();
  console.log(searchCategory);
  search = $('#search-box').val();
  loadList(1, searchCategory, search);
});


$(document.body).bind('loaded-list', () => {
$('.bit-view-link').click((e) => {
e.preventDefault();
var image = $(e.target).attr('data-photo');
if(image != 'default.jpg'){
  $('#profile-picture').attr('src', '/bitcamp-fit-tour/upload/member/' + image);
} else {
  $('#profile-picture').addClass('bit-invisible');
  $('.default-profile').removeClass('bit-invisible');
}
});
});

$('.btn-flat-photo').click((e) => {
  e.preventDefault();
  $('#profile-picture').removeClass('bit-invisible');
  $('.default-profile').addClass('bit-invisible');
});

$(document.body).bind('loaded-list', () => {
$('.reason').click((e) => {
  e.preventDefault();
  $('.leaveMember-reason').html('');
  $('.leaveMember-reason').append($(e.target).attr('data-content'));
});
});