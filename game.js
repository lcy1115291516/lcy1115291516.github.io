window.addEventListener('load', function () {
    var btn = document.querySelector(".btn");
    var main = document.querySelector('.main')
    btn.addEventListener("click", function () {
        btn.style.display = 'none';
        main.style.display = 'block';
        gameStart();

    })

})

function gameStart() {
    var plane = document.querySelector('.plane');
    var bullet = document.querySelector('.bullet');
    var score = 0;
    var strong = 0;
    var bulletnum = 0;
    var moveArr = [0, 0, 0, 0];
    var stronger = document.querySelector('.stronger');
    var enemy = document.querySelector('.enemy');
    var p = document.querySelector('p');
    var special = document.querySelector('.special');
    function x_random() {
        return Math.floor(Math.random() * (700) + 100);
    }
    //键盘操作
    document.addEventListener('keydown', addMoveArr);
    document.addEventListener('keyup', removeMoveArr);
    setInterval(move, 5);
    function move() {
        if (moveArr[0] == 1) {
            plane.style.top = plane.offsetTop - 2 + 'px';
            if (plane.offsetTop < 30) {
                plane.style.top = 30 + 'px';
            }
        }
        if (moveArr[1] == 1) {
            if (plane.offsetTop > 600) {
                plane.style.top = 600 + 'px';
            }
            plane.style.top = plane.offsetTop + 2 + 'px';
        }
        if (moveArr[2] == 1) {
            if (plane.offsetLeft < 70) {
                plane.style.left = 70 + 'px';
            }
            plane.style.left = plane.offsetLeft - 2 + 'px';
        }
        if (moveArr[3] == 1) {
            if (plane.offsetLeft > 800) {
                plane.style.left = 800 + 'px';
            }
            plane.style.left = plane.offsetLeft + 2 + 'px';
        }
    }
    function addMoveArr(e) {
        if (e.keyCode === 87 || e.keyCode == 38 && moveArr[0] == 0) {
            moveArr[0] = 1;
        }
        if (e.keyCode === 83 || e.keyCode == 40 && moveArr[1] == 0) {
            moveArr[1] = 1;
        }
        if (e.keyCode === 65 || e.keyCode == 37 && moveArr[2] == 0) {
            moveArr[2] = 1;
        }
        if (e.keyCode === 68 || e.keyCode == 39 && moveArr[3] == 0) {
            moveArr[3] = 1;
        }
    }
    function removeMoveArr(e) {
        if (e.keyCode === 87 || e.keyCode == 38 && moveArr[0] == 1) {
            moveArr[0] = 0;
        }
        if (e.keyCode === 83 || e.keyCode == 40 && moveArr[1] == 1) {
            moveArr[1] = 0;
        }
        if (e.keyCode === 65 || e.keyCode == 37 && moveArr[2] == 1) {
            moveArr[2] = 0;
        }
        if (e.keyCode === 68 || e.keyCode == 39 && moveArr[3] == 1) {
            moveArr[3] = 0;
        }
    }
    //生成道具
    setInterval(function () {
        var strongerli = document.createElement('li');
        strongerli.style.left = x_random() + 'px';
        strongerli.style.top = 20 + 'px';
        stronger.appendChild(strongerli);
    }, 10000);
    // 道具移动
    // objMove(stronger, 4, 0, 20, 1)
    setInterval(function () {
        for (var i = 0; i < stronger.children.length; i++) {
            stronger.children[i].style.top = stronger.children[i].offsetTop + 4 + 'px';
            if (stronger.children[i].offsetTop > 600) {
                stronger.removeChild(stronger.children[i]);
            }
        }
    }, 20);
    // 吃到道具
    setInterval(function () {
        for (var i = 0; i < stronger.children.length; i++) {
            if (Math.abs(stronger.children[i].offsetTop - plane.offsetTop) < 20 && Math.abs(stronger.children[i].offsetLeft - plane.offsetLeft) < 30) {
                stronger.removeChild(stronger.children[i]);
                strong = 1;
                bulletnum += 40;
            }
        }
    }, 200);
    // 生成子弹
    setInterval(function () {
        var li = document.createElement('li');
        li.style.left = plane.offsetLeft + 'px';
        li.style.top = plane.offsetTop + 'px';
        bullet.appendChild(li);
        if (strong == 1) {
            var lil = document.createElement('li');
            var lir = document.createElement('li');
            lil.style.left = plane.offsetLeft + 'px';
            lil.style.top = plane.offsetTop + 'px';
            lir.style.left = plane.offsetLeft + 'px';
            lir.style.top = plane.offsetTop + 'px';
            lil.className = 'l';
            lir.className = 'r';
            bullet.appendChild(lil);
            bullet.appendChild(lir);
        }
        if (strong == 1) {
            bulletnum--;
        }
        if (bulletnum == 0) {
            strong = 0;
        }
        special.innerHTML = '特殊子弹剩余' + bulletnum + '颗';
    }, 300);
    //子弹纵向移动
    // objMove(bullet, -2, 0, 5, 1)
    setInterval(function () {
        for (var i = 0; i < bullet.children.length; i++) {
            bullet.children[i].style.top = bullet.children[i].offsetTop - 2 + 'px';
            if (bullet.children[i].offsetTop < 0) {
                bullet.removeChild(bullet.children[i]);
            }
        }
    }, 5);
    // 子弹横向移动
    // var bulletl;
    // var bulletr;
    setInterval(function () {
        var bulletl = document.querySelectorAll('.l');
        var bulletr = document.querySelectorAll('.r');
        for (var i = 0; i < bulletl.length; i++) {
            bulletl[i].style.left = bulletl[i].offsetLeft - 4 + 'px';
        }
        for (var j = 0; j < bulletr.length; j++) {
            bulletr[j].style.left = bulletr[j].offsetLeft + 4 + 'px';
        }
    }, 10);
    //生成敌人随机位置
    var enemyPlace = setInterval(enemyPlaceFn, 300 - score / 2);
    function enemyPlaceFn() {
        var li = document.createElement('li');
        li.style.left = x_random() + 'px';
        li.style.top = 20 + 'px';
        enemy.appendChild(li);
        for (var i = 0; i < enemy.children.length; i++) {
            enemy.children[i].style.top = enemy.children[i].offsetTop + 2 + 'px';
        }
        clearInterval(enemyPlace);
        enemyPlace = setInterval(enemyPlaceFn, 300 - score / 2);
    }
    //敌人移动
    var enemySpeed = setInterval(enemySpeedFn, 15 - score / 25);
    function enemySpeedFn() {
        for (var i = 0; i < enemy.children.length; i++) {
            enemy.children[i].style.top = enemy.children[i].offsetTop + 4 + 'px';
            if (enemy.children[i].offsetTop > 600) {
                enemy.removeChild(enemy.children[i]);
            }
        }
        clearInterval(enemySpeed);
        enemySpeed = setInterval(enemySpeedFn, 15 - score / 25);
    }
    //计分及失败
    setInterval(function () {
        for (var i = 0; i < enemy.children.length; i++) {
            if (score < 100) {
                p.innerHTML = '加油!您当前' + score + '分';
            }
            else if (score < 200) {
                p.innerHTML = '还行!您当前' + score + '分';
            }
            else if (score < 400) {
                p.innerHTML = '可以啊!您当前' + score + '分';
            }
            else {
                p.innerHTML = '牛逼啊!您当前' + score + '分';
            }
            for (var j = 0; j < bullet.children.length; j++) {
                if (Math.abs(enemy.children[i].offsetTop - bullet.children[j].offsetTop) < 20 && Math.abs(enemy.children[i].offsetLeft - bullet.children[j].offsetLeft) < 20) {
                    score++;
                    bullet.children[j].style.display = 'none';
                    enemy.removeChild(enemy.children[i]);
                    bullet.removeChild(bullet.children[j]);
                }
            }
            if (Math.abs(enemy.children[i].offsetTop - plane.offsetTop) < 20 && Math.abs(enemy.children[i].offsetLeft - plane.offsetLeft) < 30) {
                enemy.removeChild(enemy.children[i]);
                clearInterval(move);
                setTimeout(function () {
                    plane.style.backgroundImage = 'url(./images/plane2.png)';
                }, 400);
                setTimeout(function () {
                    plane.style.backgroundImage = 'url(./images/plane3.png)';
                }, 800);
                setTimeout(function () {
                    plane.style.backgroundImage = 'url(./images/plane4.png)';
                }, 1200);
                setTimeout(function () {
                    plane.style.backgroundImage = 'url(./images/plane5.png)';
                }, 1600);
                setTimeout(function () {
                    alert('您输了,得分为' + score + '分\n按回车重新开始');
                    location.reload();
                }, 2000);
            }
        }
    }, 50);
}
