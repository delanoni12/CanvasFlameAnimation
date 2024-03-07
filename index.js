// 获取Canvas元素
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 设置Canvas宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 火焰粒子数组
let particles = [];

// 定义粒子类
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  // 绘制粒子
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // 更新粒子位置
  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.radius -= 0.02; // 控制粒子逐渐减小
  }
}

// 创建火焰喷射
function createFire(x, y) {
  const fireColors = ['#FF5733', '#FFB733', '#FF5733']; // 火焰颜色
  const fireRadius = 30; // 火焰半径
  const fireDensity = 10; // 火焰密度
  for (let i = 0; i < fireDensity; i++) {
    const velocity = {
      x: Math.random() * 6 - 3,
      y: Math.random() * -15 - 5 // 控制火焰向上喷射
    };
    particles.push(new Particle(x, y, fireRadius, fireColors[Math.floor(Math.random() * fireColors.length)], velocity));
  }
}

// 动画循环
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    if (particle.radius > 0) {
      particle.update();
    } else {
      particles.splice(index, 1); // 移除已消失的粒子
    }
  });
}

// 鼠标点击事件，创建火焰喷射
canvas.addEventListener('mousedown', (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  createFire(mouseX, mouseY);
});

// 启动动画
animate();
