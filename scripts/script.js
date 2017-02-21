function getMessages(timestamp){
  var queryString = {'timestamp' : timestamp};

  $.ajax(
      {
          type: 'GET',
          url: 'request.php',
          data: queryString,
          success: function(data){
              // put result data into "obj"
              var arr = data.messages;
              // display the data
              var out = "";
              for (var i = 0; i < arr.length; i++){
                  out += '<li>' + arr[i].message + '-' + arr[i].email_address +  '</li> ';
              }
              document.getElementById("data").innerHTML = out;
              // requcive call with upodated timestamp
              getMessages(data.timestamp);
          }
      }
  );
}
var xmlhttp;
function sendMessage() {

    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var values =  {};
    values.email = document.getElementById("email").value;
    values.message = document.getElementById("message").value;

    var json = JSON.stringify(values);

    xmlhttp.onreadystatechange = respond;
    xmlhttp.open("POST", "send.php", true);
    xmlhttp.send(json);

}
function respond() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById('result').innerHTML = xmlhttp.responseText;
    }
}

// initialize jQuery
$(function() {
    getMessages();
});
