const lines = [
  'You + Me = a perfect playlist and endless sunsets 💕',
  'Spoiler: I already picked us as couple goals 💫',
  'Roses are red, violets are blue, this site is cute, just like you 🌹'
];

const button = document.getElementById('surpriseBtn');
const surprise = document.getElementById('surpriseText');
let idx = 0;

button.addEventListener('click', () => {
  surprise.textContent = lines[idx % lines.length];
  idx += 1;
});

const canvas = document.getElementById('hearts');
const ctx = canvas.getContext('2d');
let hearts = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createHeart() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 20,
    size: Math.random() * 14 + 8,
    speed: Math.random() * 1.1 + 0.6,
    drift: (Math.random() - 0.5) * 0.8,
    alpha: Math.random() * 0.5 + 0.35
  };
}

function drawHeart(x, y, s, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s / 16, s / 16);
  ctx.beginPath();
  ctx.moveTo(0, -4);
  ctx.bezierCurveTo(-8, -14, -24, -4, 0, 16);
  ctx.bezierCurveTo(24, -4, 8, -14, 0, -4);
  ctx.fillStyle = `rgba(255, 121, 190, ${alpha})`;
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (hearts.length < 50 && Math.random() > 0.7) {
    hearts.push(createHeart());
  }

  hearts.forEach((heart) => {
    heart.y -= heart.speed;
    heart.x += heart.drift;
    drawHeart(heart.x, heart.y, heart.size, heart.alpha);
  });

  hearts = hearts.filter((heart) => heart.y + heart.size > -20);
  requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
resize();
animate();
