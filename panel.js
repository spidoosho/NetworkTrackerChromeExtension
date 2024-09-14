chrome.devtools.network.onRequestFinished.addListener(
    function (request) {
        const counterEl = document.getElementById("counter");

        if (counterEl == null) {
            console.log("Cannot find counter element to update count. Panel was probably forcefully edited.");
            return;
        }

        const counter = parseInt(counterEl.innerText);

        if (isNaN(counter)) {
            console.log("Counter is NaN. Panel was probably forcefully edited.");
            return;
        }
        counterEl.textContent = (counter + 1).toString();
    }
);