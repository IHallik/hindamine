function getMessages(timestamp){
  var queryString = {'timestamp' : timestamp};

  $.ajax(
      {
          type: 'GET',
          url: 'request.php',
          data: queryString,
          success: function(data){
              // put result data into "obj"
              var obj = data;
              //console.log(obj);
              var arr = obj.messages;
              //console.log(arr);
              console.log(arr.length);
              // display the data
              var out = "";
              for (var i = 0; i < arr.length; i++){
                  console.log("this is test");
                  out += '<li>' + arr[i].message + '-' + arr[i].email_address +  '</li> ';
              }
              document.getElementById("data").innerHTML = out;
              // requcive call with upodated timestamp
              getMessages(obj.timestamp);
          }
      }
  );
  /*
  var xmlhttp = new XMLHttpRequest();
  var request_url = "messages.json";

  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var myArr = JSON.parse(this.responseText);
          fillDataList(myArr);
      }
  };
  xmlhttp.open("GET", request_url, true);
  xmlhttp.send();

  function fillDataList(arr) {
      var out = "";
      var i;
      for(i = 0; i < arr.length; i++) {
          out += '<li>' + arr[i].message + '-' + arr[i].email_address +  '</li> ';
      }
      document.getElementById("data").innerHTML = out;
  }*/
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
