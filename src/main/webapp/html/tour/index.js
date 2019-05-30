var pageNo = 1,
    pageSize = 3,
    prevPageLi = $('#prevPage'),
    nextPageLi = $('#nextPage'),
    currSpan = $('#currPage > span'),
    crumb = $('#breadcrumb-list'),
    templateSrc = $('#tr-template').html(),
    themetemplateSrc = $('#tr-template-for-theme').html();
// script 태그에서 템플릿 데이터를 꺼낸다.

var continentName = '';
var countryName = '';
var cityName= '';
var firstcrumb = crumb.children().eq(0),
    secondcrumb = crumb.children().eq(1),
    thirdcrumb = crumb.children().eq(2);
var temp;
var minPrice = 0;
var maxPrice = 0;
var currMaxPrice;
var prevPageBtn = $('#prevPageBtn'),
    nextPageBtn = $('#nextPageBtn'),
    firstPage = $('#firstPage');
var totalpage;

//Handlebars를 통해 템플릿 데이터를 가지고 최종 결과를 생성할 함수를 준비한다.
var trGenerator = Handlebars.compile(templateSrc),
themetrGenerator = Handlebars.compile(themetemplateSrc);

// JSON 형식의 데이터 목록 가져오기
function loadList(pn, continentName, countryName, cityName, minPrice, maxPrice) {
  $.getJSON('../../app/json/tour/list?pageNo=' + pn + '&pageSize=' + pageSize + '&continentName=' + continentName + '&countryName=' + countryName + '&cityName=' + cityName + '&minPrice=' + minPrice + '&maxPrice=' + maxPrice, 
    function(obj) {
      // 서버에 받은 데이터 중에서 페이지 번호를 글로벌 변수에 저장한다.
      pageNo = obj.pageNo;
      currMaxPrice = obj.currMaxPrice;
      // TR 태그를 생성하여 테이블 데이터를 갱신한다.
      // 이전에 출력한 내용을 제거한다.
      $('#tourlistcard').html('');
      // 템플릿 엔진을 실행하여 tr 태그 목록을 생성한다. 그리고 바로 ()안에 붙인다.
      $(trGenerator(obj)).appendTo($('#tourlistcard'));
      
      for(listRow of $('.listRow')) {
        $.ajaxSetup({async:false});
        var tourNo = $(listRow).attr('id');
        var targetforTheme = $(listRow).children().eq(1).children().eq(3).children().eq(0);
        var targetforPrice = $(listRow).children().eq(1).children().eq(3).children().eq(1);
        $.getJSON('../../app/json/tour/detail?no=' + tourNo + '&pageSize=' + 8,
            function(data) {
          $(themetrGenerator(data)).appendTo(targetforTheme);
          $(targetforPrice).html(data.tour.price.toLocaleString() + '원');
        });
        $.ajaxSetup({async:true});
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
      $('.bit-view-link').click((e) => {
        e.preventDefault();
        window.location.href = 'view.html?no=' + 
          $(e.target).attr('data-no');
      });
   

    }); // Bitcamp.getJSON()
  
} // loadList()

//테이블 목록 가져오기를 완료했으면 제목 a 태그에 클릭 리스너를 등록한다. 
//$(document.body).bind('loaded-list', () => {
//  // 제목을 클릭했을 때 view.html로 전환시키기
//  $('.bit-view-link').click((e) => {
//    e.preventDefault();
//    window.location.href = 'view.html?no=' + 
//      $(e.target).attr('data-no');
//  });
//});


$('#prevPage > a').click((e) => {
  e.preventDefault();
  loadList(pageNo - 1, continentName, countryName, cityName, minPrice, maxPrice);
});

$('#nextPage > a').click((e) => {
  e.preventDefault();
  loadList(pageNo + 1, continentName, countryName, cityName, minPrice, maxPrice);
});


//페이지를 출력한 후 1페이지 목록을 로딩한다.
loadList(1, continentName, countryName, cityName, minPrice, maxPrice);
  
// price slider-range
$(function() {
  $( "#slider-range" ).slider({
    range: true,
    min: 0,
    max: currMaxPrice,
    values: [ 0, 0 ],
    slide: function( event, ui ) {
      $( "#amount" ).val(ui.values[ 0 ].toLocaleString() + "원" + " - " + ui.values[ 1 ].toLocaleString() + "원" );
      minPrice = ui.values[ 0 ];
      maxPrice = ui.values[ 1 ];
    }
  });
  $( "#amount" ).val( $( "#slider-range" ).slider( "values", 0 ).toLocaleString() + "원" +
      " -" + $( "#slider-range" ).slider( "values", 1 ).toLocaleString() + "원");
});


// Dropdowns.
(function() {
    $('#nav > ul').dropotron({
      mode: 'fade',
      noOpenerFade: true,
      speed: 300,
      alignment: 'center'
    });
})();

//follow quick menu
$(window).scroll(function(){
var scrollTop = $(document).scrollTop();
if (scrollTop < 220) {
 scrollTop = 220;
}
$("#followquick").stop();
$("#followquick").animate( { "top" : scrollTop });
});

// BreadCrumb
function showBreadCrumb(continentName, countryName, cityName) {

  firstcrumb.removeClass('bit-invisible');
    firstcrumb.html(continentName);
    secondcrumb.removeClass('bit-invisible');
    secondcrumb.html(countryName);
    temp = thirdcrumb.detach();
    if(cityName != '') {
      secondcrumb.after(temp);
      thirdcrumb.removeClass('bit-invisible');
      thirdcrumb.html(cityName);
    }
};

// floating menu - search with options
$('#searchwithOptions').click((e) => {
  e.preventDefault();
  //console.log(continentName, countryName, cityName, minPrice, maxPrice);
  loadList(1, continentName, countryName, cityName, minPrice, maxPrice);
});


  $('.continent-list-btn').click((e) => {
    e.preventDefault();
    continentName = $(e.target).html();
    countryName = '';
    cityName = '';
    showBreadCrumb(continentName, '', '');
    loadList(1, continentName, '', '', minPrice, maxPrice);
    pagination(1, continentName, '', '', minPrice, maxPrice);
  });

  $('.country-list-btn').click((e) => {
    e.preventDefault();
    continentName = $(e.target).attr('id');
    countryName = $(e.target).html();
    cityName = '';
    showBreadCrumb(continentName, countryName, '');
    loadList(1, '', countryName, '', minPrice, 0);
  });

  $('.city-list-btn').click((e) => {
    e.preventDefault();
    cityName = $(e.target).html();
    continentName = $(e.target).attr('id').split(',')[0];
    countryName = $(e.target).attr('id').split(',')[1];
    showBreadCrumb(continentName, countryName, cityName);
    loadList(1, '', '', cityName, minPrice, 0);
  });

  $('#secondcrumb').click((e) => {
    e.preventDefault();
    cityName = '';
    showBreadCrumb(continentName, countryName, cityName);
    loadList(1, '', countryName, '', minPrice, 0);
  });
  
  $('#firstcrumb').click((e) => {
    e.preventDefault();
    cityName = '';
    countryName = '';
    showBreadCrumb(continentName, countryName, cityName);
    loadList(1, continentName, '', '', minPrice, 0);
  });







