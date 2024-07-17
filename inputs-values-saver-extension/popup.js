document.getElementById("save-btn").addEventListener("click", () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.scripting.executeScript({
			target: { tabId: tabs[0].id },
			files: ["content.js"],
		}, () => {
			chrome.tabs.sendMessage(tabs[0].id, { action: "showSavePopup" });
		});
	});
});

document.getElementById("fill-btn").addEventListener("click", () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.scripting.executeScript({
			target: { tabId: tabs[0].id },
			files: ["content.js"],
		}, () => {
			chrome.tabs.sendMessage(tabs[0].id, { action: "fill" });
		});
	});
});
