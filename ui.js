const LOGO_SRC = "https://cdn-icons-png.flaticon.com/64/4708/4708374.png";

function showDefinitionTooltip(tile, word, meanings) {
  if (document.querySelector(`.wordle-tooltip[data-word="${word}"]`)) return;

  const wrapper = document.createElement("div");
  wrapper.className = "wordle-tooltip";
  wrapper.dataset.word = word;

  const icon = document.createElement("img");
  icon.className = "wordle-icon";
  icon.src = LOGO_SRC;
  icon.alt = "definition";

  const tooltip = document.createElement("div");
  tooltip.className = "tooltip-text";
  tooltip.innerText = meanings?.[0]
    ? `${meanings[0].word} (${meanings[0].pos}): ${meanings[0].definition}`
    : "No definition found.";

  wrapper.append(icon, tooltip);

  tile.parentElement.style.position = "relative";
  tile.parentElement.appendChild(wrapper);

  wrapper.style.position = "absolute";
  wrapper.style.top = `${tile.offsetTop}px`;
  wrapper.style.left = `${tile.offsetLeft + tile.offsetWidth + 6}px`;
}
