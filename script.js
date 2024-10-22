var chickenContainer = document.querySelector('.chickenContainer');
var rocket = document.querySelector('.rocket');
var yaxis = 0;
var xaxis = 0;

// Generate 60 chickens with random positions
for (var x = 0; x < 60; x++) {
    var chicken = document.createElement('img');
    chicken.setAttribute('class', 'chicken');
    chicken.src = "Chicken.png";
    chicken.style.position = 'absolute';
    chicken.style.left = Math.random() * 800 + 'px';
    chicken.style.top = Math.random() * 300 + 'px';
    chicken.dataset.direction = 'right'; // Track direction (left or right)
    chickenContainer.append(chicken);
}

// Move chickens smoothly (left to right)
function moveChickens() {
    const chickens = document.querySelectorAll('.chicken');
    chickens.forEach(chicken => {
        let currentLeft = parseFloat(chicken.style.left);
        let direction = chicken.dataset.direction;

        if (direction === 'right') {
            chicken.style.left = (currentLeft + 1) + 'px';
            if (currentLeft >= window.innerWidth - 50) {
                chicken.dataset.direction = 'left';
            }
        } else {
            chicken.style.left = (currentLeft - 1) + 'px';
            if (currentLeft <= 0) {
                chicken.dataset.direction = 'right';
            }
        }
    });
    requestAnimationFrame(moveChickens);
}

// Start chicken movement
moveChickens();

// Move the rocket based on pressed keys
window.addEventListener('keydown', function (e) {
    if (e.code === 'ArrowUp') {
        yaxis = Math.min(yaxis + 10, window.innerHeight - 100);
        rocket.style.bottom = yaxis + 'px';
    } else if (e.code === 'ArrowDown') {
        yaxis = Math.max(yaxis - 10, 0);
        rocket.style.bottom = yaxis + 'px';
    } else if (e.code === 'ArrowLeft') {
        xaxis = Math.max(xaxis - 10, 0);
        rocket.style.left = xaxis + 'px';
    } else if (e.code === 'ArrowRight') {
        xaxis = Math.min(xaxis + 10, window.innerWidth - 100);
        rocket.style.left = xaxis + 'px';
    }
});

// Shoot bullets with Space key without stopping movement
window.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        shootBullet();
    }
});

// Function to shoot a bullet
function shootBullet() {
    var bullet = document.createElement('img');
    bullet.classList.add('bullet');
    bullet.src = "Bullet.png";
    bullet.style.position = 'absolute';
    bullet.style.left = (xaxis + 25) + 'px'; // Align with the rocket
    bullet.style.bottom = (yaxis + 50) + 'px';
    document.body.append(bullet);

    function moveBullet() {
        let bulletPosition = parseFloat(bullet.style.bottom);
        bullet.style.bottom = (bulletPosition + 10) + 'px';

        // Check for collision with chickens
        var chickens = document.querySelectorAll('.chicken');
        chickens.forEach(function (chicken) {
            if (isCollision(bullet, chicken)) {
                chickenContainer.removeChild(chicken); // Remove chicken
                bullet.remove(); // Remove bullet
            }
        });

        // Remove bullet if it goes off-screen
        if (bulletPosition > window.innerHeight) {
            bullet.remove();
        } else {
            requestAnimationFrame(moveBullet); // Smooth bullet movement
        }
    }
    moveBullet();
}

// Collision detection function
function isCollision(bullet, chicken) {
    var bulletRect = bullet.getBoundingClientRect();
    var chickenRect = chicken.getBoundingClientRect();

    return !(
        bulletRect.top > chickenRect.bottom ||
        bulletRect.bottom < chickenRect.top ||
        bulletRect.right < chickenRect.left ||
        bulletRect.left > chickenRect.right
    );
}
