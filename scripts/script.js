function getMessages(timestamp){
  var queryString = {'timestamp' : timestamp};

  $.ajax(
      {
          type: 'GET',
          url: 'request.php',
          data: queryString,
          contentType: "application/json;charset=utf-8",
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
    var values =  {};
    values.email = document.getElementById("email").value;
    values.message = document.getElementById("message").value;
    var json = JSON.stringify(values);

    $.ajax({
            type: "POST",
            url: "send.php",
            data: json,
            dataType:'json',
            success: function() {
                console.log("success");
            },
            error: function(jqXHR) {
                console.log("errorThrown");
                console.log(jqXHR);
            }
        })}

// initialize jQuery
$(function() {
    getMessages();
});
