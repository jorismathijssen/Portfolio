// Matrix and confetti effect helpers for Terminal

/**
 * Canvas effect cleanup function type
 */
export interface CanvasWithCleanup extends HTMLCanvasElement {
  _matrixCleanup?: () => void;
  _confettiCleanup?: () => void;
}

/**
 * Confetti particle interface
 */
interface ConfettiParticle {
  x: number;
  y: number;
  r: number;
  d: number;
  color: string;
  tilt: number;
  tiltAngle: number;
}

/**
 * Matrix effect configuration
 */
interface MatrixConfig {
  fontSize: number;
  characters: string[];
  fallSpeed: number;
  fadeAlpha: number;
  color: string;
}

/**
 * Default Matrix configuration
 */
const DEFAULT_MATRIX_CONFIG: MatrixConfig = {
  fontSize: 16,
  characters: 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン'.split(''),
  fallSpeed: 0.975,
  fadeAlpha: 0.05,
  color: '#0F0'
};

/**
 * Starts the Matrix rain animation on the given canvas.
 * @param canvas The canvas element to draw the effect on.
 * @param config Optional configuration for the Matrix effect
 */
export function startMatrix(canvas: HTMLCanvasElement, config: Partial<MatrixConfig> = {}): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Failed to get 2D context for Matrix effect');
    return;
  }

  const effectConfig = { ...DEFAULT_MATRIX_CONFIG, ...config };
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  
  const columns = Math.floor(width / effectConfig.fontSize);
  const drops = Array(columns).fill(1);
  let animationFrame: number;

  function draw(): void {
    if (!ctx) return;
    
    ctx.fillStyle = `rgba(0,0,0,${effectConfig.fadeAlpha})`;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = effectConfig.color;
    ctx.font = `${effectConfig.fontSize}px monospace`;
    
    for (let i = 0; i < drops.length; i++) {
      const text = effectConfig.characters[Math.floor(Math.random() * effectConfig.characters.length)] || '1';
      ctx.fillText(text, i * effectConfig.fontSize, drops[i] * effectConfig.fontSize);
      
      if (drops[i] * effectConfig.fontSize > height && Math.random() > effectConfig.fallSpeed) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    animationFrame = requestAnimationFrame(draw);
  }

  function handleResize(): void {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  draw();
  window.addEventListener('resize', handleResize);
  
  // Store cleanup function on canvas
  (canvas as CanvasWithCleanup)._matrixCleanup = () => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener('resize', handleResize);
  };
}

/**
 * Starts the confetti animation on the given canvas.
 * @param canvas The canvas element to draw the effect on.
 * @param particleCount Optional number of confetti particles (default: 150)
 */
export function startConfetti(canvas: HTMLCanvasElement, particleCount: number = 150): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Failed to get 2D context for Confetti effect');
    return;
  }

  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  
  const confetti: ConfettiParticle[] = Array.from({ length: particleCount }, () => ({
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
  
  function draw(): void {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, width, height);
    angle += 0.01;
    
    for (let i = 0; i < confetti.length; i++) {
      const c = confetti[i];
      if (!c) continue;
      
      c.tiltAngle += 0.1;
      c.y += Math.cos(angle + c.d) + 1 + c.r / 2;
      c.x += Math.sin(angle);
      c.tilt = Math.sin(c.tiltAngle - i / 3) * 15;
      
      if (c.y > height) {
        c.x = Math.random() * width;
        c.y = -10;
      }
      
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();
    }
    animationFrame = requestAnimationFrame(draw);
  }
  
  function handleResize(): void {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  
  draw();
  window.addEventListener('resize', handleResize);
  
  // Store cleanup function on canvas
  (canvas as CanvasWithCleanup)._confettiCleanup = () => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener('resize', handleResize);
  };
}
