$(document).ready(function(){
  $('.sidenav').sidenav();
});

var header = $('#main');
var range = 500;

$(window).on('scroll', function () {
  
  var scrollTop = $(this).scrollTop(),
      height = header.outerHeight(),
      offset = height / 1.1,
      calc = 0.9 - (scrollTop - offset + range) / range;
      console.log(calc);
  header.css({ 'opacity': calc });

  if (calc > '0.9') {
    header.css({ 'opacity': 0.9 });
  } else if ( calc < '0' ) {
    header.css({ 'opacity': 0 });
  }
  
});


$(document).ready(function(){
  $('.slider').slider({
    indicators: false,
    height: 500,
    transition: 500,
    interval: 5000
  });
});





