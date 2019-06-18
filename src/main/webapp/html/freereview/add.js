


(function quillEditerInit() {
  var quill = new Quill('#quillEditor', {
 
    modules: {
      
      
      toolbar: [
        ['image', 'code-block','video'],
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
      ],imageResize: {},
      
    },
    placeholder: '내용을 적으세요...',
    theme: 'snow'  // or 'bubble'
  });
  $('.ql-picker').next().remove();
})();





(function loadList() {
 
  
  
  
  
  $.getJSON('../../app/json/reservation/myreservation',
       function (obj) {
    if(obj.status == 'fail'){
      $('#selectOption').html('로그인 해주세요');
    } else if(obj.list.length == 0){
     
     $('#selectOption').html('다녀온 투어가 없습니다');
   }else{
     for (var i = 0; i < obj.list.length; i++) {
       $('#reservation').append($('<option value="' + obj.list[i].no + '">' + obj.list[i].tour.title + '</option>'));
       //alert()
      }
   }
    
   
    $('#reservation').formSelect();
  })
 
})();


$('#add-btn').click(function () {
  

  if (!$('#title').val()) {
    $('#title').focus();
    M.toast({ html: '제목을 적으세요..' })
    return;
  }else if($(".ql-editor").html()=='<p><br></p>'){
    
    $('.ql-editor').focus();
    M.toast({ html: '내용을 적으세요..' })
    return;
    
  }else{
    $('#add-btn').attr('disabled','disabled');
    $.post('../../app/json/freereview/add', {
      
      reservationNo: $('#reservation').val(),
      title: $("#title").val(),
      content: $(".ql-editor").html(),
      score : $('#raty').children().last().val()
    },
    function(data) {
      
      if(data.status == 'success') {
        location.href = "index.html";  
      } else {
        alert('등록 실패 입니다.\n' + data.message);
        location.href = "index.html"; 
      }
    });
    
    }
});

$ ( function ()  { 
  $ ( '#raty' ). raty ({  
    score :  5,
    starOn : '../../images/star-on.png' ,
    starOff : '../../images/star-off.png'
  
  }); 
});

$(document).ready(function() {
  $.get('/bitcamp-fit-tour/app/json/tour/autocomplete',function(obj){
    var autoCompleteData = new Array();
    console.log(obj);
    for (var city of obj.cityList) {
      var auto = {};
      auto['id'] = city.no;
      auto['text'] = city.cityName;
      autoCompleteData.push(auto);
    }
    $('.selectCity').select2({
            
            width: "100%",
            data :  autoCompleteData,
            maximumSelectionLength: 3,
            anguage: "kr"
    });
 

  })
 
  
  
  
  
  
});

var data = [{
  id: 'KOR',
  text: 'Korea'
}, {
  id: 'JPN',
  text: 'Japan'
}];



