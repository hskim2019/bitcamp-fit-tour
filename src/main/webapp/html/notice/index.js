var user;
var rank;
if(sessionStorage.getItem('loginUser')) {
  user = JSON.parse(sessionStorage.getItem('loginUser'));
  if(user.rank == 2) {
    rank = user.rank;
    console.log(user.rank);
    $('.add-notice').removeClass('bit-invisible');
    $('.add-faq').removeClass('bit-invisible');
    $('#update-btn').removeClass('bit-invisible');
    $('#delete-btn').removeClass('bit-invisible');
  }
}


var pageNo = 1,
    pageSize = 5,
    tbody = $('.tbodyNotice'),
    prevPageLi = $('#prevPage'),
    nextPageLi = $('#nextPage'),
    currSpan = $('#currPage > span'),
    templateSrc = $('#tr-template').html(); // script 태그에서 템플릿 데이터를 꺼낸다.
var noticeNo;

//Handlebars를 통해 템플릿 데이터를 가지고 최종 결과를 생성할 함수를 준비한다.
var trGenerator = Handlebars.compile(templateSrc);

// JSON 형식의 데이터 목록 가져오기
function noticeList(pn) {
  
  $.getJSON('../../app/json/notice/list?pageNo=' + pn + '&pageSize=' + pageSize, 
    function(obj) {
      // 서버에 받은 데이터 중에서 페이지 번호를 글로벌 변수에 저장한다.
      pageNo = obj.pageNo;
      
      // TR 태그를 생성하여 테이블 데이터를 갱신한다.
      tbody.html(''); // 이전에 출력한 내용을 제거한다.
      
      // 템플릿 엔진을 실행하여 tr 태그 목록을 생성한다. 그리고 바로 tbody에 붙인다.
      $(trGenerator(obj)).appendTo(tbody);
      
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
      $(document.body).trigger('notice-list');
      $(document.body).trigger('faq-ready');
    }); // Bitcamp.getJSON()
  
} // noticeList()

noticeList(1);

$('#prevPage > a').click((e) => {
  e.preventDefault();
  noticeList(pageNo - 1);
});

$('#nextPage > a').click((e) => {
  e.preventDefault();
  noticeList(pageNo + 1);
});



// 테이블 목록 가져오기를 완료했으면 제목 a 태그에 클릭 리스너를 등록한다. 
$(document.body).bind('notice-list', () => {
  // 제목을 클릭했을 때 view.html로 전환시키기
  $('.bit-view-link').click((e) => {
    e.preventDefault();
//    window.location.href = 'view.html?no=' + 
//      $(e.target).attr('data-no');
    
        $('.notice').addClass('bit-invisible');
        $('.faq').addClass('bit-invisible');
       
        $('.view').removeClass('bit-invisible');
        noticeNo = $(e.target).attr('data-no');
        loadData(noticeNo);
        
  });
});

$('.collapsible-notice').click((e) => {
	$('.collapsible-notice').addClass('checked');
	$('.collapsible-faq').removeClass('checked');

	$('.faq').addClass('bit-invisible');
	$('.view').addClass('bit-invisible');


	$('.notice').removeClass('bit-invisible');
	noticeList(1);
});

$('.collapsible-faq').click((e) => {
	$('.collapsible-faq').addClass('checked');
	$('.collapsible-notice').removeClass('checked');
	$('.notice').addClass('bit-invisible');
	$('.faq').removeClass('bit-invisible');
	FAQList('', 1);
	$('.view').addClass('bit-invisible');
	
});

function loadData(noticeNo) {
  $.getJSON('../../app/json/notice/detail?no=' + noticeNo, 
      function(data) {
    
    $('#titleTd').html(data.title);
    $('#createdDateTd').html(data.createdDate);
    $('#countViewTd').html(data.viewCount);
    $('#content').html(data.content);
    
    $(document.body).trigger('loaded-list');
  });
  
};

$('#delete-btn').click((e) => {
  e.preventDefault();
  
  Swal.fire({
    title: '게시글을 삭제하시겠습니까?',
    text: "",
    type: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    confirmButtonColor: '#3085d6',
    cancelButtonText: '취소',
    confirmButtonText: '확인'
  }).then((result) => {

    if (result.value) {
      $.getJSON('../../app/json/notice/delete?no=' + noticeNo, 
          function(data) {
        
        if(data.status == 'success') {
          Swal.fire(
              '삭제완료!',
              '해당 글을 삭제하였습니다.',
              'success'
            )
            $('.swal2-confirm').click((e) => {
              e.preventDefault();
              location.href = "index.html";
            });
        } else {
          //alert('삭제 실패 입니다.\n' + data.message);
          Swal.fire({
            type: 'error',
            title: '삭제 실패 입니다',
            text: data.message,
          })
           $('.swal2-confirm').click((e) => {
              e.preventDefault();
              location.href = "index.html";
            });
        }
      });

    }
  })
  
});


$(document.body).bind('loaded-list', () => {
  $('#update-btn').click((e) => {
    e.preventDefault();
    window.location.href = 'add.html?no=' + noticeNo;
  });
});

$(document.body).bind('loaded-list', () => {
  $('#backToList').click((e) => {
    e.preventDefault();
    $('#titleTd').html('');
    $('#createdDateTd').html('');
    $('#countViewTd').html('');
    $('#content').html('');
    $('.view').addClass('bit-invisible');
    $('.notice').removeClass('bit-invisible');
  });
});

