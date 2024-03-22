var cursor = {
    x: 0,
    y: 0
};
var dragobj = null, h1, i1, oLeft, oTop;

function rel(ob) {
    if (ob) {
        return document.getElementById(ob)
    } else {
        return null
    }
}

function gTxt(ob, txt) {
    rel(ob).innerHTML = txt;
}

function makeObjectToDrag(obj) {
    if (obj) {
        dragobj = rel(obj.id);
        document.onmousedown = startMove;
        document.onmouseup = drop;
        document.onmousemove = moving;
    }
}

function startMove(e) {
    if (dragobj) {
        getCursorPos(e);
        dragobj.className = "moving dot";
        i1 = cursor.x - dragobj.offsetLeft;
        h1 = cursor.y - dragobj.offsetTop;
    }
}

function drop() {

    const dot1 = document.getElementById("dot1");
    const dot2 = document.getElementById("dot2");  
    const dot3 = document.getElementById("dot3");
    const dot4 = document.getElementById("dot4");
    const dot5 = document.getElementById("dot5");

    const dots = [dot1,dot2,dot3,dot4,dot5];

    for (var i =0; i < 5; i++){
        if (isCollide(dragobj,dots[i])){
            if ($(dragobj).attr('id') != $(dots[i]).attr('id')){
                dots[i].style.backgroundColor = "#bae0ff";
            }
            
        }    
    }
    if (dragobj) {
        dragobj.className = "move dot";
        dragobj = null;
    }

}

function getCursorPos(e) {
    e = e || window.event;
    if (e.pageX || e.pageY) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
    } else {
        var de = document.documentElement;
        var db = document.body;
        cursor.x = e.clientX +
            (de.scrollLeft || db.scrollLeft) - (de.clientLeft || 0);
        cursor.y = e.clientY +
            (de.scrollTop || db.scrollTop) - (de.clientTop || 0);
    }
    return cursor;
}

function moving(e) {
    getCursorPos(e);
    if (dragobj) {
        oLeft = cursor.x - i1;
        oTop = cursor.y - h1;
        dragobj.style.left = oLeft + 'px';
        dragobj.style.top = oTop + 'px';
    }
}



function isCollide(a, b) {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();

    return !(
        ((aRect.top + aRect.height) < (bRect.top)) ||
        (aRect.top > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width) < bRect.left) ||
        (aRect.left > (bRect.left + bRect.width))
    );
}
