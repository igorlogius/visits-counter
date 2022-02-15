
function shortTextForNumber (number) {
	if (number < 1000) {
		return number.toString()
	} else if (number < 100000) {
		return Math.floor(number / 1000)
			.toString() + "k"
	} else if (number < 1000000) {
		return Math.floor(number / 100000)
			.toString() + "hk"
	} else {
		return Math.floor(number / 1000000)
			.toString() + "m"
	}
}



function getIconImageData(rank) {
    const imageWidth = 42;
    const imageHeight = 42;
    const markerSize = 8;
    const font = "bold 18pt 'Arial'";
    const color = "#000000";
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const addText = function(ctx, text, centerX, centerY) {
        // yellow fill
        ctx.fillStyle = '#ff6';
        ctx.fillRect(0, 0, imageWidth, imageHeight);

        // text / number
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        var maxWidth = imageWidth
        ctx.fillText(text, centerX, centerY, maxWidth);
    }
    const textOffset = 2; // trying to align text beautifully here
    const text = rank !== null ? shortTextForNumber(rank) : "n/a";
    addText(ctx, text, imageWidth / 2, imageHeight / 2 + textOffset)
    return ctx.getImageData(0, 0, imageWidth, imageHeight);
}

async function handleUpdated(tabId, changeInfo, tabInfo) {
    if (changeInfo.url) {
        //console.log("Tab: " + tabId + " URL changed to " + changeInfo.url);

        const visits = await browser.history.getVisits({ url:  changeInfo.url  });
        browser.browserAction.setIcon({
            'imageData': getIconImageData(visits.length)
            ,'tabId': tabId
        });
    }
}

const filter = {
    urls: ["<all_urls>"],
    properties: ["url"]
}

browser.tabs.onUpdated.addListener(handleUpdated, filter);

