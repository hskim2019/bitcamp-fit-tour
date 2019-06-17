var category = '',
    FAQpageNo = 1,
    FAQpageSize = 3,
    tbodyFaq = $('.tbodyFAQ'),
    FAQprevPageLi = $('#prevPageFaq'),
    FAQnextPageLi = $('#nextPageFaq'),
    FAQcurrSpan = $('#FAQcurrSpan'),
    FAQtemplateSrc = $('#tr-template-faq').html(); // script 태그에서 템플릿 데이터를 꺼낸다.
var faqNo;

//Handlebars를 통해 템플릿 데이터를 가지고 최종 결과를 생성할 함수를 준비한다.
var FAQtrGenerator = Handlebars.compile(FAQtemplateSrc);

// JSON 형식의 데이터 목록 가져오기
function FAQList(category, pn) {
  
  $.getJSON('../../app/json/faq/list?category=' + category + '&pageNo=' + pn + '&pageSize=' + FAQpageSize, 
    function(data) {
      // 서버에 받은 데이터 중에서 페이지 번호를 글로벌 변수에 저장한다.
      FAQpageNo = data.faqpageNo;
      
      // TR 태그를 생성하여 테이블 데이터를 갱신한다.
      tbodyFaq.html(''); // 이전에 출력한 내용을 제거한다.
      
      // 템플릿 엔진을 실행하여 tr 태그 목록을 생성한다. 그리고 바로 tbody에 붙인다.
      $(FAQtrGenerator(data)).appendTo(tbodyFaq);
      
      // 현재 페이지의 번호를 갱신한다.
      FAQcurrSpan.html(String(FAQpageNo));
      
      // 1페이지일 경우 버튼을 비활성화 한다.
      if (FAQpageNo == 1) {
        FAQprevPageLi.addClass('disabled');
      } else {
        FAQprevPageLi.removeClass('disabled');
      } 
        
      // 마지막 페이지일 경우 버튼을 비활성화 한다.
      if (FAQpageNo == data.faqtotalPage) {
        FAQnextPageLi.addClass('disabled');
      } else {
        FAQnextPageLi.removeClass('disabled');
      }
      
      // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
      $(document.body).trigger('FAQ-list');
      
    }); // Bitcamp.getJSON()
  
} // FAQList()

//페이지를 출력한 후 1페이지 목록을 로딩한다.
//FAQList('', 1);

$(document).ready(function(){
  $('select').formSelect();
});


$('#faq-categories').change(function () {
  category = $('#faq-categories option:selected').html();
  console.log($('#faq-categories option:selected').html());
 if(category == '전체') {
   category = '';
   FAQList(category, 1);
 } else {
// $.getJSON('../../app/json/faq/list?category=' + $('#faq-categories option:selected').html(),
//     function(obj) {
     FAQList(category, 1);
// });
 }
});

$('.FAQprevPageLink').click((e) => {
  e.preventDefault();
  FAQList(category, FAQpageNo - 1);
});

$('.FAQnextpageLink').click((e) => {
  e.preventDefault();
  FAQList(category, FAQpageNo + 1);
});


$(document.body).bind('FAQ-list', () => {
  $('.bit-faq-link').click((e) => {
    e.preventDefault();
    faqNo = $(e.target).attr('faq-no');
    
    if($(e.target).attr('id') == 'fold') {
      $(e.target).attr('id', 'open');
      $.getJSON('../../app/json/faq/detail?no=' + faqNo /*$(e.target).attr('faq-no')*/,
          function(data2) {
        $(e.target).parent().parent().after(
            '<tr>' +
            '<td class="center">' +
            '<a href=\'#\' class="faq-update-btn" id=' + faqNo + '>수정 </a>' + 
            '<a href=\'#\' class="faq-delete-btn" id=' + faqNo + '>/ 삭제</a>' + 
            '</td>' +
            '<td>' + data2.content + '</td>' +
            '</tr>');
        
             if(rank != 2) {
               $('.faq-update-btn').addClass('bit-invisible');
               $('.faq-delete-btn').addClass('bit-invisible');
             }
             $(document.body).trigger('loaded-faq-view');
      });
      
    } else {
      $(e.target).attr('id', 'fold');
      $(e.target).parent().parent().next().remove();
    }
  });
  
})

$(document.body).bind('loaded-faq-view', () => {
$('.faq-delete-btn').click((e) => {
  e.preventDefault();
  
  Swal.fire({
    title: '삭제하시겠습니까?',
    text: "",
    type: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    confirmButtonColor: '#3085d6',
    cancelButtonText: '취소',
    confirmButtonText: '확인'
  }).then((result) => {

    if (result.value) {
      $.getJSON('../../app/json/faq/delete?no=' + faqNo, 
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
});

$(document.body).bind('loaded-faq-view', () => {
$('.faq-update-btn').click((e) => {
  e.preventDefault();
  window.location.href = 'faq-add.html?no=' + faqNo;
 });
});


