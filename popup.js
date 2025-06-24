document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle-definitions");

  // Load current state
  chrome.storage.sync.get("definitionsEnabled", (data) => {
    toggle.checked = data.definitionsEnabled ?? true;
  });

  // Handle change
  toggle.addEventListener("change", () => {
    chrome.storage.sync.set({ definitionsEnabled: toggle.checked });
  });

  // Load recent words
  chrome.storage.local.get("recentWords", (data) => {
    const list = document.getElementById("recent-words");
    list.innerHTML = "";

    (data.recentWords || [])
      .slice(-5)
      .reverse()
      .forEach(({ word, definition }) => {
        const li = document.createElement("li");
        li.textContent = `${word}: ${definition}`;
        list.appendChild(li);
      });
  });
});
