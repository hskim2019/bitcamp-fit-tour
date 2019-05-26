var quill;

(function quilljsediterInit() {
  quill = new Quill('#quillEditor', {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block']
    ]
  },
  placeholder: 'Compose an epic...',
  theme: 'snow'  // or 'bubble'
});
//  var options = {
//      modules: {
//          toolbar: [
//              [{ header: [1, 2, false] }],
//              ['bold', 'italic', 'underline'],
//              ['image', 'code-block']
//          ]
//      },
//      placeholder: 'Compose an epic...',
//      theme: 'snow'
//  };
//  quill = new Quill('#quillEditor', options);
//  quill.getModule('toolbar').addHandler('image', function() {
//      selectLocalImage();
//  });
})();

//function send()
//{
//  var contents = quill.getContents();
//   console.log(contents);
//   
//   $.ajax({
//     type: 'post',
//     dataType: "json",         
//    // enctype: 'multipart/form',
//     url: '../../app/json/tour/add',
//     data: contents,
//     processData: false,
//     contentType: 'application/json',
//     success: function(data) {
//       console.log(data);
//     },
//     error: function(err) {
//       console.log("ERROR : ", err);
//     }
// });
// }

var form = document.querySelector('form');
form.onsubmit = function() {
  // Populate hidden form on submit
  var about = document.querySelector('input[name=about]');
  //about.value = JSON.stringify(quill.getContents());
  
  var h = document.getElementById("quillEditor").innerHTML;
  
  alert(h);
  console.log("Submitted", $(form).serialize(), $(form).serializeArray());
  
   $.ajax({
     type: 'post',
     dataType: "json",    
     async: false,      
     url: '../../app/json/tour/add',
     data: h,
     processData: false,
     contentType: "application/json;charset=UTF-8",
     success: function(data) {
       console.log(data);
     },
     error: function(err) {
       console.log("ERROR : ", err);
     }
 });
  return false;
};

//function selectLocalImage() {
//  const input = document.createElement('input');
//  input.setAttribute('type', 'file');
//  input.click();
//  
//  // Listen upload local image and save to server
//  input.onchange = function() {
//      const fd = new FormData();
//      const file = $(this)[0].files[0];
//      fd.append('image', file);
//      console.log(fd.getAll('image'));
//
//      
//  };
//}