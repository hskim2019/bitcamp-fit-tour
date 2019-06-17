var param = location.href.split('?')[1],
    reviewNo = param.split('=')[1];


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

$(document).ready(function(){
  $('select').formSelect();
});




(function loadList() {
  
  
  
  
  $.getJSON('../../app/json/freereview/detail?no=' + reviewNo, 
          function(data) {
        
        
        $('#title').val(data.title);
        $('.ql-editor').html(data.content);
        
        ratyInit(data.score)
        
        $.getJSON('../../app/json/reservation/myreservation',
          function (obj) {
       if(obj.status == 'fail'){
         $('#selectOption').html('로그인 해주세요');
       } else if(obj.list.length == 0){
        $('#reservation').append($('<option value="' + 0 + '" selected">' + '다녀온 투어가 없습니다.' + '</option>'));
      }else{
        if(data.reservationNo==0){
        $('#reservation').append($('<option value="' + 0 + '" selected">' + '다녀 온 투어를 선택하세요.' + '</option>'));
        }
        
        for (var i = 0; i < obj.list.length; i++) {
          if(obj.list[i].no ==data.reservationNo){
            $('#reservation').append($('<option value="' + obj.list[i].no + '" selected">' + obj.list[i].tour.title + '</option>'));
            $('#reservation').append($('<option value="' + 0 + '"">' + '선택 안함' + '</option>'));
          }
         }
        for (var i = 0; i < obj.list.length; i++) {
          if(obj.list[i].no !=data.reservationNo){
            $('#reservation').append($('<option value="' + obj.list[i].no + '">' + obj.list[i].tour.title + '</option>'));
          }
         }
      }
       
      
       $('select').formSelect();
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
    $.post('../../app/json/freereview/update?no='+reviewNo, {
      
      reservationNo: $('#reservation').val(),
      title: $("#title").val(),
      content: $(".ql-editor").html(),
      score : $('#raty').children().last().val()
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

