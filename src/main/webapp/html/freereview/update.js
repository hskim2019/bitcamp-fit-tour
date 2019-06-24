var param = location.href.split('?')[1],
    reviewNo = param.split('=')[1];
var cityArray=[];

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
  
  
  
  
  $.getJSON('../../app/json/freereview/detail?no=' + reviewNo, 
          function(data) {
   
        for (var city of data.city) {
          cityArray.push(city.city_id)
        }
        $('#title').val(data.freeReview.title);
        $('.ql-editor').html(data.freeReview.content);
        
        ratyInit(data.freeReview.score)
        $.get('/bitcamp-fit-tour/app/json/tour/autocomplete',function(obj){
    var autoCompleteData = new Array();
    for (var city of obj.cityList) {
      var auto = {};
      auto['id'] = city.no;
      auto['text'] = city.cityName;
     
      if(city.no==cityArray[0]){
        auto['selected'] = true;
      }
      if(city.no==cityArray[1]){
        auto['selected'] = true;
      }
      if(city.no==cityArray[2]){
        auto['selected'] = true;
      }
      autoCompleteData.push(auto);
    }
    $('.selectCity').select2({
            
            width: "100%",
            data :  autoCompleteData,
            maximumSelectionLength: 3,
            language: "ko",
            placeholder: '도시를 선택하세요(최대 3개)'
    });
  });
        
        
        
        $.getJSON('../../app/json/reservation/myreservation',
          function (obj) {
       if(obj.status == 'fail'){
         $('#selectOption').html('로그인 해주세요');
       } else if(obj.list.length == 0){
        $('#reservation').append($('<option value="' + 0 + '" selected">' + '다녀온 투어가 없습니다.' + '</option>'));
      }else{
        if(data.freeReview.reservationNo==0){
        $('#reservation').append($('<option value="' + 0 + '" selected">' + '자유 후기' + '</option>'));
        }
        
        for (var i = 0; i < obj.list.length; i++) {
          if(obj.list[i].no ==data.freeReview.reservationNo){
            $('#reservation').append($('<option value="' + obj.list[i].no + '" selected">' + obj.list[i].tour.title + '</option>'));
            $('#reservation').append($('<option value="' + 0 + '"">' + '선택 안함' + '</option>'));
          }
         }
        for (var i = 0; i < obj.list.length; i++) {
          if(obj.list[i].no !=data.freeReview.reservationNo){
            $('#reservation').append($('<option value="' + obj.list[i].no + '">' + obj.list[i].tour.title + '</option>'));
          }
         }
      }
       
      
       $('#reservation').formSelect();
     })
       
     
  
  
  });
  
  
  
  
  
 
})();


$('#list-btn').click(function () {
  location.href = "index.html"; 
})

$('#update-btn').click(function () {
  

  if (!$('#title').val()) {
    $('#title').focus();
    M.toast({ html: '제목을 적으세요..' })
    return;
  }else if($(".ql-editor").html()=='<p><br></p>'){
    
    $('.ql-editor').focus();
    M.toast({ html: '내용을 적으세요..' })
    return;
    
  }else{
    $('#update-btn').attr('disabled','disabled');
    var citys =  Array.apply(null, new Array(4)).map(Number.prototype.valueOf,0);
    if($('#city').val()!=0){
     citys = $('#city').val();
    }
    $.post('../../app/json/freereview/update?no='+reviewNo, {
      
      reservationNo: $('#reservation').val(),
      title: $("#title").val(),
      content: $(".ql-editor").html(),
      score : $('#raty').children().last().val(),
      citys : citys
      
    },
    function(data) {
      
      if(data.status == 'success') {
        location.href = "index.html";  
      } else {
        alert('업데이트 실패 입니다.\n' + data.message);
        location.href = "index.html"; 
      }
    });
    
    }
});

function ratyInit(no)  { 
  $ ( '#raty' ). raty ({  
    score : no,
    starOn : '../../images/star-on.png' ,
    starOff : '../../images/star-off.png'
  
  }); 
}



