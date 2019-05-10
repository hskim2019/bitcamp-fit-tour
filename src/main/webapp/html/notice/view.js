var param = location.href.split('?')[1],

addBtn = $('#add-btn'),
updateBtn = $('#update-btn'),
deleteBtn = $('#delete-btn'),
no = $('#no'),
title = $('#title'),
content = $('#content'),
viewCount = $('#viewCount'),
createdDate = $('#createdDate'),
templateSrc = $('#tr-template').html();



if (param) {
 
  $('h1').html('게시물 보기');
  loadData(param.split('=')[1])
  var el =  $('.bit-new-item');
  for (e of el) {
    e.style.display = 'none';
  }
} else {

  $('h1').html('새글');

  var el = $('.bit-view-item');
  for (e of el) {
   e.style.display = 'none';
  }
}

$('#add-btn').click(() => {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 || xhr.status != 200)
      return;
    
    var data = JSON.parse(xhr.responseText);
    
    if (data.status == 'success') {
      location.href = "index.html"
        
    } else {
      alert('등록 실패입니다!\n' + data.message)
    }
  };
  xhr.open('GET', '../../app/json/notice/add', true)
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  var content = document.querySelector('#content').value;
  
  xhr.send("content=" + encodeURIComponent(content));
});

document.querySelector('#delete-btn').onclick = () => {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 || xhr.status != 200)
      return;
    
    var data = JSON.parse(xhr.responseText);
    
    if (data.status == 'success') {
      location.href = "index.html"
        
    } else {
      alert('삭제 실패입니다!\n' + data.message)
    }
  };
  var notice_id = document.querySelector('#notice_id').value;
  xhr.open('GET', '../../app/json/notice/delete?notice_id=' + notice_id, true)
  xhr.send();
};

document.querySelector('#update-btn').onclick = () => {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 || xhr.status != 200)
      return;
    
    var data = JSON.parse(xhr.responseText);
    
    if (data.status == 'success') {
      location.href = "index.html"
        
    } else {
      alert('변경 실패입니다!\n' + data.message)
    }
  };
  xhr.open('POST', '../../app/json/notice/update', true)
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  var no = document.querySelector('#no').value;
  var title = document.querySelector('#title').value;
  var content = document.querySelector('#content').value;
  
  var qs = 'title=' + encodeURIComponent(title)+
  
    '&content=' + encodeURIComponent(content) +
  
    '&no=' + no;
  console.log(qs);
  alert(qs);
  xhr.send(qs);
};

function loadData(no) {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 || xhr.status != 200)
      return;
    
    var data = JSON.parse(xhr.responseText);
    console.log(data);
    document.querySelector('#no').value = data.no;
    document.querySelector('#content').value = data.content;
     document.querySelector('#title').value = data.title;
    document.querySelector('#createdDate').value = data.createdDate;
    document.querySelector('#viewCount').value = data.viewCount;
  };
  xhr.open('GET', '../../app/json/notice/detail?no=' + no, true)
  xhr.send()
}







