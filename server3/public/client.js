document.addEventListener("DOMContentLoaded", function() {
   var mouse = { 
      click: false,
      move: false,
      pos: {x:0, y:0},
      pos_prev: false
   };
   // get canvas element and create context
   var canvas  = document.getElementById('drawing');
   var context = canvas.getContext('2d');
   var width   = window.innerWidth;
   var height  = window.innerHeight;
   var socket  = io.connect();

   // set canvas to full browser width/height
   canvas.width = width;
   canvas.height = height;

   // register mouse event handlers
   canvas.onmousedown = function(e){ mouse.click = true; };
   canvas.onmouseup = function(e){ mouse.click = false; };

   socket.on('changecolor', function (data) {
      document.querySelector("#drawing").style.backgroundColor = data;
   });

   function mainLoop() {
      // send data to to the server
      if (mouse.click) {
         var x = new Date().valueOf().toString().split('').map(function(e){return parseInt(e)}).reduce(function(a,b){return a+b});
         socket.emit('newcolor', "hsla(" + (x*25) + ", 100%, 54%, 1)");
      }
      setTimeout(mainLoop, 100);
   }
   mainLoop();
});