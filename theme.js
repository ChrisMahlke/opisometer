// The theme switcher. The page follows the device's light or dark appearance until
// the switcher picks one, which is remembered in this browser. The choice is applied
// before the page draws by a short script in each page's head; this file shows the
// switcher and keeps its label and the browser's toolbar color in step.
(function () {
  var root = document.documentElement;
  var button = document.querySelector(".theme");
  var toolbar = document.querySelector('meta[name="theme-color"]');
  var deviceIsLight = window.matchMedia("(prefers-color-scheme: light)");

  function current() {
    return root.dataset.theme || (deviceIsLight.matches ? "light" : "dark");
  }

  function update() {
    var light = current() === "light";
    if (toolbar) toolbar.content = light ? "#f6f6f7" : "#111113";
    if (button) {
      var label = light ? "Switch to the dark theme" : "Switch to the light theme";
      button.setAttribute("aria-label", label);
      button.title = label;
    }
  }

  if (button) {
    button.hidden = false;
    button.addEventListener("click", function () {
      var next = current() === "light" ? "dark" : "light";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (error) {}
      update();
    });
  }

  if (deviceIsLight.addEventListener) deviceIsLight.addEventListener("change", update);
  update();
})();
