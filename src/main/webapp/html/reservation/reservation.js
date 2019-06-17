var param = location.href.split('?')[1],
tourNo = param.split('=')[1].split('&')[0],
tourDate = param.split('=')[2].split('&')[0],
tourYear = (tourDate/10000).toString().split('.')[0],
tourMonth = ((tourDate/100).toString().split('.')[0]/100).toString().split('.')[1],
tourDay = (tourDate/100).toString().split('.')[1],
selectPersonnel = param.split('=')[3];
var IMP = window.IMP; // 생략가능결제
IMP.init('imp12065647'); // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용



if (param) {
  $('h3').html('예약 하기');
  // var date = ($('.datepicker').val().replace(/[^0-9]/g,""));
  // alert(selectPersonnel);
  loadData(tourNo);
  var user = JSON.parse(sessionStorage.getItem('loginUser'))
  $('#email').val(user.email);
  $('#name').val(user.name);
  $('#status').hide();
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



$('#pay').click(() => {

  var payType = $('input[name="payType"]:checked').val();
    
    IMP.request_pay({
      pg : 'html5_inicis',
      pay_method : payType, 
      merchant_uid :'merchant_' + new Date().getTime(),
      name : $("h6").text(), amount : 1000,
    buyer_email : $('#email').val(),
    buyer_name : $('#name').val(),
    buyer_tel : $('#tel').val() 
    
    }, function(rsp) {
      if ( rsp.success ) {
    
        addReservation(rsp)
        $('#payStatus').val('결제완료');;
        $("#payStatus").css("color", "#ff0000");
        $('#status').val('ok');
        $('#end').trigger('click');
        $('#pay').hide();
        var msg = '결제가 완료되었습니다.';
 
      } else {
    var msg = '결제에 실패하였습니다.';
    msg += '에러내용 : ' + rsp.error_msg;
      }

      M.toast({html: msg,displayLength: '10000'})
    });
   
  


    
});


function addReservation(rsp){
  var payType = $('input[name="payType"]:checked').val();
  $.post('../../app/json/reservation/reservation', {
   
      tourNo: tourNo,
      statusNo: 4,
      tourDate: tourYear+'-'+tourMonth+'-'+(++tourDay),
      personnel: selectPersonnel,
      touristTel: $('#tel').val(),
      buyerName: $('#name').val(),
      requirement: $('#requirement').val(),
      paymentNo: rsp.imp_uid+','+rsp.receipt_url+','+payType
      
  },

  function(data) {
    if(data.status == 'success') {
      M.toast({html: '예약 성공 입니다',displayLength: '10000'}) 
      
    } else {
      M.toast({html: '예약 실패 입니다'+
        data.message,displayLength: '10000'})
    
    }
  })

};