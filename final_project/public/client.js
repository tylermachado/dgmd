document.addEventListener("DOMContentLoaded", function() {
   var cursor = { 
      click: false,
      move: false,
      pos: {x:0, y:0, x1:0, y1:0},
      pos_prev: false,
      type: null
   };
   // get canvas element and create context
   var canvas  = document.getElementById('space');
   var context = canvas.getContext('2d');
   var width   = window.innerWidth;
   var height  = window.innerHeight;
   var socket  = io.connect();

   // set canvas to full browser width/height
   canvas.width = width;
   canvas.height = height;

   // register cursor event handlers
   canvas.onmousedown = function(e){ cursor.click = true; };
   canvas.onmouseup = function(e){ cursor.click = false; };
   canvas.ontouchstart = function(e){ cursor.click = true; };
   canvas.ontouchend = function(e){ cursor.click = false; };

   canvas.onmousemove = function(e) {
      // normalize cursor position to range 0.0 - 1.0
      cursor.pos.x = e.clientX / width;
      cursor.pos.y = e.clientY / height;
      cursor.move = true;
   };

   canvas.ontouchmove = function(e) {
      e.preventDefault();
      // normalize cursor position to range 0.0 - 1.0
      cursor.pos.x = e.touches[0].clientX / width;
      cursor.pos.y = e.touches[0].clientY / height;
      if (e.touches[1]) {
         cursor.pos.x1 = e.touches[1].clientX / width;
         cursor.pos.y1 = e.touches[1].clientY / height;
      }
      cursor.move = true;
   };

   socket.on('changecolor', function (data) {
      document.querySelector("#space").style.background = data;
   });

   socket.on('logmouse', function (data) {
      console.log(data);
   });

   function loop() {
      // send data to to the server
      if (cursor.click) {
         var x = cursor.pos.x;
         var y = cursor.pos.y;
         var x1 = cursor.pos.x1;
         var y1 = cursor.pos.y1;
         socket.emit('newcolor', "linear-gradient(" + (x1*90+90) + "deg, hsl(" + (x*255) + ", 100%, 40%) 0%,hsl(" + (y*255) + ", 100%, 40%) 100%)");
         socket.emit('mousetype', "x1: " + cursor.pos.x1);
      }
      setTimeout(loop, 100);
   }
   loop();
});