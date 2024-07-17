let isPopupOpen = false;

chrome.runtime.onInstalled.addListener(() => {
	console.log("Input Standard Saver Extension Installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "openSavePopup" && !isPopupOpen) {
		isPopupOpen = true;
		const popupUrl = chrome.runtime.getURL(`save_popup.html?page=${encodeURIComponent(request.page)}`);
		chrome.windows.create({
			url: popupUrl,
			type: "popup",
			width: 400,
			height: 600
		}, (window) => {
			chrome.windows.onRemoved.addListener(function listener(windowId) {
				if (windowId === window.id) {
					isPopupOpen = false;
					chrome.windows.onRemoved.removeListener(listener);
				}
			});
		});
	}
});
