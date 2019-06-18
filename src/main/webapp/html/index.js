var latetlyProductTemplateSrc = $('#latley-product-template').html(),
    latetlyProductGenerator = Handlebars.compile(latetlyProductTemplateSrc);
    
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
  var slider = $('.slider').slider({
    indicators: false,
    height: 500,
    transition: 500,
    interval: 5000
  });
  
  slider[0].onchange = function(){
    console.log('a')
  }
  console.log(slider);
  
  $('li').attrchange({
    trackValues: true,
    callback: function(e) {
      if(e.newValue == 'opacity: 1;' || e.newValue == 'active'){
        $(e.target).children().css('-webkit-transform', 'scale(1.2)');
      }
      if(e.newValue == 'opacity: 0;' || e.newValue == ''){
        $(e.target).children().css('-webkit-transform', 'scale(1.0)');
      }
    }
  });
  
  
  // slick
  $('#popular-tour').slick({
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5
  });
});

// add click evnet popular tour
$('.popular-card').click(function(){
  var cityName = $(this).find('span').html();
  location.href = '/bitcamp-fit-tour/html/tour/index.html?city=' + cityName;
});


// list lateltly tour
$.get('../app/json/tour/latelylist',
        function (obj){
  console.log(obj);
  
  // add representation photo and add price , 
  for (tour of obj.tours) {
    tour.tourPhoto = tour.tourPhoto[0].name;
    tour.price = tour.price.toLocaleString();
  }
  
  // append lately tour product
  $(latetlyProductGenerator(obj)).appendTo($('#lately-tour'));
  
  //load slick
  $('#lately-tour').slick({
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
  });
  
  // add transportation icon
  var transportations = $('.transportation');
  for(transportation of transportations){
    $(transportation).html(getTransportaionIcon($(transportation).html()) + $(transportation).html() + '이동');
  }
  
  // init wish
  $.get('../app//json/wishlist/wish',
          function (obj){
    if(obj.status == 'notlogin'){
      return;
    }
    $('.wish').each(function(){
      for(var wishlist of obj.wishlist){
        if(wishlist.tour_id == $(this).parent().parent().attr('no'))
          $(this).html('<i class="material-icons wish-status">favorite</i>');
      }
    });
  });
  
  //add click event recently tour card
  $('.lately-card').click(function(e){
    if($(e.target).hasClass('material-icons')) {
      
      if (!sessionStorage.getItem('loginUser')) {
        location.href = '/bitcamp-fit-tour/html/auth/login.html'
        return;
      }
      
      if($(e.target).hasClass('wish-status')){
        $.get('../app/json/wishlist/delete?tourNo=' + $(e.target).parents('.card').attr('no'),
            function(obj) {
          if (obj.status == 'success') {
            $(e.target).parent().html('<i class="material-icons">favorite_border</i>');
            M.toast({ html: '위시리스트에서 삭제 하였습니다.' })
          } else {
            M.toast({ html: '위시리스트에서 삭제 실패 하였습니다.' })
          }
        });
      } else {
        $.get('../app/json/wishlist/add?tourNo=' + $(e.target).parents('.card').attr('no'),
            function(obj) {
          if (obj.status == 'success') {
            $(e.target).parent().html('<i class="material-icons wish-status">favorite</i>');
            M.toast({ html: '위시리스트에 추가 하였습니다.' })
          } else {
            M.toast({ html: '위시리스트에 추가 실패 하였습니다.' })
          }
        });
      }
      return;
    }
    location.href = '/bitcamp-fit-tour/html/tour/view.html?no=' + $(this).attr('no'); 
  })
  
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
