var quill = new Quill('#editor', {
  modules: {
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }], 
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }],  
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],      
      [{ 'align': [] }],
      ['image', 'link', 'video']
      ]
  },
  placeholder: '내용을 입력해 주세요',

  theme: 'snow'  // or 'bubble'

});


//var delta =JSON.stringify(quill.getContents());
//var delta = quill.getContents();
//console.log(delta);
//var text = this.quill.getText();
//var quillHtml = quill.root.innerHTML.trim();



$('#add-btn').click(() => {
  $.post('../../app/json/notice/add', {

   
     title: $('#title').val(),
     content: $('.ql-editor').html()

  },

  function(data) {

    if(data.status == 'success') {
      location.href = "index.html";  
    } else {
      alert('등록 실패 입니다.\n' + data.message);
    }
  });
});