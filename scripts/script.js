function getMessages(timestamp){
  var queryString = {'timestamp' : timestamp};

  $.ajax({
          type: 'get',
          url: 'request_new.php',
          data: queryString,
          contentType: "application/json;charset=utf-8",
          success: function(data){
              // put result data into "obj"
              var arr = data.messages;
              // display the data
              var out = "";
              for (var i = 0; i < arr.length; i++){
                  out +="<div class=\"message-container\">" +
                          "<span id=\"time\">" + toText(arr[i].eventtime) + "</span>   " +
                          "<span id=\"location\">" + toText(arr[i].location_name) + "-" + arr[i].location_address + "</span><br>" +
                          "<span id=\"info\">" + toText(arr[i].info) + "</span><br>"  +
                          "<span id=\"Email\">"+ toText(arr[i].email_address) +"</span><br>"+
                          "<a href=/post.html?id=" + toText(arr[i].idpost) + ">Continue</a>"  +
                        "</div>" ;
              }
              document.getElementById("data").innerHTML = out;
              // requcive call with upodated timestamp
              getMessages(data.timestamp);
          }
      }
  );
}
function getMessage(id){
  var queryString = {'timestamp' : 0};
  $.ajax({
          type: 'get',
          url: 'request_new.php',
          data: queryString,
          contentType: "application/json;charset=utf-8",
          success: function(data){
              // put result data into "obj"
              var arr = data.messages;
              // display the data
              var post;

              for (var i = 0; i < arr.length; i++){
                if (arr[i].idpost == id) {
                  console.log(arr[i]);
                  post =arr[i];
                  initMap(arr[i].location_id);
                  break;
                }
              }
              document.getElementById("post_count").innerHTML = toText(post.people);
              document.getElementById("post_time").innerHTML = toText(post.eventtime);
              document.getElementById("post_info").innerHTML = toText(post.info);
          }
      }
  );
}
function toText( html ) {
    //return html.replace(/</g, "&lt;").replace(/>/g, "&gt;"); //visualy more interesting for demo
    return $( $.parseHTML(html) ).text();
}
function sendMessage() {
    document.getElementById("summit").disabled = true;
    var values =  {};
    var send = true;

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!(document.getElementById("form_email").value.match(re))) {
      document.getElementById("form_email_error").innerHTML = "Enter email an address.";
      send = false;
    }else {
      values.email = document.getElementById("form_email").value;
      document.getElementById("form_email_error").innerHTML = "";
    }

    if (document.getElementById("form_message").value === "") {
      document.getElementById("form_message_error").innerHTML = "Enter some information about the event.";
      send = false;
    }else {
      values.message = document.getElementById("form_message").value;
      document.getElementById("form_message_error").innerHTML = "";
    }

    values.event_time = document.getElementById("form_date").value + " " + document.getElementById("form_time").value;

    if (document.getElementById("form_count").value === "") {
      document.getElementById("form_count_error").innerHTML = "Specify how many peopel can join.";
      send = false;
    }else {
      values.people_count = document.getElementById("form_count").value;
      document.getElementById("form_count_error").innerHTML = "";
    }

    if (document.getElementById("form_location").value == -1) {
      document.getElementById("form_location_error").innerHTML = "Select a location.";
      send = false;
    }else {
      values.location = document.getElementById("form_location").value;
      document.getElementById("form_location_error").innerHTML = "";
    }

    if (send) {
      var json = JSON.stringify(values);
      $.ajax({
              type: "post",
              url: "send_new.php",
              data: json,
              dataType: "json",
              success: function(data) {
                if (data.success) {
                  document.getElementById("messageForm").reset();
                  initForm();
                  document.getElementById("servermessage").innerHTML ="";
                  document.getElementById("summit").disabled = false;
                }else {
                  document.getElementById("servermessage").innerHTML = data.status;
                  document.getElementById("summit").disabled = false;
                }
              },
              error: function(jqXHR) {
                  document.getElementById("servermessage").innerHTML = jqXHR.responseText;
              }
          });
      }
    document.getElementById("summit").disabled = false;
}
function getSpamer(){
  $.ajax({
          type: 'get',
          url: 'mostmessages.php',
          contentType: "application/json;charset=utf-8",
          success: function(data){
              document.getElementById("largest_email").innerHTML = data.email;
              document.getElementById("largest_count").innerHTML = data.count;
          }
      }
  );
}
function initMap(locationId) {
  console.log("-----------");
  console.log(locationId);
  $.ajax({
          type: 'get',
          url: 'getLocation.php',
          data: {"id":locationId},
          contentType: "application/json;charset=utf-8",
          success: function(data){
              if (data.success) {
                // put result data into "obj"
                console.log(data);
                var location = data.location;
                console.log(location);
                if (location === null) {
                  console.log("WTF IS GOING ON");//initMap gets called 2 times for some reason
                } else{
                  var map = new google.maps.Map(document.getElementById('map'), {
                    center: new google.maps.LatLng(location.lat, location.lng),
                    zoom: 16
                  });
                  var infoWindow = new google.maps.InfoWindow();

                  var point = new google.maps.LatLng(
                      parseFloat(location.lat),
                      parseFloat(location.lng)
                  );
                  var infowincontent = document.createElement('div');
                  var strong = document.createElement('strong');
                  strong.textContent = location.name;
                  infowincontent.appendChild(strong);
                  infowincontent.appendChild(document.createElement('br'));

                  var text = document.createElement('text');
                  text.textContent = location.address;
                  infowincontent.appendChild(text);
                  var icon = {};
                  var marker = new google.maps.Marker({
                    map: map,
                    position: point,
                    label: icon.label
                  });

                  marker.addListener('click', function() {
                    infoWindow.setContent(infowincontent);
                    infoWindow.open(map, marker);
                  });
              }
              } else {
                  // think how to handle it
              }

          }
      }
  );
}
function initForm(){
  var date = new Date();

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  var today = year + "-" + month + "-" + day;
  document.getElementById('form_date').value = today;

  var select = document.getElementById("form_location");
  var opt = document.createElement("option");

  opt.value= -1;
  opt.innerHTML = "Select location";
  select.appendChild(opt);
  $.ajax({
          type: 'get',
          url: 'locations.php',
          contentType: "application/json;charset=utf-8",
          success: function(data){
            for (var i = 0; i < data.length; i++){
               var element = data[i];
               opt = document.createElement("option");
               opt.value= element.idlocation;
               opt.innerHTML = element.name; // whatever property it has

               // then append it to the select element
               select.appendChild(opt);
            }
          }
      }
  );
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
// initialize jQuery
$(function() {
  $("#header").load("header.html");
  $("#footer").load("footer.html");
  switch (window.location.pathname) {
    case "/":
      getMessages();
      break;

    case "/post.html":
    var id = getURLParameter("id");
      getMessage(id);
      break;

    case "/new.html":
      initForm();
      break;

    default:
      console.log("you are lost");
  }


});
