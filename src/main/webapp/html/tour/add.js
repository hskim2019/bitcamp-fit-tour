$(document).ready(function() {
  $('#fullpage').fullpage({
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    autoScrolling: false,
    navigationPosition: 'right',
    scrollHorizontally: false,
    loopHorizontal: false,
  });
});

$(document).ready(function() {
  $('input[type="text"]').characterCounter();
  $('select').formSelect();
});

$(document).ready(function(){
  $('.tabs').tabs();
});


