/**
 * Created by chenyu on 16/10/28.
 */

var timer;
function init() {
    setPageInit();
    for (var i = 0; i < 4; i++) {
        addList(i);
    }
    addClickEvent();
}

function setPageInit() {
    getElementById("main").innerHTML = "";
    getElementById("fail").style.display = "none";
    getElementById("datetime").innerText = "0.00" + '"';
    getElementById("main").style.height = document.body.scrollHeight + "px";
}

function addClickEvent() {
    var height = document.body.scrollHeight;
    getElementById("main").onclick = function (data) {
        if ((height / 2) < data.clientY && data.clientY < height * 0.75) {
            if (localStorage.getItem("start") == "开始") {
                startAfter(data);
            }
            firstClickStart(data);
        }
    };
}

function firstClickStart(data) {
    if (data.target.innerText == "开始") {
        setAfterClick(data);
        timer = setInterval(time, 10);
        data.target.innerText = "";
        localStorage.setItem("start", "开始");
    }
}

function startAfter(data) {
    if (data.target.className.indexOf("black") != -1) {
        setAfterClick(data);
    } else {
        clearInterval(timer);
        getElementById("failTime").innerText = getElementById("datetime").innerText;
        localStorage.removeItem("start");
        fail(data);
    }
}

function fail(data) {
    data.target.style.background = 'red';
    setTimeout(function () {
        data.target.style.background = '#fff';
        getElementById("fail").style.display = "block";
    }, 200);

}

function setAfterClick(data) {
    data.target.style.background = "gray";
    score();
    setTimeout(function () {
        getElementById("main").removeChild(document.getElementsByTagName("tr").item(3));
        addList();
    }, 10)

}

function getElementById(id) {
    return document.getElementById(id)
}

function addList(index) {
    var main = getElementById("main");
    var list = document.createElement("tr");
    main.appendChild(list);
    var randomNum = Math.floor(Math.random() * 4);
    for (var i = 0; i < 4; i++) {
        list.appendChild(addBlock(index, i, randomNum));
    }
    checkFirstChild(main, list)
}

function addBlock(index, i, randomNum) {
    var block = document.createElement("td");
    block.className = "block";
    if (index == 0) {
        block.className += " yellow"
    }
    if (i == randomNum) {
        block.className += " black";
        if (index == 1) {
            block.innerText = "开始";
            //block.style.font-size = 2px;
            block.className += " startText"
        }
    }
    return block
}

function checkFirstChild(main, list) {
    if (main.firstChild == null) {
        main.appendChild(list);
    } else {
        main.insertBefore(list, main.firstChild)
    }
}

function checkNum(data) {
    if (data <= 0) {
        return "00"
    }
    return data < 10 ? "0" + data : JSON.stringify(data);
}

function score() {
    getElementById('score').innerHTML = parseInt(getElementById('score').innerHTML) + 1;
}

var t = 0;
function time() {
    t++;
    var secNum = parseInt(t / 100);
    var minNum = parseInt(t / 6000);
    var sec = secNum >= 60 ? checkNum(secNum - (60 * minNum)) : secNum;
    var min = minNum != 0 ? minNum + "." : "";
    getElementById('datetime').innerText = min + sec + '.' + checkNum(t).substr(-2) + '"';
}

init();