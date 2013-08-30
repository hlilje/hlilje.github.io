// Pretend to be a class
function BouncingBalls() {
  // Init
  var canvas = document.getElementById("canvas");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  var w = canvas.width; var h = canvas.height;
  var ctx = canvas.getContext("2d");

  // Array of particles
  var particles = [];
  for(var i=0; i<50; i++) {
    particles.push(new create_particle());
  }

  // Func to generate a particle
  function create_particle() {
    // Random size
    this.radius = Math.random() * 20 + 20;

    // Random starting position, don't allow spawning outside canvas
    this.x = Math.random() * (w - this.radius*4) + this.radius*2;
    this.y = Math.random() * (h - this.radius*4) + this.radius*2;

    // Random velocity
    this.vx = Math.random() * 20 - 10;
    this.vy = Math.random() * 20 - 10;

    // Scalar to flip sign for velocity
    this.dirX = 1;
    this.dirY = 1;

    // Random colors
    var r = Math.random() * 255 >> 0; // Flooring hack
    var g = Math.random() * 255 >> 0;
    var b = Math.random() * 255 >> 0;
    this.color = "rgba("+r+", "+g+", "+b+", 0.5)";
  }

  // Animation
  function draw() {
    // Moving background paint code inside this to remove trail
    // Makes background paint not blend with previous frame
    // Displays source image over destination image
    ctx.globalCompositeOperation = "source-over";

    // Black rect covering canvas with a bit opacity
    // The increasing layers of transparent black eventually covers the trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(0, 0, w, h); // x y w h

    // Blend particles with background
    // Displays the source image + destination image
    ctx.globalCompositeOperation = "lighter";

    // Draw particles from array
    for(var t=0; t<particles.length; t++) {
      var p = particles[t];
      ctx.beginPath();

      // Colours
      // xStart yStart startRadius xEnd yEnd endRadius
      var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      gradient.addColorStop(0, "white");
      gradient.addColorStop(0.4, "white");
      gradient.addColorStop(0.4, p.color);
      gradient.addColorStop(1.0, "black");

      // Draw the particle
      ctx.fillStyle = gradient;
      // x y r startAngle endAngle counterclockwise
      ctx.arc(p.x, p.y, p.radius, Math.PI*2, false);
      ctx.fill();

      // Use velocity
      p.x += p.dirX * p.vx;
      p.y += p.dirY * p.vy;

      // Make balls bounce
      // Centered origo
      if(p.x < p.radius || p.x > w - p.radius) p.dirX = p.dirX * -1;
      if(p.y < p.radius || p.y > h - p.radius) p.dirY = p.dirY * -1;
    }
  }

  // Repeatedly executes the code after a given time (ms)
  setInterval(draw, 33);
}

BouncingBalls(); // Start the animation
