var chickenContainer=document.querySelector('.chickenContainer')
for(var x=0;x<60;x++){
    var chicken=document.createElement('img')
    chicken.setAttribute('class','chicken')
    chicken.src="Chicken.png"
    chickenContainer.append(chicken)
}
var rocket=document.querySelector('.rocket')
var yaxis=0
var xaxis=0
window.addEventListener('keydown',function(e){
    if(e.code ==='ArrowUp'){
        yaxis+=10
        rocket.style.bottom =yaxis +'px'
    }
    else if(e.code==='ArrowDown'){
        yaxis-=10
        rocket.style.bottom=yaxis+'px'
        if(yaxis<=0){
            yaxis=0
        }
    }
    else if(e.code==='ArrowLeft'){
        xaxis-=10
        rocket.style.left=xaxis +'px'
        if(xaxis<=0){
            xaxis=0
        }
    }
    else if(e.code==='ArrowRight'){
        xaxis+=10
        rocket.style.left=xaxis +'px'
    }
    if(e.code==='Space'){
        var bullet=document.createElement('img')
        bullet.classList.add('bullet')
        bullet.src="Bullet.png"
        rocket.append(bullet)
        var bulletposition=0
        var bulletinterval=setInterval(function(){
            bulletposition+=10
            bullet.style.bottom=bulletposition+'px'
            if(bulletposition>1000){
                clearInterval(bulletinterval)
                rocket.removeChild(bullet)
            }
        },10)
    }
})