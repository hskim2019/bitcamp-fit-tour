// footer loading
(function () {
  $.ajax({
    url:'/bitcamp-fit-tour/html/footer.html',
    success: function(obj){
      $('.bit-main-footer').html(obj);
    }
  });
})();









