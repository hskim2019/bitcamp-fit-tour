//load user
if(sessionStorage.getItem('loginUser')){
  var user = JSON.parse(sessionStorage.getItem('loginUser'))
}

console.log(user);

//set profile
$("#profile-picture").attr('src','/bitcamp-fit-tour/upload/member/'+user.photo);
$("#profile-picture-full").attr('src','/bitcamp-fit-tour/upload/member/'+user.photo);
$("#info-name").html(user.name);
$("#info-email").html(user.email);
$("#info-phone").html(user.tel);
var birth = user.birth.split('-');
console.log(birth);
$("#info-birth").html(birth[0] + '년' + birth[1] + '월' + birth[2] + '일');

$("#profile-picture-overlay").click(function(){
  $("#grey-overlay").show();
});

$("#grey-overlay").click(function(){
    $("#grey-overlay").hide();
});

$("#edit-info").click(function(){
  
  var isEdit=isEditMode();
  
  if(isEdit){
    saveChanges();
  }
  else{
    editInfo();
  }
  
  changeMode(isEdit);

});

function editInfo(){  
  $(".info-data").each(function(index, data){
    var $data=$(data);
    var text = $.trim($data.text());
    var pattern=getPattern($data);
    
    $data.replaceWith("<input pattern='"+pattern+"' id='"+data.id+"' class='info-input' value='" + text + "'>   </input>");
  });
}

function saveChanges(){
  $(".info-input").each(function(index, data){
    var $data=$(data);
    var text = $.trim($data.val());
    $data.replaceWith("<h id='"+data.id+"' class='info-data'>"+ text +"</h>");
  });
}

function isEditMode(){
  
  var $icon=$("#edit-info > span");
  
  if($icon.hasClass("fa-edit"))
  {
    return false;    
  }
  return true;
}

function changeMode(isEdit){
  var $icon=$("#edit-info > span");
  
  $icon.removeClass();
  
  if(isEdit){
    $icon.addClass("fa fa-edit");
  }else{
    $icon.addClass("fa fa-check")
  }
}

function getPattern($element){
  var inputType=$element[0].id.split("-")[1];
  
  switch(inputType){
    case "email":
      return '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
      break;
    case "phone":
      return "/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/";
      break;
    case "address":
      return "*";
      break;
  }
}


