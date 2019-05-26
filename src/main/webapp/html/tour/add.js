
$(document).ready(function() {
  $('input[type="text"]').characterCounter();
  $('select').formSelect();
});

$(document).ready(function(){
  $('.tabs').tabs({
    swipeable: true,
    index: 50
  });
});

(function quilljsediterInit() {
  var options = {
      modules: {
          toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['image', 'code-block']
          ]
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'
  };
  quill = new Quill('#quillEditor', options);
  quill.getModule('toolbar').addHandler('image', function() {
      selectLocalImage();
  });
})();
