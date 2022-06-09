const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: null, y: null, radius: 100
}
const handleMosueMove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}
window.addEventListener("mousemove", handleMosueMove)


// draw text in canavs 
ctx.color = 'white';
ctx.font = '30px Rubik';
ctx.fillText('zakaria', 0, 30);


class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.density = Math.random() * 30 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
    }
    update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        const forseDirectionX = dx / distance;
        const forseDirectionY = dy / distance;
        const forse = 1 - mouse.radius / distance;
        const directionX = forseDirectionX * forse * this.density;
        const directionY = forseDirectionY * forse * this.density;
        if (distance <= mouse.radius) {
            this.x += directionX;
            this.y += directionY;
        } else {
            if (this.x != this.baseX) {
                this.x += (this.baseX - this.x) / this.density;
            }
            if (this.y != this.baseY) {
                this.y += (this.baseY - this.y) / this.density;
            }
        }
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = 'yellow';
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}


const arrayOfParticles = [];
const NUMBER_OF_PARTICLES = 1000;

const init = () => {
    const textCordinates = ctx.getImageData(0, 0, 150, 150);
    for (let y = 0; y < textCordinates.height; y++) {
        for (let x = 0; x < textCordinates.width; x++) {
            const i = (y * 4 * textCordinates.width) + (x * 4) + 3;
            if (textCordinates.data[i] > 128) {
                arrayOfParticles.push(new Particle(x * 12, y * 12));
            }
        }
    }
}


const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of arrayOfParticles) {
        p.update();
        p.draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();