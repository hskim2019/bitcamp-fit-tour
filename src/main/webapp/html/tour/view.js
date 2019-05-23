var param = location.href.split('?')[1],
    tourNo = param.split('=')[1];
    
tourList(tourNo);
commentList(tourNo, pageNo, addDeleteCount, 0);

//TourList
function tourList(tourNo) {

  $.getJSON('../../app/json/tour/detail?no=' + tourNo,
      function(obj) {
    $('#title').html(obj.tour.title);
    $('#subHeading').html(obj.tour.subHeading);
    $('#content').html(obj.tour.content);
    $('#totalHour').html(obj.tour.totalHour + '시간 소요');
    $('#hashTag').val(obj.tour.hashTag);
    addPersonnelOption(obj.tour.personnel, obj.tour.price);
    $('#transportation').html(obj.tour.transportation + ' 이동');
    addTransportaionIcon(obj.tour.transportation);
    $('#price').html(obj.tour.price.toLocaleString() + '원');
    $('#photo').attr('src', '/bitcamp-fit-tour/upload/tourphoto/' + obj.tour.tourPhoto[0].name +'.jpg');
    //$('#photpath').val(obj.tour.tourPhoto[0].path);
    $('#theme').val(obj.tour.theme[0].theme);
    
  });
}

// Add PersonnelOption
function addPersonnelOption(personnel, price) {
  for(var i=1; i <= personnel; i++){
    $('<option value="'+ i +'">' + i +'명</option>').appendTo($('#personnel'));
  }
  $('#personnel').change((e)=> {
    $('#price').html((price * $(e.target).val()).toLocaleString() +'원');
    $('#perPrice').html('/' + $(e.target).val() + '인')
  });
  $('select').formSelect();
}


// Add TrpansportaionIcon
function addTransportaionIcon(transportation) {
  var transportaionIconTag = $('#transportation-icon');
  
  switch (transportation) {
    case '버스' :
      transportaionIconTag.addClass('fas fa-bus-alt')
      break;
    case '지하철' :
      transportaionIconTag.addClass('fas fa-subway')
      break;
    case '도보' :
      transportaionIconTag.addClass('fas fa-walking')
      break;
    case '자전거' :
      transportaionIconTag.addClass('fas fa-bicycle')
      break;
  }
}


$(document).ready(function(){
  $('.datepicker').datepicker({
    format : 'yyyy년 mm월 dd일',
  });
});

$(document).ready(function() {
  $('textarea#comment-add').characterCounter();
  $(".dropdown-trigger").dropdown();
});

$(document).ready(function(){
  $('.slider').slider();
});

$(document).ready(function(){
  $('.materialboxed').materialbox();
});
