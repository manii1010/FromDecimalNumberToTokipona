// DOM要素の取得
const $ = selector => document.querySelector(selector);
const DOM = {
	inputField: $("#input-field"),
	resultField: $("#result-field")
};

// トキポナの数字に変換
function convertToTokiponaNumber() {
	const number = Math.floor(parseFloat(DOM.inputField.value)); // 小数点はなしで行く
	const MAX = 9999999999;

	if (isNaN(number) || number < 1) {
		DOM.resultField.textContent = "";
		return;
	}

	if (number > MAX) {
		DOM.resultField.textContent = `上限は ${MAX} までです`;
		return;
	}

	const text = toTokipona(number);
	DOM.resultField.textContent = text;
}

// トキポナ数字変換処理（再帰関数）
function toTokipona(number) {
	let text = "";

	const units = [
		{ value: 100, word: "ale" },
		{ value: 20,  word: "mute" },
		{ value: 5,   word: "luka" },
		{ value: 2,   word: "tu" },
		{ value: 1,   word: "wan" }
	];

	for (const unit of units) {
		const count = Math.floor(number / unit.value);
		if (count > 0) {
			text += (count > 1 ? toTokipona(count) + " " : "") + unit.word + " ";
			number %= unit.value;
		}
	}

	return text.trim();
}

// イベントハンドラー
DOM.inputField.addEventListener("input", convertToTokiponaNumber);
