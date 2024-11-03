import {
    BROKEN_COUNTER_WARNING_TEXT,
    DEFAULT_COUNTER_VALUE,
    LOWER_SUCCESSFUL_CODE_LIMIT,
    UPPER_SUCCESSFUL_CODE_LIMIT
} from "./constants.js";

/**
 * Filters request based on response status and updates trackers with ids "counterSuccessful" and "counterTotal".
 *
 * @param {Request} request finished request to be processed
 */
function trackFinishedRequests(request) {
    // check if finished request is successful
    if (isRequestSuccessful(request.response.status)) {
        // if successful, update counter
        incrementElementCounter(document.getElementById("counterSuccessful"), BROKEN_COUNTER_WARNING_TEXT);
    }

    // always update increment counter
    incrementElementCounter(document.getElementById("counterTotal"), BROKEN_COUNTER_WARNING_TEXT);
}

/**
 * Checks if given HTTP response status code is successful.
 *
 * @param {number} status - HTTP response status code.
 * @returns {boolean} If status is a successful response status code.
 */
function isRequestSuccessful(status) {
    if (isNaN(status)) {
        throw new TypeError("status must be an integer.");
    }

    return status >= LOWER_SUCCESSFUL_CODE_LIMIT && status <= UPPER_SUCCESSFUL_CODE_LIMIT;
}

/**
 * Increments number value of a given element.
 * If element's textContent is Nan, then calls warnUser and throws TypeError.
 *
 * @param {HTMLElement} element The element with number counter.
 * @param {string} warningText Warning text that will be given to warnUser.
 */
function incrementElementCounter(element, warningText) {
    const counter = parseInt(element.textContent);

    if (isNaN(counter)) {
        warnUser(warningText);
        throw new TypeError("counter must be an integer.");
    }

    element.textContent = (counter + 1).toString();
}

/**
 * Writes a warning text to element with id "warning".
 *
 * @param text Warning text that will be displayed.
 */
function warnUser(text) {
    document.getElementById("warning").textContent = text;
}

/**
 * Resets textContent of elements with id "counterSuccessful" and "counterTotal" to DEFAULT_COUNTER_VALUE.
 */
function resetCounter() {
    document.getElementById("counterSuccessful").textContent = DEFAULT_COUNTER_VALUE;
    document.getElementById("counterTotal").textContent = DEFAULT_COUNTER_VALUE;
}

/**
 * Toggles navigation burger
 */
function toggleNavBurger() {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
            // Get the target from the "data-target" attribute
            const target = document.getElementById(el.dataset.target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            target.classList.toggle('is-active');
        });
    });
}

(() => {
    // add listener
    chrome.devtools.network.onRequestFinished.addListener((request) => trackFinishedRequests(request));

    // add button click functionality
    document.getElementById("resetBtn").addEventListener("click", resetCounter);
    document.addEventListener('DOMContentLoaded', toggleNavBurger);
})();