$(document).ready(function(){
  //side nav
  $('.sidenav').sidenav();
  
  //scroll
  var header = $('#main');
  var range = 400;
  $(window).on('scroll', function () {
    var scrollTop = $(this).scrollTop(),
    height = header.outerHeight(),
    offset = height / 1.1,
    calc = 1.0 - (scrollTop - offset + range) / range;
    header.css({ 'opacity': calc });
    $('nav').css('border-bottom','none')

    if (calc > '1.0') {
      $('nav').css('border-bottom','rgba(255, 255, 255, 0.25) 1px solid')
      header.css({ 'opacity': 1.0 });
    } else if ( calc < '0' ) {
      header.css({ 'opacity': 0 });
    }
  });
  
  //slider
  $('.slider').slider({
    indicators: false,
    height: 500,
    transition: 500,
    interval: 5000
  });

  //carousel
  $('.carousel').carousel({
    fullWidth : true,
    padding : 100,
    numVisible : 10,
  });

});


//load list
function loadList(pn, continentName, countryName, cityName, minPrice, maxPrice, minHour, maxHour, theme, orderby) {
  $.get('../../app/json/tour/list',
          {
    pageNo : pn,
    pageSize : pageSize,
    continentName : continentName,
    countryName : countryName,
    cityName : cityName,
    minPrice : minPrice,
    maxPrice : maxPrice,
    minHour : minHour,
    maxHour : maxHour,
    theme : theme,
    orderby : orderby
          },

          function(obj) {
            // 서버에 받은 데이터 중에서 페이지 번호를 글로벌 변수에 저장한다.
            pageNo = obj.pageNo;
            //currMaxPrice = obj.currMaxPrice;
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
              var transportation = $(listRow).children().eq(1).children().eq(2).children().eq(3).html();
              var placeToChange = $(listRow).children().eq(1).children().eq(2).children().eq(3).prev().children().eq(0);
              var targetforPhoto = $(listRow).children().eq(0).children().eq(0);
              addTransportaionIcon(placeToChange, transportation);
              $.getJSON('../../app/json/tour/detail?no=' + tourNo + '&pageSize=' + 8,
                      function(data) {
                $(themetrGenerator(data)).appendTo(targetforTheme);
                $(targetforPrice).html(data.tour.price.toLocaleString() + '원');
                $(targetforPhoto).attr('src', '/bitcamp-fit-tour/upload/tourphoto/' + data.tour.tourPhoto[0].name);
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

