function getMesages(){
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
          out += '<li>' + arr[i]["message"] + '-' + arr[i]["email_address"] +  '</li> ';
      }
      document.getElementById("data").innerHTML = out;
  }
}
