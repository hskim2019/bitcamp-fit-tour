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

$('.card').click(function(){
  var cityName = $(this).attr('id');
  location.href = '/bitcamp-fit-tour/html/tour/index.html?city=' + cityName;
});



