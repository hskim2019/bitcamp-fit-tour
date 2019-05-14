var param = location.href.split('?')[1];

if (param) {
  $('h1').html('예약 조회');
  loadData(param.split('=')[1]);
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


$('#add-btn').click(() => {
  $.post('../../app/json/reservation/add', {

    tourNo: $('#tourNo').val(),
    memberNo: $('#name').val(),
    statusNo: $('#statusNo').val(),
    tourDate: $('#tourDate').val(),
    personnel: $('#personnel').val(),
    touristTel: $('#touristTel').val(),
    requirement: $('#requirement').val(),
    paymentNo: $('#paymentNo').val()
   
    
  },
  function(data) {
    
    if(data.status == 'success') {
      location.href = "index.html";  
    } else {
      alert('등록 실패 입니다.\n' + data.message);
    }
  });
});
$('#delete-btn').click (() => {
  $.getJSON('../../app/json/reservation/delete?no=' + param.split('=')[1], 
      function(data) {
    
    if(data.status == 'success') {
      location.href = "index.html";  
    } else {
      alert('삭제 실패 입니다.\n' + data.message);
    }
  });
});

$('#update-btn').click (() => {
  
  $.post('../../app/json/reservation/update?no=' + param.split('=')[1],{
    tourDate: $('#tourDate').val(),
    personnel: $('#personnel').val(),
    touristTel: $('#touristTel').val(),
    requirement: $('#requirement').val()
    
  },
  function(data) {
   
    if(data.status == 'success') {
      location.href = "index.html";  
    } else {
      alert('수정 실패 입니다.\n' + data.message);
    }
  });
});

function loadData(no) {
  $.getJSON('../../app/json/reservation/detail?no=' + param.split('=')[1], 
      function(data) {
    $('#no').val(data.no);
    $('#tourNo').val(data.tourNo);
    $('#name').val(data.member.name);
    $('#status').val(data.paymentStatus.status);
    $('#tourDate').val(data.tourDate);
    $('#personnel').val(data.personnel);
    $('#touristTel').val(data.touristTel);
    $('#requirement').val(data.requirement);
    $('#paymentNo').val(data.paymentNo);
    $('#paymentDate').val(data.paymentDate);
    $('#reservationDate').val(data.reservationDate);
 
    
  });
};







