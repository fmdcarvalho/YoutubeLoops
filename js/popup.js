function onPageActionClicked() {
	chrome.tabs.query({'active': true,'highlighted':true}, function (tabs) {
		window["url"] = tabs[0].url;
		vidId = getVideoId(window["url"]);
		var newURL = "http://www.youtube.com/v/"+vidId+"?enablejsapi=1&version=3&playerapiid=ytplayer";
		chrome.tabs.query({highlighted: true, active: true}, function (tab) {
      		chrome.tabs.update(tab.id, {url : newURL},function(){
      			console.log('update - tabs: ' + tabs[0]);
				init(tabs[0]);
      		});
		});
	});
}

function init(tab){
	document.getElementById("bt01").addEventListener("click", function(){
		var port = chrome.tabs.connect(tab.id);
		port.postMessage({play: 2});
		port.onMessage.addListener(function(msg) {
		    console.log(response.farewell);
		});
	});
	document.getElementById("btStart").addEventListener("click", function(){
		var port = chrome.tabs.connect(tab.id);
		port.postMessage({play: 1});
		port.onMessage.addListener(function(msg) {
		    console.log(msg.farewell);
		});
	});
}

function getVideoId(url){
	var video_id = url.split('v=')[1];
	var ampersandPosition = video_id.indexOf('&');
	if(ampersandPosition != -1) {
		video_id = video_id.substring(0, ampersandPosition);
	}
	return video_id;
}

$(document).ready(function(){
	$('#btPage').click(onPageActionClicked);
});

