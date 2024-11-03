# Network Tracker Chrome Extension

Test task 2 for Aqua Web Inspector as a Chrome Extension Internship.

## Functionalities

- Counts successful and total finished requests in a DevTools panel
- Reset counters
- Warns if a counter is Nan and therefore cannot be updated

## How to install extension

- Download and extract this project in an empty folder
- In your Chrome browser open `chrome://extensions/`
- Enable `Developer mode`
- Click on `Load unpacked` and select folder with extracted project

## How to use

- Right click with your mouse and select `Inspect`
- Locate and click on a tab called `Network Tracker`
- Network Tracker displays counter of successfully and total completed network requests for current tab

> Warning: Do not modify the `Network Tracker` tab!

## Possible additional features

- Most of the features are already in Network tab
- Start/Pause/Stop when to track requests

## My coding process

Developing a Chrome extension is nothing new to me so all I needed was to figure out how to track requests. That is when
I found
about [`chrome.devtools.network`](https://developer.chrome.com/docs/extensions/reference/api/devtools/network?hl=en).
From there I learned about creating panels and that was it. I was thinking about adding features and the only thing that
made the most sense to me was a reset button for counters. Finally, I needed to resolve how to make my panel look pretty
not only for me but also for JetBrains. That is when I came across
this [Jetbrains Guide](https://www.jetbrains.com/guide/python/tutorials/sphinx_sites/design/)
and [JetBrains Guidelines](https://www.jetbrains.com/company/brand/#logos-and-icons).

In my coding process I was not sure about:

- constants - I was not sure about
  adding [HTTP response status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) into constants, since
  they are constants on its own, but in the end I decided to add them, because the upper successful status code limit
  (299) is not a status code yet. Also with this solution, if for some reason someone decided that the 200-299 interval
  is too large, then editing it in `constants.js` is much better since someone could be working in `trackerPanel.js` and
  there could be a merge conflict. Then I fell into a rabbit hole and wanted to add everything into constants, including
  class
  names and class ids, but I think that would be unnecessary, and it would make `constants.js` less readable.
- value checks - I added NaN counter checks and then raise an exception if it was not a number. But also user should be
  notified that counter was not updated due to an unexpected counter value. The `warnUser` method is in my opinion best
  located in the event listener method. But in the end I decided to leave the `warnUser` in
  the `incrementElementCounter` method and mention it in the method documentation for code cleanliness.