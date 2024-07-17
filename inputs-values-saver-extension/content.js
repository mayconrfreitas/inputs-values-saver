chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "showSavePopup") {
		showSavePopup();
	} else if (request.action === "fill") {
		fillStandardValues();
	}
});

function showSavePopup() {
	const inputs = document.querySelectorAll("input, textarea, select");
	const inputValues = {};

	inputs.forEach((input) => {
		inputValues[input.name || input.id] = input.value;
	});

	chrome.storage.local.set({ tempInputValues: inputValues }, () => {
		const currentPage = window.location.href;
		chrome.runtime.sendMessage({ action: "openSavePopup", page: currentPage });
	});
}

function fillStandardValues() {
	const currentPage = window.location.href;

	chrome.storage.local.get([currentPage], (result) => {
		const inputValues = result[currentPage];
		if (inputValues) {
			const inputs = document.querySelectorAll("input, textarea, select");

			inputs.forEach((input) => {
				const value = inputValues[input.name || input.id];
				if (value !== undefined) {
					input.value = value;
				}
			});
		}
	});
}
