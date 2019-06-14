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
    reservation.tour.price = (reservation.personnel * reservation.tour.price).toLocaleString();
    reservation.reciptUrl = reservation.paymentNo.split(',')[1];
    var paymentMethod = getPaymentMethod(reservation.paymentNo.split(',')[2]);
    reservation.paymentMethod = paymentMethod;
    reservation.buyerName = reservation.buyerName + '외' + reservation.personnel + '명';
  }
  console.log(obj);
  
  $(reservationGenerator(obj)).appendTo($('#ready-tour-section'));
  
  // add ready tour amount
  $('#ready-tour-amount').html(obj.amount);
  
  //add click event tour title
  $('.tour-title').click(function(){
    location.href = '/bitcamp-fit-tour/html/tour/view.html?no=' + $(this).parent().parent().attr('id'); 
  })
  
});


//get get payment method to korean
function getPaymentMethod(paymentMethod) {

  switch (paymentMethod) {
  case 'vbank' :
    return '가상계좌'
    break;
  case 'card' :
    return '신용카드'
    break;
  case 'trans' :
    return '실시간 계좌이체'
    break;
  case 'phone' :
    return '휴대폰소액결제'
    break;
  }
}


