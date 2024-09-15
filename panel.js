chrome.devtools.network.onRequestFinished.addListener(
    function (request) {
        // filter out statuses that are not successful
        if(request.response.status < 200 || request.response.status >= 300){
            return;
        }

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