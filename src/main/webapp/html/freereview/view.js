var param = location.href.split('?')[1],
    reviewNo = param.split('=')[1];
var user = JSON.parse(sessionStorage.getItem('loginUser'))
//$('#delete-btn').show();
loadData(reviewNo);

function loadbtn(no){
  if(user!=null){
    if(user.no==no){
      $('#delete-btn').show();
      $('#update-btn').show();
    }
  }
  
}
function loadData(no) {
  
 
  
  $.getJSON('../../app/json/freereview/detail?no=' + reviewNo, 
      function(data) {
    
     loadbtn(data.memberNo)
    
    $('#titleTd').html(data.title);
    $('#nameTd').html(data.member.name);
    $('#createdDateTd').html(data.createdDate);
    $('#countViewTd').html(data.viewCount);
    $('#content').html(data.content);
    $ ( '#raty' ). raty ({
    score: data.score,
    readOnly : true, 
    starOn : '../../images/star-on.png' ,
    starOff : '../../images/star-off.png'
  
  }); 
    
    $.getJSON('../../app/json/reservation/detail?no=' + data.reservationNo,
            function(obj) {
      
      $('#tourAtag').html(obj.tour.title);
      $('#tourAtag').attr('data-no',obj.tour.no)
    });
    $(document.body).trigger('loaded-list');
    
   
  });
  
};

$('#delete-btn').click(() => {
  $.getJSON('../../app/json/freereview/delete?no=' + reviewNo, 
      function(data) {

    if(data.status == 'success') {
      location.href = "index.html";  
    } else {
      alert('삭제 실패 입니다.\n' + data.message);
    }
  });
});
$('#update-btn').click(() => {
  window.location.href = 'update.html?no='+reviewNo;
});



