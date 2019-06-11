var wishTemplateSrc = $('#wish-template').html(),
  wishGenerator = Handlebars.compile(wishTemplateSrc);

//load user
$(document.body).bind('loadHeader', () => {
  if (!sessionStorage.getItem('loginUser')) {
    console.log('a')
    alert('로그인 후 이용 가능합니다.')
    location.href = '/bitcamp-fit-tour/html/auth/login.html'
  }

  if (sessionStorage.getItem('loginUser')) {
    var user = JSON.parse(sessionStorage.getItem('loginUser'))
  }
});

//load cityname tab
$.get('../../app/json/wishlist/findcityname',
  function(obj) {
    var count = 0;
    for (cityname of obj.citynames) {
      $('.tabs').append('<li class="tab"><a href="#tab' + count + '">' + cityname.city_name + '</a></li>');
      $('.tab-row').append('<div id="tab' + count + '" class="col s12"><div class="row"></div></div>');
      count++;
    }
    $('.tabs').tabs();
    $(document.body).trigger('addEventAndLoadTab');
  });

$(document.body).bind('addEventAndLoadTab', () => {
  //first tab load
  $($('.tab')[0]).addClass('first-tab');
  $.getJSON('../../app/json/wishlist/list?cityName=' + $($('.tab')[0]).children().html(),
    function (obj) {
      for (tour of obj.tours) {
        tour.tourPhoto = tour.tourPhoto[0].name;
        tour.price = tour.price.toLocaleString();
      }
      $(wishGenerator(obj)).appendTo($('#tab0').children());
      
      //add transportationsIcon
      var transportations = $('.transportation');
      for(transportation of transportations){
        $(transportation).html(getTransportaionIcon($(transportation).html()) + $(transportation).html() + '이동');
      }
      
      //add click event card
      $('.card').click(function(e){
        location.href = '/bitcamp-fit-tour/html/tour/view.html?no=' + $(this).attr('id'); 
      })
      
    });
  // not first tab add click event
  $('.tab').not('.first-tab').click(function(e) {
    $.getJSON('../../app/json/wishlist/list?cityName=' + $(e.target).html(),
      function (obj) {
        for (tour of obj.tours) {
          tour.tourPhoto = tour.tourPhoto[0].name;
          tour.price = tour.price.toLocaleString();
        }
        console.log(obj);
        tabClass = $(e.target).attr('href').split('#')[1];
        $(wishGenerator(obj)).appendTo($('#' + tabClass).children());
        
        //add transportationsIcon
        var transportations = $('#' + tabClass).find('.transportation');
        for(transportation of transportations){
          $(transportation).html(getTransportaionIcon($(transportation).html()) + $(transportation).html() + '이동');
        }
        
        $('#' + tabClass).find('.card').click(function(e){
          location.href = '/bitcamp-fit-tour/html/tour/view.html?no=' + $(this).attr('id'); 
        })
        
      });
    //click event off
    $(this).off();
  });
});


//get trpansportaionIcon
function getTransportaionIcon(transportation) {

  switch (transportation) {
  case '버스' :
    return '<i id="transportation-icon" class="fas fa-bus-alt"></i>  '
    break;
  case '지하철' :
    return '<i id="transportation-icon" class="fas fa-subway"></i>  '
    break;
  case '도보' :
    return '<i id="transportation-icon" class="fas fa-walking"></i>  '
    break;
  case '자전거' :
    return '<i id="transportation-icon" class="fas fa-bicycle"></i>  '
    break;
  }
}

