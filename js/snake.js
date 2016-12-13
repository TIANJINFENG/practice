/**
 * Created by dell on 16-12-5.
 */
$(document).ready(function(){
    add_table();
    get_snack();
});
function add_table(){
    var id = 0;
    for(var i = 0;i<20;i++){
        id = add_list(id)
    }
}
function add_list(id){
    var main_map = getElementById("snack");
    var list =  document.createElement('tr');
    for(var j = 0;j<20;j++){
        var block = document.createElement('td')
        block.id = 'lujing'+id;
        block.style.border="0px solid gray";
        block.style.height="20px";
        list.appendChild( block)
        id++;
    }
    main_map.appendChild(list)
    return id;
}
function rand_frog(long){
    var random = Math.floor(Math.random()*300);
    var meat = random_get_meat(long,random);
    console.log(meat)
    return meat;
}

function random_get_meat(long,random){
    if(long.indexOf(random) == -1){
        var lujing = document.getElementById("lujing"+random);
        lujing.style.background = "red";
        return random
    }else{
        var random_meat = refactor_get_meat(long)
        return random_meat
    }
}

function refactor_get_meat(long){
    var random = Math.floor(Math.random()*300);
    var randome_meat = random_get_meat(long,random)
    return randome_meat
}

function get_snack(){
    document.onkeydown = function(e) { //改变蛇方向
        var code = e.keyCode - 37;
        switch(code){
            case 1 : direction = 1;break;//上
            case 2 : direction = 2;break;//右
            case 3 : direction = 3;break;//下
            case 0 : direction = 0;break;//左
        }
    }
    var direction = 2; // 1 向上 2 向右 0 左 3下
    var random = 21
    var snack_long = 5;
    var long = [21];
    var time = 200;
    var meat = rand_frog(long)
    window.setInterval(function(){
        switch(direction){
            case 3:random = random+20;break;
            case 2:random = random+1;break;
            case 0:random = random-1;break;
            case 1:random = random-20;break;
        }
        long.push(random)
        snack_died(long,direction)
        if(long.length > snack_long){
            var went_random = long.shift()
            var went_lujing = document.getElementById("lujing"+went_random)
            went_lujing.style.background = "yellow";
        }
        for(var i=0;i<long.length;i++){
            if(i<long.length-1 && long[long.length-1] == long[i]){
                alert("game over");
                window.location.reload();
            }
            var lujing = document.getElementById("lujing"+long[i]);
            lujing.style.background = "black";
            if(meat == long[i]&& i == long.length-1){
                var lujing = document.getElementById("lujing"+meat);
                lujing.style.background = "yellow";
                snack_long++;
                meat = rand_frog(long)
            }
        }
    }, time)
}

function snack_died(long,direction){
    var snack_head = long[long.length-2]
    if( Math.round(snack_head%20)==0 && direction == 0 ||  Math.round((snack_head+1)%20)==0 && direction == 2){
        alert("game over");
        window.location.reload();
    }
    if(long[long.length-1] < 0 || long[long.length-1]>400){
        alert("game over");
        window.location.reload();
    }
}

function getElementById(id){
    return document.getElementById(id);
}
