function checkForValidURL(tabId, changeInfo,tab) {
	//debug
	console.log(tab.url);
	//TODO change to a suitable regex
	if(tab.url.indexOf('https://www.youtube.com') == 0) {
		chrome.pageAction.show(tabId);
	}
}

chrome.tabs.onUpdated.addListener(checkForValidURL);