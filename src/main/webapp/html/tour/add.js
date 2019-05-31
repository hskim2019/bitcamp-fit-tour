var tlocation;

//ready
$(document).ready(function () {
  $('input[type="text"]').characterCounter();
  $('select').formSelect();
  $('.tabs').tabs({ duration: 800,/*swipeable: false*/ });
  $('.modal').modal({ opacity: 0.3, });

  $('#next-swipe-1').click(function () {
    $('.tabs').tabs('select', 'swipe-1');
  });

  $('.next-swipe-2').click(function () {
    if (!$('#input-title').val())
      return;
    if (!$('#input-subtitle').val())
      return;
    $('.tabs').tabs('select', 'swipe-2');
  });

  $('.next-swipe-3').click(function () {
    $('.tabs').tabs('select', 'swipe-3');
  });

  $('.next-swipe-4').click(function () {
    $('.tabs').tabs('select', 'swipe-4');
  });

  $('.datepicker').datepicker({
    format: 'yyyy년 mm월 dd일',
  });

});




//Initialize QuillEditer 
(function quillEditerInit() {
  var quill = new Quill('#quillEditor', {
    modules: {
      toolbar: [
        ['image', 'code-block'],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']                                         // remove formatting button
      ]
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'  // or 'bubble'
  });
  $('.ql-picker').next().remove();
})();

//Load CountryList
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

//Load CityList
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
$('#fileupload').fileupload({
  url: '../../app/json/tour/add',        // 서버에 요청할 URL
  dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
  sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
  singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
  autoUpload: false,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
  disableImageResize: /Android(?!.*Chrome)|Opera/
    .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
  previewMaxWidth: 150,   // 미리보기 이미지 너비
  previewMaxHeight: 150,  // 미리보기 이미지 높이 
  previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기

  processalways: function (e, data) {
    var imagesDiv = $('#images-div');
    imagesDiv.html("");
    for (var i = 0; i < data.files.length; i++) {
      try {
        if (data.files[i].preview.toDataURL) {
          $('<div class="col card-panel p0 ml20"><img src="' + data.files[i].preview.toDataURL() + '"></div>').appendTo(imagesDiv);
        }
      } catch (err) {
      }
    }
    $('.file-path').css('border-color', '#26a69a');
    var fileNames
    $.each(data.files, function (index, file) {
      if (index == 0) {
        fileNames = file.name;
      } else {
        fileNames = fileNames + ', ' + file.name;
      }
    });
    $('.file-path').val(fileNames);

    $('#upload-btn').off().click(function () {
      console.log('a');
      var themeArray = new Array();
      $('input[name=theme]:checked').each(function () {
        Theme = new Object();
        Theme.no = $(this).val()
        Theme.theme = $(this).next().html();
        themeArray.push(Theme);
      });


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
  done: function (e, data) { }
});


// googlemap
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.503157, lng: 127.024318 },
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
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function () {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("정확한 장소를 입력하세요!");
      return;
    }
    console.log(place.geometry.location.lat);
    console.log(place.geometry.location.lng);

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
    window.tlocation = evt.latLng.lat().toFixed(3) + ',' + evt.latLng.lng().toFixed(3);
    document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
  });

  google.maps.event.addListener(marker, 'dragstart', function (evt) {
    document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
  });
}


