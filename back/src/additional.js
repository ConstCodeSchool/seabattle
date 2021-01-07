const alphabet =
	"0123456789qazxswedcvfrtgbnhyujmkioplQAZXSWEDCVFRTGBNHYUJMKIOPL";

module.exports.getRandomString = function getRandomString(size = 10) {
	let string = "";

	while (string.length < size) {
		string += alphabet[Math.floor(Math.random() * alphabet.length)];
	}

	return string;
};
