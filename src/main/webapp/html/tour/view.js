var param = location.href.split('?')[1];
if (param) {
  document.querySelector('h1').innerHTML = "게시물 조회"
  loadData(param.split('=')[1])
  var el = document.querySelectorAll('.bit-new-item');
  for (e of el) {
    e.style.display = 'none';
  }
} else {
  document.querySelector('h1').innerHTML = "새 글"
  var el = document.querySelectorAll('.bit-view-item');
  for (e of el) {
    e.style.display = 'none';
  }
}

document.querySelector('#add-btn').onclick = () => {
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
  xhr.open('GET', '../../app/json/board/add', true)
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  var contents = document.querySelector('#contents').value;
  
  xhr.send("contents=" + encodeURIComponent(contents));
};

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
  var no = document.querySelector('#no').value;
  xhr.open('GET', '../../app/json/board/delete?no=' + no, true)
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
  xhr.open('POST', '../../app/json/board/update', true)
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  var no = document.querySelector('#no').value;
  var contents = document.querySelector('#contents').value;
  
  var qs = 'contents=' + encodeURIComponent(contents) +
    '&no=' + no;
  
  xhr.send(qs);
};

function loadData(no) {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 || xhr.status != 200)
      return;
    
    var data = JSON.parse(xhr.responseText);
    console.log(data);
    document.querySelector('#title').value = data.title;
    document.querySelector('#subHeading').value = data.subHeading;
    document.querySelector('#content').value = data.content;
    document.querySelector('#totalHour').value = data.totalHour;
    document.querySelector('#hashTag').value = data.hashTag;
    document.querySelector('#personnel').value = data.personnel;
    document.querySelector('#transportation').value = data.transportation;
    document.querySelector('#price').value = data.price;
    document.querySelector('#photoname').value = data.tourPhoto[0].name;
    document.querySelector('#photpath').value = data.tourPhoto[0].path;
    document.querySelector('#theme').value = data.theme[0].theme;
    document.querySelector('#comment').value = data.tourComment[0].content;
  };
  xhr.open('GET', '../../app/json/tour/detail?no=' + no, true)
  xhr.send()
}







