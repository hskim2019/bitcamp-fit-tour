var reservationTemplateSrc = $('#reservation-template').html(),
reservationGenerator = Handlebars.compile(reservationTemplateSrc);

var reservationNo;

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

// modal init
$('#reservation-cancel-modal').modal({
});

//collapsible click controll
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

//ready tour list
$.getJSON('../../app/json/reservation/completedreservation',
    function(obj){
  for(reservation of obj.reservations){
    reservation.tour.price = (reservation.personnel * reservation.tour.price).toLocaleString();
    reservation.reciptUrl = reservation.paymentNo.split(',')[1];
    var paymentMethod = getPaymentMethod(reservation.paymentNo.split(',')[2]);
    reservation.paymentMethod = paymentMethod;
    if (reservation.personnel > 1)
    reservation.buyerName = reservation.buyerName + ' 외' + --(reservation.personnel) + '명';
  }
  console.log(obj);
  
  $(reservationGenerator(obj)).appendTo($('#ready-tour-section'));
  
  // add ready tour amount
  $('#ready-tour-amount').html(obj.amount);
  
  //add click event tour title
  $('.tour-title').click(function(){
    location.href = '/bitcamp-fit-tour/html/tour/view.html?no=' + $(this).parent().parent().attr('id'); 
  })
  
  $('#ready-tour-section').children().each(function(){
    console.log($(this).children().first().children().first().text());
    if($(this).children().first().children().first().text() == '예약완료')
    $(this).children().first().children().last().append('<a href="#" class="reservation-cancel-btn">예약 취소</a>')
  })
  
  $('.reservation-cancel-btn').click(function(e){
    e.preventDefault();
    reservationNo = $(this).parent().attr('id');
    $('#reservation-cancel-modal').modal('open');
  });
  
  $('#reservation-cancel-btn').click(function(e){
    e.preventDefault();
    $('#reservation-cancel-modal').modal('close');
    $('#reason').val('');
  });
  
  $('#reservation-comfirm-btn').click(function(e){
    e.preventDefault();
    $.post('../../app/json/reservation/update',{
      no : reservationNo,
      statusNo : 7,
      cancelReason : $('#reason').val()
    },function(obj){
      if(obj.status == 'success'){
        $('#reservation-cancel-modal').modal('close');
        M.toast({ html: '예약 취소 요청이 완료되었습니다.' });
      }
    })

    
  });


  
});

//old tour list
$.getJSON('../../app/json/reservation/oldreservation',
    function(obj){
  for(reservation of obj.reservations){
    reservation.paymentStatus.status = '여행완료';
    reservation.tour.price = (reservation.personnel * reservation.tour.price).toLocaleString();
    reservation.reciptUrl = reservation.paymentNo.split(',')[1];
    var paymentMethod = getPaymentMethod(reservation.paymentNo.split(',')[2]);
    reservation.paymentMethod = paymentMethod;
    reservation.buyerName = reservation.buyerName + ' 외' + reservation.personnel + '명';
  }
  console.log(obj);
  
  $(reservationGenerator(obj)).appendTo($('#old-tour-section'));
  
  // add ready tour amount
  $('#old-tour-amount').html(obj.amount);
  
  //add click event tour title
  $('.tour-title').click(function(){
    location.href = '/bitcamp-fit-tour/html/tour/view.html?no=' + $(this).parent().parent().attr('id'); 
  })
});


//cancel tour list
$.getJSON('../../app/json/reservation/oldreservation',
    function(obj){
  for(reservation of obj.reservations){
    reservation.paymentStatus.status = '여행완료';
    reservation.tour.price = (reservation.personnel * reservation.tour.price).toLocaleString();
    reservation.reciptUrl = reservation.paymentNo.split(',')[1];
    var paymentMethod = getPaymentMethod(reservation.paymentNo.split(',')[2]);
    reservation.paymentMethod = paymentMethod;
    reservation.buyerName = reservation.buyerName + ' 외' + reservation.personnel + '명';
  }
  console.log(obj);
  
  $(reservationGenerator(obj)).appendTo($('#old-tour-section'));
  
  // add ready tour amount
  $('#old-tour-amount').html(obj.amount);
  
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


