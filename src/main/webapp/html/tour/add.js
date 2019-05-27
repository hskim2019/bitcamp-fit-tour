$(document).ready(function() {
  $('input[type="text"]').characterCounter();
  $('select').formSelect();
  $('.tabs').tabs({duration: 800});
  $('.modal').modal();
});

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


$('#tour-add-btn').click( function() {
  console.log($('#input-title').val());
  console.log($('#input-subtitle').val());
  console.log($(".ql-editor").html());
  console.log($('input[name="transportaion"]:checked').next().html());
  console.log($('#city option:selected').val());
  
  var themeArray = new Array();
  
  $('input[name=theme]:checked').each(function() {
    Theme = new Object();
    Theme.no = $(this).val()
    Theme.theme = $(this).next().html();
    themeArray.push(Theme);
  });
  console.log(Theme)
  $.post('../../app/json/tour/add',
      encodeURIComponent(JSON.stringify({
        title : $('#input-title').val(),
        subHeading : $('#input-subtitle').val(),
        content : $(".ql-editor").html(),
        totalHour : 100,
        personnel : 10,
        transportation : $('input[name="transportaion"]:checked').next().html(),
        cityNo : $('#city option:selected').val(),
        theme : themeArray,
        price : 100000
      })),
      function(obj) {
    console.log(obj);
      if(obj.status == 'success'){
        $('#tourConfirm').attr('href','view.html?no='+ obj.tourNo);
        $('#modal-button').trigger('click');
      }
    }
    );
});


