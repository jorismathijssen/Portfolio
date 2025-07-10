// Matrix and confetti effect helpers for Terminal

export function startMatrix(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  const letters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン'.split('');
  const fontSize = 16;
  const columns = Math.floor(width / fontSize);
  const drops = Array(columns).fill(1);
  let animationFrame: number;
  function draw() {
    ctx!.fillStyle = 'rgba(0,0,0,0.05)';
    ctx!.fillRect(0, 0, width, height);
    ctx!.fillStyle = '#0F0';
    ctx!.font = fontSize + 'px monospace';
    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx!.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    animationFrame = requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });
  // Use a symbol property to avoid type errors and avoid 'any'.
  (canvas as HTMLCanvasElement & { _matrixCleanup?: () => void })._matrixCleanup = () => cancelAnimationFrame(animationFrame);
}

export function startConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  const confetti = Array.from({ length: 150 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 150,
    color: `hsl(${Math.random() * 360},100%,50%)`,
    tilt: Math.random() * 10 - 10,
    tiltAngle: 0,
  }));
  let angle = 0;
  let animationFrame: number;
  function draw() {
    ctx!.clearRect(0, 0, width, height);
    angle += 0.01;
    for (let i = 0; i < confetti.length; i++) {
      const c = confetti[i];
      c.tiltAngle += 0.1;
      c.y += Math.cos(angle + c.d) + 1 + c.r / 2;
      c.x += Math.sin(angle);
      c.tilt = Math.sin(c.tiltAngle - i / 3) * 15;
      if (c.y > height) {
        c.x = Math.random() * width;
        c.y = -10;
      }
      ctx!.beginPath();
      ctx!.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx!.fillStyle = c.color;
      ctx!.fill();
    }
    animationFrame = requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });
  (canvas as HTMLCanvasElement & { _confettiCleanup?: () => void })._confettiCleanup = () => cancelAnimationFrame(animationFrame);
}
