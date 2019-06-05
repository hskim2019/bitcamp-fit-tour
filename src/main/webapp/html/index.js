$(document).ready(function(){
  $('.sidenav').sidenav();
});

var header = $('#main');
var range = 200;

$(window).on('scroll', function () {
  
  var scrollTop = $(this).scrollTop(),
      height = header.outerHeight(),
      offset = height / 1.1,
      calc = 0.7 - (scrollTop - offset + range) / range;
      console.log(calc);
  header.css({ 'opacity': calc });

  if (calc > '0.7') {
    header.css({ 'opacity': 0.7 });
  } else if ( calc < '0' ) {
    header.css({ 'opacity': 0 });
  }
  
});










