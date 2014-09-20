// Pretend to be a class
function Clock() {
  var canvas = document.getElementById("canvas");
  var w = canvas.width; var h = canvas.height;
  var ctx = canvas.getContext("2d");

  // x0 y0 r0 x1 y1 r1
  var grd = ctx.createRadialGradient(w/2,w/2,20,w/2,w/2,(w/4)*3);
  grd.addColorStop(0, "cyan");
  grd.addColorStop(1, "white");

  ctx.globalCompositeOperation = "source-over";

  function drawFace() {
    // Background
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(0, 0, w, h);

    var clockRadius = canvas.width/2;

    ctx.beginPath();
    ctx.arc(w/2, h/2, clockRadius, 0, Math.PI*2, false);
    ctx.strokeStyle = "white";
    ctx.stroke();
  }

  function drawHand(hX, hY) {
    ctx.strokeStyle = grd;
    ctx.beginPath();
    ctx.moveTo(w/2, h/2);
    ctx.lineTo(hX, hY);
    ctx.stroke();
  }

  function setTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    // Calculate angle for clock hands
    if(hours > 12) {
      hours = hours - 12;
    }
    var hAngle = ((2 * Math.PI) / 12) * hours - (Math.PI/2);
    var mAngle = ((2 * Math.PI) / 60) * minutes - (Math.PI/2);
    var sAngle = ((2 * Math.PI) / 60) * seconds - (Math.PI/2);

    // Hour hand 
    var hhX = (w/2 + w/4 * Math.cos(hAngle)) >> 0; // origin + radius * cos(angle)
    var hhY = (h/2 + h/4 * Math.sin(hAngle)) >> 0;
    drawHand(hhX, hhY);

    // Minute hand
    var mhX = (w/2 + (w/3) * Math.cos(mAngle)) >> 0;
    var mhY = (h/2 + (h/3) * Math.sin(mAngle)) >> 0;
    drawHand(mhX, mhY);

    // Second hand
    var shX = (w/2 + w/2 * Math.cos(sAngle)) >> 0;
    var shY = (h/2 + h/2 * Math.sin(sAngle)) >> 0;
    drawHand(shX, shY);
  }

  function drawClock() {
    drawFace();
    setTime();
  }

  // Draw clock every second
  setInterval(drawClock, 1000);
}

Clock(); // Start the clock
