document.addEventListener("DOMContentLoaded", () => {
	chrome.storage.local.get(["tempInputValues"], (result) => {
		const inputValues = result.tempInputValues;
		const form = document.getElementById("input-form");

		for (const [name, value] of Object.entries(inputValues)) {
			const label = document.createElement("label");
			label.innerText = name;
			label.classList.add("input-label");
			const input = document.createElement("input");
			input.type = "text";
			input.name = name;
			input.value = value;
			input.classList.add("input-field");
			form.appendChild(label);
			form.appendChild(input);
		}
	});

	document.getElementById("save-btn").addEventListener("click", () => {
		const formData = new FormData(document.getElementById("input-form"));
		const updatedValues = {};
		formData.forEach((value, key) => {
			updatedValues[key] = value;
		});

		const currentPage = new URLSearchParams(window.location.search).get("page");
		if (currentPage) {
			chrome.storage.local.set({ [currentPage]: updatedValues }, () => {
				window.close();
			});
		}
	});
});
