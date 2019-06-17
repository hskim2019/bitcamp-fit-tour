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
  $('.slider').slider({
    indicators: false,
    height: 500,
    transition: 500,
    interval: 5000
  });

  //carousel
  $('#popular-tour').carousel({
    fullWidth : true,
    padding : 100,
    numVisible : 10,
  });

});

$('.popular-card').click(function(){
  var cityName = $(this).attr('id');
  location.href = '/bitcamp-fit-tour/html/tour/index.html?city=' + cityName;
});

$.get('../app/json/tour/latelylist',
        function (obj){
  console.log(obj);
  for (tour of obj.tours) {
    tour.tourPhoto = tour.tourPhoto[0].name;
    tour.price = tour.price.toLocaleString();
  }
  $(latetlyProductGenerator(obj)).appendTo($('#lately-tour'));
  
  var transportations = $('.transportation');
  for(transportation of transportations){
    $(transportation).html(getTransportaionIcon($(transportation).html()) + $(transportation).html() + '이동');
  }
  
  $('#lately-tour').carousel({
    fullWidth : true,
    padding : 100,
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