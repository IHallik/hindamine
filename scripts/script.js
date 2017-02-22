function getMessages(timestamp){
  var queryString = {'timestamp' : timestamp};

  $.ajax({
          type: 'get',
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
function sendMessage() {
    var values =  {};
    values.email = document.getElementById("email").value;
    values.message = document.getElementById("message").value;
    var json = JSON.stringify(values);
    $.ajax({
            type: "post",
            url: "send.php",
            data: json,
            dataType: "json",
            success: function(data) {
              if (data.success) {
                document.getElementById("messageForm").reset();
                document.getElementById("servermessage").innerHTML ="";
              }else {
                document.getElementById("servermessage").innerHTML = data.status;
              }
            },
            error: function(jqXHR) {
                console.log(jqXHR);
                //TODO add error message to the screen
                document.getElementById("servermessage").innerHTML = jqXHR.responseText;
            }
        });
      }

// initialize jQuery
$(function() {
    getMessages();
});
