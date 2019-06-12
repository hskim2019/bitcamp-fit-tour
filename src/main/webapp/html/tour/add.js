var tlocation = 0 + ',' + 0;
var fileNames;
// ready
$(document).ready(function () {
  $('input[type="text"]').characterCounter();
  $('select').formSelect();
  $('.tabs').tabs({ duration: 800, /* swipeable: true */});
  $('.modal').modal({ opacity: 0.3, });
  $('.datepicker').datepicker({
    format: 'yyyy년 mm월 dd일',
  });


  $('#next-swipe-1').click(function () {
    $('.tabs').tabs('select', 'swipe-1');
  });// swipe1

  $('.next-swipe-2').click(function () {
    if ($('#continent option:selected').val() == "대륙을 선택하세요.") {
      $('#continent').trigger('click');
      M.toast({ html: '여행 대륙을 선택하세요.' });
      return;
    }

    if ($('#country option:selected').val() == "국가를 선택하세요.") {
      $('#country').focus();
      M.toast({ html: '여행 국가를 선택하세요.' });
      return;
    }

    if ($('#city option:selected').val() == "도시를 선택하세요.") {
      $('#city').focus();
      M.toast({ html: '여행 도시를 선택하세요.' });
      return;
    }

    if (!$('#input-title').val()) {
      $('#input-title').focus();
      M.toast({ html: '여행 제목을 입력하세요.' });
      return;
    }

    if (!$('#input-subtitle').val()) {
      $('#input-subtitle').focus();
      M.toast({ html: '여행 소제목을 입력하세요.' });
      return;
    }

    if (!$('input:checkbox[name=theme]').is(':checked')) {
      M.toast({ html: '여행 테마를 선택하세요.' });
      return;
    }


    $('.tabs').tabs('select', 'swipe-2');

  });// swipe-2

  $('.next-swipe-3').click(function () {

    if (!$('#input-personnel').val()) {
      $('#input-personnel').focus();
      M.toast({ html: '여행 최대인원수를 입력하세요..' });
      return;
    }

    if (!$('#input-price').val()) {
      $('#input-price').focus();
      M.toast({ html: '여행 가격을 입력하세요.' });
      return;
    }

    if (!$('#input-totalHour').val()) {
      $('#input-totalHour').focus();
      M.toast({ html: '여행 총 소요 시간을 입력하세요.' });
      return;
    }

    if (!$('input:radio[name=transportaion]').is(':checked')) {
      M.toast({ html: '이동수단을 선택하세요.' });
      return;
    }

    if (!fileNames) {
      M.toast({ html: '여행 사진을  1개 이상 업로드 하세요.' });
      return;
    }

    $('.tabs').tabs('select', 'swipe-3');

  });

  $('.next-swipe-4').click(function () {

    if ($('.ql-editor').html() == '<p><br></p>') {
      $('.ql-editor').focus();
      M.toast({ html: '여행 소개를 작성하세요.' })
      return;
    }

    $('.tabs').tabs('select', 'swipe-4');
  });


}); // ready


//check noplace
$("#noplace").change(function () {

  if ($("#noplace").is(":checked")) {

    $("#map").css('opacity', '0.4');
    $("#map").css('pointer-events', 'none');
    $('#add-btn').addClass('pulse')
  } else {

    $("#map").css('opacity', '');
    $("#map").css('pointer-events', '');
    if (!tlocation)
      $('#add-btn').removeClass('pulse')
  }
});




// Initialize QuillEditer
(function quillEditerInit() {
  var quill = new Quill('#quillEditor', {
    modules: {
      toolbar: [
        ['image', 'code-block'],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button
                                                          // values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with
                                                          // defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']                                         // remove formatting
                                                          // button
      ],imageResize: {},
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'  // or 'bubble'
  });
  $('.ql-picker').next().remove();
})();

// Load CountryList
$('#continent').change(function () {
  $('#country').empty();
  $('#country').removeAttr('disabled');
  $('#country').append($('<option disabled selected>국가를 선택하세요.</option>'));
  $.getJSON('../../app/json/tour/countrylist?continent=' + $('#continent option:selected').val(),
    function (obj) {
      for (var i = 0; i < obj.countryList.length; i++) {
        $('#country').append($('<option value="' + obj.countryList[i].no + '">' + obj.countryList[i].countryName + '</option>'));
      }
      $('select').formSelect();
    }

  );
});

// Load CityList
$('#country').change(function () {
  $('#city').empty();
  $('#city').removeAttr('disabled');
  $('#city').append($('<option disabled selected>도시를 선택하세요.</option>'));
  $.getJSON('../../app/json/tour/citylist?countryNo=' + $('#country option:selected').val(),
    function (obj) {
      for (var i = 0; i < obj.cityList.length; i++) {
        $('#city').append($('<option value="' + obj.cityList[i].no + '">' + obj.cityList[i].cityName + '</option>'));
      }
      $('select').formSelect();
    }

  );
});

// fileupload
var cnt = 0;

$('#fileupload').click(function() {
  cnt = 0;
});

$('#fileupload').fileupload({
  url: '../../app/json/tour/add',        // 서버에 요청할 URL
  dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
  sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
  singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
  autoUpload: false,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
  disableImageResize: /Android(?!.*Chrome)|Opera/
    .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정
                                                    // 비활성 시키기
  previewMaxWidth: 170,   // 미리보기 이미지 너비
  previewMaxHeight: 150,  // 미리보기 이미지 높이
  previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기

  processalways : function (e, data) {
    cnt++;
    $('.card').remove();
    var acceptFileTypes = /^image\/(gif|jpe?g|png)$/i;
    for(file of data.originalFiles){
      if (file['type'].length && !acceptFileTypes.test(file['type'])){
        if (cnt == data.originalFiles.length){
          $('.file-path').val('');
          M.toast({ html: '여행사진은 gif, png, jpg, jpeg 파일만 업로드 할수 있습니다.' })
        }
        return;
      }
    }
    
    if(data.files.length > 5){
      if (cnt == data.originalFiles.length){
      M.toast({ html: '사진 등록은 최대 5장까지 가능합니다.' })
      $('.file-path').val('');
      }
      return;
    }
    console.log(data);
    var imagesDiv = $('#images-div');
    imagesDiv.html("");
    for (var i = 0; i < data.files.length; i++) {
      try {
        if (data.files[i].preview.toDataURL) {
          if (i == 0) {
            $('<div class="card" ><div class="card-image"><img src="' + data.files[i].preview.toDataURL() + '"><span class="card-title">대표사진</span></div></div>').appendTo(imagesDiv);
          } else {
            $('<div class="card ml30"><div class="card-image"><img src="' + data.files[i].preview.toDataURL() + '"><span class="card-title">&nbsp;' + i + '&nbsp;</span></div></div>').appendTo(imagesDiv);
          }
        }
      } catch (err) { }
    }
    
    $('#fileupload').prev().html('다시 업로드');
    $('.file-path').css('border-color', '#26a69a');
    $.each(data.files, function (index, file) {
      if (index == 0) {
        fileNames = file.name;
      } else {
        fileNames = fileNames + ', ' + file.name;
      }
    });
    $('.file-path').val(fileNames);

    $('#add-btn').off().click(function () {

      var themeArray = new Array();
      $('input[name=theme]:checked').each(function () {
        Theme = new Object();
        Theme.no = $(this).val()
        Theme.theme = $(this).next().html();
        themeArray.push(Theme);
      });
      
      if($("input:checkbox[id='noplace']").is(":checked")){
        tlocation = 0;
      }
      
      data.formData = {
        data: encodeURIComponent(JSON.stringify({
          title: $('#input-title').val(),
          subHeading: $('#input-subtitle').val(),
          content: $(".ql-editor").html(),
          totalHour: $('#input-totalHour').val(),
          personnel: $('#input-personnel').val(),
          transportation: $('input[name="transportaion"]:checked').next().html(),
          cityNo: $('#city option:selected').val(),
          theme: themeArray,
          price: $('#input-price').val(),
          location: tlocation
        }))
      };
      var response = data.submit();
      response.complete(function (result) {
        $('#tourConfirm').attr('href', 'view.html?no=' + result.tourNo);
        $('#modal-button').trigger('click');
      })
    });
  },
  done: function (e, data) {}
});


// googlemap
function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 },
    zoom: 13
  });

  var card = document.getElementById('pac-card');
  var input = document.getElementById('pac-input');

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.bindTo('bounds', map);

  autocomplete.setFields(
    ['address_components', 'geometry', 'icon', 'name']);

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  var marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position : { lat: 0, lng: 0 },
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function () {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      M.toast({ html: '올바른 장소를 다시 입력해주세요.' })
      return;
    }
    tlocation = place.geometry.location.lat() + ',' + place.geometry.location.lng()

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindowContent.children['place-icon'].src = place.icon;
    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-address'].textContent = address;
    infowindow.open(map, marker);
  });


  google.maps.event.addListener(marker, 'dragend', function (evt) {
    window.tlocation = evt.latLng.lat() + ',' + evt.latLng.lng();
    $('#add-btn').addClass('pulse');
     document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
     
  });

  google.maps.event.addListener(marker, 'dragstart', function (evt) {
    
     document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
    
  });
}

