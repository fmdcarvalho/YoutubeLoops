var first = true;
var time = 0;
var time2 = 0;
var player;

var div1;
var div2;
var div3;

var isActiveTab = true;



chrome.runtime.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
		if (msg.play == 1){	
			onEvent();
			console.log("log1");
			port.postMessage({farewell:'yay'});
		}
		else if(msg.play == 2){
			onC();
			console.log("log1");
			port.postMessage({farewell:'loop'});
		}
		else
			port.postMessage({farewell:'oh:('}); // snub them.
	});
});

function onEvent(){
	console.log('startup');
	a = document.createElement('DIV');
	a.id = 'one';
	b = document.createElement('DIV');
	b.id = 'two';
	c = document.createElement('DIV');
	c.id = 'time';
	document.body.appendChild(a);
	document.body.appendChild(b);
	document.body.appendChild(c);
	player = document.getElementsByName("plugin")[0];
	div1  = document.getElementById("one");
	div2  = document.getElementById("two");
	div3  = document.getElementById("time");
	player.playVideo();
	window.addEventListener('blur', function() {
	    isActiveTab = false;
	}, false);
	window.addEventListener('focus', function() {
	    isActiveTab = true;
	}, false);
}

var onC = function(){
    if(first) {
        first = !first;
        time = time2 = player.getCurrentTime();
        div1.innerHTML ="time 1: "+time;
    }else{
        time2 = player.getCurrentTime();
        window.requestAnimationFrame(loop);
        div2.innerHTML ="time 2: "+time2;
    }
}

var loop = function(){
    div3.innerHTML ="curTime: "+player.getCurrentTime();
    if(player.getCurrentTime() >= time2){
        player.seekTo(time);
    }
    if (isActiveTab) {
        window.requestAnimationFrame(loop);
    } else {
        setTimeout(loop, 16); 
    }
}
