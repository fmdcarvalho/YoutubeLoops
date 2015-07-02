function init(tab){
	document.getElementById("bt01").addEventListener("click", function(){
		var port = chrome.tabs.connect(tab.id);
		port.postMessage({play: 2});
		port.onMessage.addListener(function(msg) {
		    console.log(msg.farewell);
		});
	});
	document.getElementById("btStart").addEventListener("click", function(){
		var port = chrome.tabs.connect(tab.id);
		port.postMessage({play: 1});
		port.onMessage.addListener(function(msg) {
		    console.log(msg.farewell);
		});
	});
	document.getElementById("btNudgeLeft1").addEventListener("click", function(){
		var port = chrome.tabs.connect(tab.id);
		port.postMessage({play: 3,offset:-0.16,time:1});
		port.onMessage.addListener(function(msg) {
		    console.log(msg.farewell);
		});
	});
	document.getElementById("btNudgeRight1").addEventListener("click", function(){
		var port = chrome.tabs.connect(tab.id);
		port.postMessage({play: 3,offset:0.16,time:1});
		port.onMessage.addListener(function(msg) {
		    console.log(msg.farewell);
		});
	});
	document.getElementById("btNudgeLeft2").addEventListener("click", function(){
		var port = chrome.tabs.connect(tab.id);
		port.postMessage({play: 3,offset:-0.16,time:2});
		port.onMessage.addListener(function(msg) {
		    console.log(msg.farewell);
		});
	});
	document.getElementById("btNudgeRight2").addEventListener("click", function(){
		var port = chrome.tabs.connect(tab.id);
		port.postMessage({play: 3,offset:0.16,time:2});
		port.onMessage.addListener(function(msg) {
		    console.log(msg.farewell);
		});
	});
}

function changeToFlashPlayer(){

	vidId = getVideoId(window["currentTab"].url);
	var newURL = "http://www.youtube.com/v/"+vidId+"?enablejsapi=1&version=3&playerapiid=ytplayer";
	chrome.tabs.query({highlighted: true, active: true}, function (tab) {
  		chrome.tabs.update(tab.id, {url : newURL},function(){
  			console.log('update - tabs: ' + tabs[0]);
			
  		});
	});
}

function disablePageChange(){
	document.getElementById("btPage").disabled = true;
}

function disableControlButtons(){
	document.getElementById("bt01").disabled = true;
	document.getElementById("btStart").disabled = true;
	document.getElementById("btNudgeLeft1").disabled = true;
	document.getElementById("btNudgeRight1").disabled = true;
	document.getElementById("btNudgeLeft2").disabled = true;
	document.getElementById("btNudgeRight2").disabled = true;
}

function getVideoId(url){
	var video_id = url.split('v=')[1];
	var ampersandPosition = video_id.indexOf('&');
	if(ampersandPosition != -1) {
		video_id = video_id.substring(0, ampersandPosition);
	}
	return video_id;
}

function isYoutubePage(url){
	return url && url.indexOf('youtube') > 0;
}

function isYoutubeJSAPICall(url){
	return url && url.indexOf('enablejsapi=1') > 0;
}

$(document).ready(function(){
	chrome.tabs.query({'active': true,'highlighted':true}, function (tabs) {
		window["currentTab"] = tabs[0];
		url = tabs[0].url;

		if(isYoutubePage(url)){
			console.log("isyoutube");
			console.log("isYoutubeJSAPICall = " + isYoutubeJSAPICall(url) );
			if(isYoutubeJSAPICall(url)){
				disablePageChange();
				console.log("isjsapicall", window["currentTab"]);
				init(window["currentTab"]);
			}else {
				console.log("!isjsapicall");
				disableControlButtons();
			}
			document.getElementById("btPage").addEventListener("click", function(){
				changeToFlashPlayer();
			});
		}
		else {
			disablePageChange();
			disableControlButtons();
		}
	});
});

