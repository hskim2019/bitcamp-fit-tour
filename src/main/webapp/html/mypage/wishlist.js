var wishTemplateSrc = $('#wish-template').html(),
    wishGenerator = Handlebars.compile(wishTemplateSrc);

//load user
$(document.body).bind('loadHeader', () => {
  if(!sessionStorage.getItem('loginUser')){
    console.log('a')
    alert('로그인 후 이용 가능합니다.')
    location.href = '/bitcamp-fit-tour/html/auth/login.html'
  }

  if(sessionStorage.getItem('loginUser')){
    var user = JSON.parse(sessionStorage.getItem('loginUser'))
  }
});

//load cityname tab
$.get('../../app/json/wishlist/findcityname',
    function(obj){
  var count = 0;
  for(cityname of obj.citynames){
    $('.tabs').append('<li class="tab"><a href="#tab' + count + '">' + cityname.city_name + '</a></li>');
    $('.tab-row').append('<div id="tab' + count + '" class="col s12"></div>');
    count ++;
  }
  $('.tabs').tabs();
  $(document.body).trigger('addEventTab');
});

$(document.body).bind('addEventTab', () => {
  
  $('.tab').click(function(e) {
    $.getJSON('../../app/json/wishlist/list?cityName=' + $(e.target).html(),
        function(obj){
      console.log(obj);
      console.log($(e.target).attr('href').split('#')[1]);
      tabClass = $(e.target).attr('href').split('#')[1];
      $(wishGenerator(obj)).appendTo($('#' + tabClass));
    });
  });
});

