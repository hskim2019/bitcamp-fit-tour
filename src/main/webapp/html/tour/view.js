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

//add personnelOption
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


//get trpansportaionIcon
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


//add click event reservation button
$('#reservation-btn').click((e) => {
  e.preventDefault();
  console.log(tourNo);
  var date = ($('.datepicker').val().replace(/[^0-9]/g,""));
  var personnel = ($('.selected').children().first().html().replace(/[^0-9]/g,""));
  location.href = '/bitcamp-fit-tour/html/reservation/reservation.html?tourNo=' + tourNo + '&date=' + date + '&personnel=' + personnel
});

//load wishlist
(function loadWishlist() {
  $.getJSON('../../app/json/wishlist/count?tourNo=' + tourNo,
      function(obj) {
    console.log(obj);
    if (obj.status == 'notlogin')
      $('#wishlist-btn').addClass('not-login');
    if(obj.status == 'success' && obj.count == 1){
      $('#wishlist-btn').addClass('wishlist-status');
      $('#wishlist-btn').html('<i class="material-icons left">favorite</i>위시리스트에 추가됨</a>');
    }
    $(document.body).trigger('addEventWishlistButton');
  });
})();

// add event wishlist button
$(document.body).bind('addEventWishlistButton', () => {
  $('#wishlist-btn').click((e) => {
    e.preventDefault();
  
    if($(e.target).hasClass('not-login')){
      
      M.toast({ html: '로그인 후 이용 해주세요.' })
    } else if ($(e.target).hasClass('wishlist-status')){
      $.get('../../app/json/wishlist/delete?tourNo=' + tourNo,
          function(obj) {
        console.log(obj);
        $('#wishlist-btn').removeClass('wishlist-status');
        $('#wishlist-btn').html('<i class="material-icons left">favorite_border</i>위시리스트에 담기</a>');
        if (obj.status == 'success') {
          M.toast({ html: '위시리스트에서 삭제 하였습니다.' })
        } else {
          M.toast({ html: '위시리스트에서 삭제 실패 하였습니다.' })
        }
      });
    } else {
      
      $(e.target).html('<i class="material-icons left">favorite</i>위시리스트에 추가됨</a>');
      $(e.target).addClass('wishlist-status');
      $.get('../../app/json/wishlist/add?tourNo=' + tourNo,
          function(obj) {
        if (obj.status == 'success') {
          M.toast({ html: '위시리스트에 추가 하였습니다.' })
        } else {
          M.toast({ html: '위시리스트에 추가 실패 하였습니다.' })
        }
      });
    }
  });
});

//google map
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

