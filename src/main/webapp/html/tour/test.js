//var quill;
//
//(function quilljsediterInit() {
//  quill = new Quill('#quillEditor', {
//  modules: {
//    toolbar: [
//      [{ header: [1, 2, false] }],
//      ['bold', 'italic', 'underline'],
//      ['image', 'code-block'],
//      [{color: ['red', 'blue']} ],
//      [{size: [ 'small', false, 'large', 'huge' ]}]
//    ]
//  },
//  placeholder: 'Compose an epic...',
//  theme: 'snow'  // or 'bubble'
//});
//  $(document.body).trigger('loadQillEditer');
//})();
//
//$(document.body).bind('loadQillEditer', () => {
//  console.log('a')
//  $('.ql-picker').next().remove();
//});
//
//
//var form = document.querySelector('form');
//form.onsubmit = function() {
//  
//  var data = $(".ql-editor").html();
//  
//  console.log(data);
//  
//   $.ajax({
//     type: 'post',
//     dataType: "json",    
//     async: false,      
//     url: '../../app/json/tour/add',
//     data: data,
//     processData: false,
//     contentType: "application/json;charset=UTF-8",
//     success: function(data) {
//       console.log(data);
//     },
//     error: function(err) {
//       console.log("ERROR : ", err);
//     }
// });
//  return false;
//};

$(document).ready(function(){
  $('.tabs').tabs();
});
