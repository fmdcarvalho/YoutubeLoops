var urlPattern = '/youtube/i'

function checkForValidURL(tabId, changeInfo,tab) {
	//debug
	//console.log(tab.url);
	//TODO change to a suitable regex
	if(tab.url.test(urlPattern)) {
		chrome.pageAction.show(tabId);
	}
}

chrome.tabs.onUpdated.addListener(checkForValidURL);