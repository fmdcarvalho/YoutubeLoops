function checkForValidURL(tabId, changeInfo,tab) {
	console.log(tab.url);
	if(tab.url.indexOf('https://www.youtube.com') == 0) {
		chrome.pageAction.show(tabId);
	}
}

chrome.tabs.onUpdated.addListener(checkForValidURL);