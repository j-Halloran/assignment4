// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

var $dataArray = new Array();

$(document).ready(function(){
  var jsonHolder;
  $("#prediction").hide()
  $.ajax({
    dataType: 'json',
    url: "http://www.mattbowytz.com/simple_api.json?data=all",
    data: jsonHolder,
    success: function (response) {
              //done as two steps incase comics somehow returns first
              $dataArray = $.merge(response.data.interests,$dataArray);
              $dataArray = $.merge(response.data.programming,$dataArray);
            }
  });
  $.ajax({
    dataType: 'json',
    url: "http://www.mattbowytz.com/simple_api.json?data=comics",
    data: jsonHolder,
    success: function (response) {
              $dataArray = $.merge(response.data,$dataArray);
            }
  });
});

$("#searchBar").keyup(function(event){
  var i =0;
  if(event.which==16){
    return;
  }

  var $bestMatch = 'No Match Found';
  var $maxLength = 0;
  var $searchText = $("#searchBar").val().toLowerCase();
  var $temp;

  if($searchText.length==0){$("#prediction").hide(); return;}
  for(i = 0; i<$dataArray.length; i++){
    $temp = $dataArray[i].toLowerCase();
    if($temp.substring(0,$searchText.length)==$searchText){
      $bestMatch = $dataArray[i];
      break;
    }
  }
  $temp = 'https://www.google.com/#q='.$bestMatch;
  $("#prediction").text($bestMatch);
  $("#prediction").prop("href",'https://www.google.com/#q='+$bestMatch);
  $("#prediction").show();
});

(function() {
  // Magic!
  console.log('Keepin\'n it clean with an external script!');
})();
