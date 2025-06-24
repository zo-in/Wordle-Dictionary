const seenWords = new Set();

function getTiles() {
  return [...document.querySelectorAll('div[aria-roledescription="tile"]')];
}

function chunkIntoRows(arr, size) {
  const rows = [];
  for (let i = 0; i < arr.length; i += size) {
    rows.push(arr.slice(i, i + size));
  }
  return rows;
}

function getGuessedRows() {
  const rows = chunkIntoRows(getTiles(), 5);
  return rows.filter((row) =>
    row.every((tile) => tile.getAttribute("data-state"))
  );
}

function fetchDefinition(word) {
  return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => res.json())
    .then((data) => {
      const results = [];
      data?.forEach((entry) => {
        entry.meanings?.forEach((meaning) => {
          meaning.definitions?.forEach((def) => {
            results.push({
              word: entry.word,
              pos: meaning.partOfSpeech,
              definition: def.definition,
            });
          });
        });
      });
      return results;
    })
    .catch(() => null);
}

function observeGame() {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-state"
      ) {
        const el = mutation.target;
        const state = el.getAttribute("data-state");

        if (["correct", "present", "absent"].includes(state)) {
          const row = getGuessedRows().find((r) => r.includes(el));
          if (!row) return;

          const word = row.map((tile) => tile.innerText).join("");
          if (!word || word.length !== 5 || seenWords.has(word)) return;

          seenWords.add(word);

          chrome.storage.sync.get("definitionsEnabled", async (result) => {
            if (result.definitionsEnabled ?? true) {
              const defs = await fetchDefinition(word);
              const lastTile = row[row.length - 1];
              showDefinitionTooltip(lastTile, word, defs);
              saveToRecent(word, defs?.[0]?.definition);
            }
          });
        }
      }
    }
  });

  getTiles().forEach((tile) => {
    if (!tile.hasAttribute("data-observed")) {
      observer.observe(tile, { attributes: true });
      tile.setAttribute("data-observed", "true");
    }
  });
}

function saveToRecent(word, definition) {
  if (!definition) return;
  chrome.storage.local.get("recentWords", (data) => {
    const recent = data.recentWords || [];
    recent.push({ word, definition });
    chrome.storage.local.set({ recentWords: recent.slice(-20) });
  });
}

function waitForGame() {
  if (getTiles().length >= 30) {
    observeGame();
  } else {
    setTimeout(waitForGame, 500);
  }
}

waitForGame();
