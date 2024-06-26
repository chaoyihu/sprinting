// call on load
get_user_info();


function get_user_info() {
   console.log("Getting user data.");
   let data = JSON.stringify({
      "session_id": get_cookie("session_id")
   });
   var url = window.location.host + "/sprinting/profile/action/get_user_info";
   console.log(url);
   var protocol = "http";
   var xhr = new XMLHttpRequest();
   if (!url.startsWith(protocol)) {
       url = protocol + "://" + url;
   };
   xhr.open("GET", url);
   xhr.setRequestHeader("Content-Type", "application/json");
   xhr.onload = function() {
      var parser = server_message_check(xhr.responseText);
      if (!parser.success) {
         console.log(parser.message);
      } else {
         var obj = parser.data;
         console.log(obj);
         document.getElementById("user-info").innerHTML = `
            <b>${obj["username"]}</b>
         `;
      }
   };
   xhr.send(data);
}

 
function new_sprint() {
   my_redirect("/sprinting/sprint/planning", "http"); 
};

function join_sprint() {
   var sprint_id = document.getElementById("sprint_id_box").value;
   my_redirect("/sprinting/sprint/" + sprint_id, "http");
};