$('#add-btn').click(() => {
  $.post('../../app/json/freereview/add', {

    memberNo: 128,
    reservationNo: 1005,
    title: $("#title").val(),
    content: $(".ql-editor").html()
  
   
    
  },
  function(data) {
    
    if(data.status == 'success') {
      location.href = "index.html";  
    } else {
      alert('등록 실패 입니다.\n' + data.message);
    }
  });
});



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
    placeholder: 'Compose an epic...',
    theme: 'snow'  // or 'bubble'
  });
  $('.ql-picker').next().remove();
})();
