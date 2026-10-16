// The screenshot viewer on the About page. Selecting a screenshot opens it larger in a
// dialog over the dimmed page; Prev and Next, or the arrow keys, step through the rest,
// and Escape, Close or a click outside the panel closes it. Without this script each
// screenshot is a plain link to its image.
(function () {
  var dialog = document.querySelector(".lightbox");
  var shots = Array.prototype.slice.call(document.querySelectorAll(".shot"));
  if (!dialog || typeof dialog.showModal !== "function" || shots.length === 0) return;

  var image = dialog.querySelector(".lb-figure img");
  var title = dialog.querySelector(".lb-title");
  var count = dialog.querySelector(".lb-count");
  var sub = dialog.querySelector(".lb-sub");
  var index = 0;

  function show(next) {
    index = (next + shots.length) % shots.length;
    var shot = shots[index];
    var thumbnail = shot.querySelector("img");
    image.setAttribute("width", thumbnail.getAttribute("width"));
    image.setAttribute("height", thumbnail.getAttribute("height"));
    image.src = shot.href;
    image.alt = thumbnail.alt;
    title.textContent = shot.querySelector(".shot-caption").textContent;
    count.textContent = "(" + (index + 1) + " of " + shots.length + ")";
    sub.textContent = shot.querySelector(".shot-sub").textContent;
  }

  shots.forEach(function (shot, position) {
    shot.addEventListener("click", function (event) {
      // A modified click still opens the image itself, in a new tab or window.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      show(position);
      dialog.showModal();
    });
  });

  dialog.querySelector(".lb-close").addEventListener("click", function () {
    dialog.close();
  });

  Array.prototype.forEach.call(dialog.querySelectorAll(".lb-nav"), function (button) {
    button.addEventListener("click", function () {
      show(index + Number(button.dataset.step));
    });
  });

  // The dialog fills the window, so a click that lands on it, not on the panel inside,
  // was on the dimmed page.
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") show(index + 1);
    else if (event.key === "ArrowLeft") show(index - 1);
  });

  // Back to the screenshot that was open, so keyboard users keep their place.
  dialog.addEventListener("close", function () {
    shots[index].focus();
  });
})();
