var reservationTemplateSrc = $('#reservation-template').html(),
reservationGenerator = Handlebars.compile(reservationTemplateSrc);

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

$('.collapsible-header').click(function(e){
  $('.collapsible-header').removeClass('checked');
  $(this).addClass('checked');
  
  if($(this).hasClass('ready-tour')){
    $('.rightside').hide();
    $('#ready-tour-section').show();
  }
  
  if($(this).hasClass('old-tour')){
    $('.rightside').hide();
    $('#old-tour-section').show();
  }
  
  if($(this).hasClass('canceled-tour')){
    $('.rightside').hide();
    $('#canceled-tour-section').show();
  }
});

$.getJSON('../../app/json/reservation/completedreservation',
    function(obj){
  for(reservation of obj.reservations){
    console.log(reservation.tour.price);
    console.log(reservation.personnel);
    reservation.tour.price = (reservation.personnel * reservation.tour.price).toLocaleString();
  }
  console.log(obj);
  
  $(reservationGenerator(obj)).appendTo($('#ready-tour-section'));
});
