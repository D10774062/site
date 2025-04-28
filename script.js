// 获取画布和上下文
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 气球类
class Balloon {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.radius = Math.random() * 20 + 10;
    this.speed = Math.random() * 3 + 1;
    this.color = this.getRandomColor();
  }

  getRandomColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'black', 'blue', 'purple'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.y -= this.speed;
    // 模拟随着高度增加直径变大
    this.radius += 0.1; 
    if (this.y - this.radius < 0) {
      // 到达一定高度气球破裂
      return false; 
    }
    return true;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

// 气球数组
const balloons = [];
const numBalloons = 20;

for (let i = 0; i < numBalloons; i++) {
  balloons.push(new Balloon());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < balloons.length; i++) {
    if (!balloons[i].update()) {
      balloons.splice(i, 1);
      i--;
    } else {
      balloons[i].draw();
    }
  }
  if (balloons.length > 0) {
    requestAnimationFrame(animate);
  }
}

animate();