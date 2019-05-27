$(document).ready(function() {
  $('input[type="text"]').characterCounter();
  $('select').formSelect();
  $('.tabs').tabs({
    swipeable: true,
  });
});

(function quillEditerInit() {
  var quill = new Quill('#quillEditor', {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block'],
      [{color: ['red', 'blue']} ],
    ]
  },
  placeholder: 'Compose an epic...',
  theme: 'snow'  // or 'bubble'
});
  $('.ql-picker').next().remove();
})();


$('#continent').change( function() {
  
  console.log();
  $.getJSON('../../app/json/tour/countrylist?continent='+ $('#continent option:selected').val(), 
    function(obj){
    console.log(obj)
    console.log(obj.countryList.length);
    console.log();
    for(var i = 0; i < obj.countryList.length; i ++){
      $('#country').append(
          $('<option value='+ obj.countryList[0].no +'>' + obj.countryList[0].continentName + '</option>'));
    }
    
  });
});


//$('#tour-add-btn').click( function() {
//  console.log($('#input-title').val());
//  console.log($('#input-subtitle').val());
//  console.log($(".ql-editor").html());
//  console.log($('input[name="transportaion"]:checked').next().html());
//  
//  var theme2 = new Array();
//  
//  $('input[name=theme]:checked').each(function() {
//    console.log($(this).val());
//    console.log($(this).next().html());
//    Theme = new Object();
//    Theme.no = $(this).val()
//    Theme.theme = $(this).next().html();
//    theme2.push(Theme);
//  });
//  console.log(theme2);
//  
//  $.post('../../app/json/tour/add2',
//      JSON.stringify({
//        title : $('#input-title').val(),
//        subHeading : $('#input-subtitle').val(),
//        content : $(".ql-editor").html(),
//        totalHour : 100,
//        personnel : '10',
//        transportation : $('input[name="transportaion"]:checked').val(),
//        cityNo : 1,
//        theme : theme2
//      }), 
//      function(obj) {}
//    );
//});
