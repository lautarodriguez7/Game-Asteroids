(function (window, undefined) {
    'use strict'; 
    window.addEventListener('load',init,false);

    var KEY_SPACE = 32;
    var KEY_LEFT = 37;
    var KEY_RIGHT = 39;
    var K1 = 10;
    var K2 = 1.1;
    var K3 = 0.5;

    var canvas = null, ctx = null;
    var lastPress = null;
    var pressing = [];
    var player = new circle(150, 100, 5);
    var player1 = new Circle(40, 40, 5);
    var player2 = new Circle(40, 100, 5);
    var player3 = new Circle(40, 160, 5);
    var speed1 = 0,
        speed2 = 0,
        speed3 = 0;
    
    var iShip = new Image();
    iShip.src = 'assets/ship.png';

    function init() {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 200;

        run();
        repaint();
    }
    
    function run() {
        setTimeout(run, 50);
        act(0.05);
    }

    function repaint() {
        requestAnimationFrame(repaint);
        paint(ctx);
    }

    function act(deltaTime) {
        //Move Rect
        speed1 = 0;
        if (pressing[KEY_RIGHT]) {
            player.rotation += 10;
            speed1 += K1;
            speed2 += K2;
            if (speed3 < 10)
                speed3 += K3;
        }
        else {
            if (speed3 > 0)
                speed3 -=K3;
        }
        if (pressing[KEY_LEFT]) {
            player.rotation -= 10;
            speed1 -= K1;
            speed2 -= K2;
            if (speed3 > -10)
                speed3 -= K3;
        }
        else {
            if (speed3 < 0)
                speed3 += K3; 
        }
        speed2 *= 0.9;

        player1.x += speed1;
        player2.x += speed2;
        player3.x += speed3; 

        // Out Screen
        if(player1.x > canvas.width)
            player1.x = 0;
        if(player1.x < 0)
            player1.x = canvas.width;
        if(player2.x > canvas.width)
            player2.x = 0;
        if(player2.x < 0)
            player2.x = canvas.width;
        if(player3.x > canvas.width)
            player3.x = 0;
        if(player3.x < 0)
            player3.x = canvas.width;
    }

    function paint(ctx) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#0f0';
        player1.stroke(ctx);
        player2.stroke(ctx);
        player3.stroke(ctx);

        ctx.strokeStyle = '#0f0';
        player1.drawImage(ctx, iShip);

        ctx.fillStyle = '#fff';
        //ctx.fillText('Last Press: '+lastPress, 0, 20);
        ctx.fillText('Speed1: '+speed1, 0, 10);
        ctx.fillText('Speed2: '+speed2, 100, 10);
        ctx.fillText('Speed3: '+speed3, 0, 20);

        ctx.fillStyle = '#fff';
        ctx.fillText('Rotation: ' +player.rotation, 0, 20);

        if(pressing[KEY_SPACE])
            player.stroke(ctx);
    }

    document.addEventListener('keydown',function(evt){
        lastPress=evt.keyCode;
        pressing[evt.keyCode]=true;
    },false);

    document.addEventListener('keyup',function(evt){
        pressing[evt.keyCode]=false;
    },false);

    function Circle(x, y, radius) {
        this.x (x == null) ?0 : x;
        this.y = (y == null) ?0 : y;
        this.radius = (radius == null) ?0 : radius;
        this.scale = 1;
        this.rotation = 0;
    }

    Circle.prototype.drawImage=function(ctx,img){
        if(img.width){
            ctx.save();
            ctx.translate(this.x,this.y);
            ctx.scale(this.scale,this.scale);
            ctx.rotate(this.rotation*Math.PI/180);
            ctx.drawImage(img,-img.width/2,-img.height/2);
            ctx.restore();
        }
        else
            this.stroke(ctx);
    }

    Circle.prototype.distance = function (circle) {
        if (circle != null) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI*2, true);
            ctx.stroke();
        }
    }

    window.requestAnimationFrame=(function(){
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback){window.setTimeout(callback,17);};
        })();
    })();
