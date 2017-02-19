function getMessages(){
  var xmlhttp = new XMLHttpRequest();
  var request_url = "request.php";

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
  }
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
