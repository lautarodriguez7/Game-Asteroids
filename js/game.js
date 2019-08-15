(function (window, undefined) {
    'use strict'; 
    window.addEventListener('load',init,false);

    var KEY_LEFT = 37;
    var KEY_RIGHT = 39;
    var K1 = 10;
    var K2 = 1.1;
    var K3 = 0.5;

    var canvas = null, ctx = null;
    var lastPress = null;
    var pressing = [];
    var player1 = new Circle(40, 40, 5);
    var player2 = new Circle(40, 100, 5);
    var player3 = new Circle(40, 160, 5);
    var speed1 = 0,
        speed2 = 0,
        speed3 = 0;

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
        ActiveXObject(0.05);
    }


}(window));
