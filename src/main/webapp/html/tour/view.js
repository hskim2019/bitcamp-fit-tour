var param = location.href.split('?')[1],
    tourNo = param.split('=')[1],
	tlocation;

tourList(tourNo);
commentList(tourNo, pageNo, addDeleteCount, 0);

//ready
$(document).ready(function(){
	  $('.datepicker').datepicker({
	    format : 'yyyy년 mm월 dd일',
	  });
	  $('textarea#comment-add').characterCounter();
	  $(".dropdown-trigger").dropdown();
	});

//load tourList
function tourList(tourNo) {

  $.getJSON('../../app/json/tour/detail?no=' + tourNo,
      function(obj) {
    console.log(obj);
    $('#title').html(obj.tour.title);
    $('#subHeading').html(obj.tour.subHeading);
    $('#content').html(obj.tour.content);
    $('#totalHour').html('<i class="fas fa-stopwatch"></i>  ' + obj.tour.totalHour + '시간 소요');
    $('#hashTag').val(obj.tour.hashTag);
    addPersonnelOption(obj.tour.personnel, obj.tour.price);
    $('#transportation').html(getTransportaionIcon(obj.tour.transportation) + obj.tour.transportation + '이동');
    $('#price').html('<i class="fas fa-won-sign"></i> ' + obj.tour.price.toLocaleString() + '원');
    $('#photo').attr('src', '/bitcamp-fit-tour/upload/tourphoto/' + obj.tour.tourPhoto[0].name +'.jpg');
    $('#firstcrumb').html(obj.tour.country.continentName);
    $('#secondcrumb').html(obj.tour.country.countryName);
    $('#thirdcrumb').html(obj.tour.city.cityName);
    tlocation = obj.tour.location;
    initMap(tlocation);
    
    for(var i = 0; i < obj.tour.theme.length; i++){
      $('#themeDiv').append($('<div class="chip ml0 mr5">' + obj.tour.theme[i].theme + '</div>'));
    }
    
    for(var i = 0; i < obj.tour.tourPhoto.length; i++){
      $('#image').append($('<li><img class="img-thumbnail materialboxed" src="../../upload/tourphoto/'+obj.tour.tourPhoto[i].name+'"></li>'));
    }
    $('.slider').slider({
      duration : 1000,
      interval : 3000,
      height : 440
    });
    $('.materialboxed').materialbox();
  });
}

// add personnelOption
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


// add trpansportaionIcon
function getTransportaionIcon(transportation) {
  
  switch (transportation) {
    case '버스' :
      return '<i id="transportation-icon" class="fas fa-bus-alt"></i>  '
      break;
    case '지하철' :
      return '<i id="transportation-icon" class="fas fa-subway"></i>  '
      break;
    case '도보' :
      return '<i id="transportation-icon" class="fas fa-walking"></i>  '
      break;
    case '자전거' :
      return '<i id="transportation-icon" class="fas fa-bicycle"></i>  '
      break;
  }
}


// add click event reservation button
$('#reservation-btn').click((e) => {
  e.preventDefault();
  console.log(tourNo);
  var date = ($('.datepicker').val().replace(/[^0-9]/g,""));
  var personnel = ($('.selected').children().first().html().replace(/[^0-9]/g,""));
  location.href = '/bitcamp-fit-tour/html/reservation/reservation.html?tourNo=' + tourNo + '&date=' + date + '&personnel=' + personnel
});

// google map
function initMap(tlocation) {
	  var latLag = {lat : (Number)(tlocation.split(',')[0]), lng : (Number)(tlocation.split(',')[1])};
	  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: latLag,
    disableDefaultUI: true
  });
  
  var marker = new google.maps.Marker({
      position: latLag,
      animation: google.maps.Animation.DROP,
      map: map,
      title: '여기서 만나요!'
    });
}

