$(document).ready(function() {
  $('input[type="text"]').characterCounter();
  $('select').formSelect();
  $('.tabs').tabs({duration: 800,
    /*swipeable: false*/});
  $('.modal').modal();
});

document.addEventListener("mouseup", function(event) {
}, false);

// Initialize QuillEditer 
(function quillEditerInit() {
  var quill = new Quill('#quillEditor', {
  modules: {
    toolbar: [
      ['image', 'code-block'],
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
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

// Load CountryList
$('#continent').change( function() {
  $('#country').empty();
  $('#country').removeAttr('disabled');
  $.getJSON('../../app/json/tour/countrylist?continent='+ $('#continent option:selected').val(), 
    function(obj){
      for(var i = 0; i < obj.countryList.length; i++){
        $('#country').append($('<option value="'+ obj.countryList[i].no +'">' + obj.countryList[i].countryName + '</option>'));
        }
      $('select').formSelect();
    }
    
  );
});

// Load CityList
$('#country').change( function() {
  $('#city').empty();
  $('#city').removeAttr('disabled');
  $.getJSON('../../app/json/tour/citylist?countryNo='+ $('#country option:selected').val(), 
    function(obj){
      for(var i = 0; i < obj.cityList.length; i++){
        $('#city').append($('<option value="'+ obj.cityList[i].no +'">' + obj.cityList[i].cityName + '</option>'));
        }
      $('select').formSelect();
    }
    
  );
});


//$('#tour-add-btn').click( function() {
//  
//  var themeArray = new Array();
//  $('input[name=theme]:checked').each(function() {
//    Theme = new Object();
//    Theme.no = $(this).val()
//    Theme.theme = $(this).next().html();
//    themeArray.push(Theme);
//  });
//  $.post('../../app/json/tour/add',
//      encodeURIComponent(JSON.stringify({
//        title : $('#input-title').val(),
//        subHeading : $('#input-subtitle').val(),
//        content : $(".ql-editor").html(),
//        totalHour : 100,
//        personnel : 10,
//        transportation : $('input[name="transportaion"]:checked').next().html(),
//        cityNo : $('#city option:selected').val(),
//        theme : themeArray,
//        price : 100000
//      })),
//      function(obj) {
//    console.log(obj);
//      if(obj.status == 'success'){
//        $('#tourConfirm').attr('href','view.html?no='+ obj.tourNo);
//        $('#modal-button').trigger('click');
//      }
//    }
//    );
//});


$('#fileupload').fileupload({
  url: '../../app/json/tour/add',        // 서버에 요청할 URL
  dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
  sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
  singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.   
  add: function (e, data) {
    console.log('add()...');
    $.each(data.files, function (index, file) {
        console.log('Added file: ' + file.name);
    });
    $('#upload-btn').off().click(function() {
      console.log('a');
          var themeArray = new Array();
          $('input[name=theme]:checked').each(function() {
            Theme = new Object();
            Theme.no = $(this).val()
            Theme.theme = $(this).next().html();
            themeArray.push(Theme);
          });
        // data 객체의 formData 프로퍼티에 일반 파라미터 값을 설정한다.
        data.formData = { data: encodeURIComponent(JSON.stringify({
          title : $('#input-title').val(),
          subHeading : $('#input-subtitle').val(),
          content : $(".ql-editor").html(),
          totalHour : 100,
          personnel : 10,
          transportation : $('input[name="transportaion"]:checked').next().html(),
          cityNo : $('#city option:selected').val(),
          theme : themeArray,
          price : 100000
        }))};
        var response = data.submit();
        response.complete(function (result){
          $('#tourConfirm').attr('href','view.html?no='+ result.tourNo);
          $('#modal-button').trigger('click');
        })
    });
  }, 
  done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
    
//    console.log('done()...');
//    console.log(data.result);
//    $('<p/>').text("name : " + data.result.name).appendTo(document.body);
//    $('<p/>').text("age : " + data.result.age).appendTo(document.body);
//    $.each(data.result.files, function(index, file) {
//      $('<p/>').text(file.filename + " : " + file.filesize).appendTo(document.body);
//    });
  }
}); 


