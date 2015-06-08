function showPageAction(tabId, changeInfo,tab) {
	chrome.pageAction.show(tabId);
}
chrome.tabs.onUpdated.addListener(showPageAction);
