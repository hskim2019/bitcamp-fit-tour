var param = location.href.split('?')[1],
tourNo = param.split('=')[1].split('&')[0],
tourDate = param.split('=')[2].split('&')[0],
tourYear = (tourDate/10000).toString().split('.')[0],
tourMonth = ((tourDate/100).toString().split('.')[0]/100).toString().split('.')[1],
tourDay = (tourDate/100).toString().split('.')[1],
selectPersonnel = param.split('=')[3];



if (param) {
  $('h3').html('예약 하기');
  // var date = ($('.datepicker').val().replace(/[^0-9]/g,""));
  // alert(selectPersonnel);
  loadData(tourNo);
  
  $('#tourNo').attr('readonly','');
  $('#name').attr('readonly','');
  $('#paymentNo').attr('readonly','');
  var el = $('.bit-new-item');
  for (e of el) {
    e.style.display = 'none';
  }
} else {
  $('h1').html('새 예약');
  
  var el = $('.bit-view-item');
  for (e of el) {
    e.style.display = 'none';
  }
}


// /달력
$(document).ready(function(){
$('.datepicker').datepicker({
   format : 'yyyy년 mm월 dd일',
     defaultDate: new Date(tourYear, tourMonth-1, tourDay), // 월에 자동으로 +1이 들어가서
                                                            // -해줘야한다;
     setDefaultDate: true
});
});

$("#selectPersonnel").mouseenter(function(){
  fnMove();
});

function fnMove(){
var offset = $("#price").offset();
var winH = $(window).height();
$('html, body').animate({scrollTop : (offset.top - winH/2)}, 200);
}
function addPersonnelOption(personnel, price) {// 인원
  for(var i=1; i <= personnel; i++){
   
    $('<option value="'+ i +'">' + i +'명</option>').appendTo($('#personnel'));
  
  }
 $('select').find('option[value='+ selectPersonnel +']').prop('selected', true);
  $('#personnel').change((e)=> {
    $('#price').html((price * $(e.target).val()).toLocaleString() +'원');
    $('#perPrice').html('/' + $(e.target).val() + '인')
  });
 
  $('select').formSelect();
}


function loadData(no) {
 
  
  $.getJSON('../../app/json/tour/detail?no=' + tourNo,
          function(obj) {
        $('h6').html(obj.tour.title);
        addPersonnelOption(obj.tour.personnel, obj.tour.price);
       
        $('#price').html(obj.tour.price * selectPersonnel +'원');
        $('#perPrice').html('/' + selectPersonnel + '인')

        
        
      });
};

var stepper = document.querySelector('.stepper');
var stepperInstace = new MStepper(stepper, {
   firstActive: 0,
   linearStepsNavigation: false,
   autoFocusInput: false,
   showFeedbackPreloader: true,
   autoFormCreation: true,
   stepTitleNavigation: true,
   feedbackPreloader: '<div class="spinner-layer spinner-blue-only">...</div>'
});
function someFunction(destroyFeedback) {
  setTimeout(() => {
     destroyFeedback(true);
  }, 1000);
}

var IMP = window.IMP; // 생략가능
IMP.init('imp12065647'); // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용


$('#pay').click(() => {

 email = window.localStorage.mail;
  $.getJSON('../../app/json/reservation/nameGet?email='+email, 
          function(data) {
    
    M.toast({html: data.name,displayLength: '10000'})
    M.toast({html: data.no,displayLength: '10000'})
    M.toast({html: data.email,displayLength: '10000'})
    
    
    IMP.request_pay({
      pg : 'html5_inicis',
      pay_method : 'card', 
      merchant_uid :'merchant_' + new Date().getTime(),
      name : $("h6").text(), amount : 1000,
    buyer_email : data.email,
    buyer_name : data.name,
    buyer_tel : $('#tel').val() 
    
    }, function(rsp) {
      if ( rsp.success ) {
    
        addReservation(rsp,data.no)
        
        var msg = '결제가 완료되었습니다.';
 
      } else {
    var msg = '결제에 실패하였습니다.';
    msg += '에러내용 : ' + rsp.error_msg;
      }

      M.toast({html: msg,displayLength: '10000'})
    });
  
  });
  

    
});


function addReservation(rsp,no){
  $.post('../../app/json/reservation/add', {
      
      tourNo: tourNo,
      memberNo: no,
      statusNo: 4,
      tourDate: tourYear+'-'+tourMonth+'-'+tourDay,
      personnel: selectPersonnel,
      touristTel: $('#tel').val(),
      requirement: $('#requirement').val(),
      paymentNo: rsp.imp_uid
  },
 
  function(data) {
    
    if(data.status == 'success') {
      M.toast({html: '예약 성공 입니다',displayLength: '10000'}) 
    } else {
      M.toast({html: '예약 실패 입니다',displayLength: '10000'})
    
    }
  })

};