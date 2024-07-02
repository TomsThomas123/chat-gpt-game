const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 20,
    color: 'white',
    speed: 5
};

const bullets = [];
const targets = [];

function drawPlayer() {
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.size, player.size);
}

function drawBullets() {
    bullets.forEach(bullet => {
        context.fillStyle = bullet.color;
        context.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);
    });
}

function drawTargets() {
    targets.forEach(target => {
        context.fillStyle = target.color;
        context.fillRect(target.x, target.y, target.size, target.size);
    });
}

function movePlayer() {
    if (keys['ArrowUp']) player.y -= player.speed;
    if (keys['ArrowDown']) player.y += player.speed;
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;
}

function moveBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        if (bullet.y < 0) bullets.splice(index, 1);
    });
}

function spawnTarget() {
    const size = Math.random() * 20 + 10;
    const target = {
        x: Math.random() * (canvas.width - size),
        y: Math.random() * (canvas.height - size),
        size: size,
        color: 'red'
    };
    targets.push(target);
}

function checkCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        targets.forEach((target, targetIndex) => {
            if (bullet.x < target.x + target.size &&
                bullet.x + bullet.size > target.x &&
                bullet.y < target.y + target.size &&
                bullet.y + bullet.size > target.y) {
                bullets.splice(bulletIndex, 1);
                targets.splice(targetIndex, 1);
            }
        });
    });
}

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    movePlayer();
    moveBullets();
    checkCollisions();
    drawPlayer();
    drawBullets();
    drawTargets();
    requestAnimationFrame(update);
}

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

document.addEventListener('click', (e) => {
    const bullet = {
        x: player.x + player.size / 2 - 2.5,
        y: player.y,
        size: 5,
        color: 'yellow',
        speed: 10
    };
    bullets.push(bullet);
});

let keys = {};
setInterval(spawnTarget, 2000);
update();
