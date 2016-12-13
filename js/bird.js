function init() {
    $('.leftBg').css('width',(nowBodyWidth-400)/2+'px');
    $('.rightBg').css('width',(nowBodyWidth-400)/2+'px');
    $('.ground').css('height',nowBodyHeight-600+'px');
    document.onclick = start_move;
    bird_fly();
}

var point = 0;
var g = 1;
var prev_time = 0;
var prev_speed;
var height;
var bird_interval;
var pipe_interval;
var overInterval;
var j = 0;
var nowBodyHeight = $(document.body).height();console.log(nowBodyHeight)
var nowBodyWidth = $(document.body).width();
var bodyWidth = 400;
var birdWidth = 42;
var birdHeight = 32;
var pipeWidth = 100;
var pipeSpace = 200;
var all_height = 558;
var interval;


function bird_fly() {
    var birds = ["../images/0.gif","../images/1.gif","../images/2.gif"];
    bird_interval = setInterval(function() {
        if(j == 3){j = 0;}
        for(var i = 0;i<birds.length;i++){
            if(i == j) {
                $('#bird').attr('src',birds[i]);
                j = j + 1;
                break;
            } else {continue}
        }
    },100);
}

var getHeight = function(obj) {
    return obj.offset().top;
}

function start_move() {
    fly();

    overInterval = setInterval(function() {
        game_over();
    },1)

    pipe_interval = setInterval(function() {
        var pipe_height= 1+Math.random()*300;
        if ($('#up_pipe').css('left') == bodyWidth+'px' && $('#down_pipe').css('left') == bodyWidth+'px') {
            $('#up_pipe').animate({left: -pipeWidth+'px'}, 3500,'linear',function() {
                point = point + 1;
                $('#point').html(point);
                $('#up_pipe').css('left',bodyWidth+'px');
                $('#up_pipe').css('height',pipe_height+'px');
            });
            $('#down_pipe').animate({left: -pipeWidth+'px'}, 3500,'linear',function() {
                $('#down_pipe').css('left',bodyWidth+'px');
                var down_pipe_height = 400-pipe_height;
                $('#down_pipe').css('height',down_pipe_height+'px');
            });
        }
    },100);
}

var displacement = function(v,t) {
    var dispance
    if( v - g*t/2 > 0) {
        dispance = g*t/2 - v
    }else {
        dispance = g*t/40
    }
    return dispance
}

function fly() {
    prev_time = 0;
    prev_speed = 11;
    clearInterval(interval)
    interval = setInterval(function() {
        prev_time += 1
        height = getHeight($('#bird')) + displacement(prev_speed, prev_time);
        $('#bird').css('top',height+'px');
    },10)
}

function game_over() {
    var ux = $('#up_pipe').offset().left;
    var dy = $('#down_pipe').offset().top;
    var bx = $('#bird').offset().left;
    var by = $('#bird').offset().top;

    if((bx > ux && bx < ux+pipeWidth && (by < dy-pipeSpace || by+birdHeight > dy))||
        (bx+birdWidth-10 > ux && bx+birdWidth-10 < ux+pipeWidth && (by < dy-pipeSpace || by+birdHeight >dy))||
        (by > all_height)){
        clearInterval(interval);
        clearInterval(pipe_interval);
        clearInterval(bird_interval);
        clearInterval(overInterval);
        stop_move();
        $('#point').html('GAME OVER!!');
    }
}

function stop_move() {
    $('#up_pipe').stop(true);
    $('#down_pipe').stop(true);
}
