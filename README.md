# Wordle Dictionary Extension

A lightweight Chrome extension that displays definitions of guessed words while playing [NYT Wordle](https://www.nytimes.com/games/wordle/index.html).

After each guess, a small icon appears next to the row. Hovering over the icon shows the word's definition, helping you learn as you play.

## Features

- Shows dictionary definitions for guessed words
- Adds a small icon next to each completed guess
- Hovering over the icon reveals the meaning
- Toggle switch to enable or disable definitions
- Displays a list of recently guessed words
- Uses the free [dictionaryapi.dev](https://dictionaryapi.dev) API

## Why This Exists

This extension lets me instantly see definitions while playing Wordle without extra clicks.

## Installation (Chrome)

1. Download or clone this repository:
   ```
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```
2. Open `chrome://extensions/` in Chrome
3. Enable **Developer Mode**
4. Click **Load unpacked** and select the project folder

## Firefox Support

This extension works on **Firefox Desktop** via `about:debugging` → “Load Temporary Add-on.”  
It is **not currently supported** on Firefox Android due to installation restrictions.

## Folder Structure

```
wordle-dictionary/
├── manifest.json
├── content.js
├── popup.html
├── popup.js
├── ui.js
├── style.css
├── icons/
│   ├── icon64.png
│   └── icon128.png
```

## Permissions

- `storage`: to save toggle settings and recent words
- Only runs on the Wordle game page
- No trackers or data collection

## Attribution

Definitions are powered by the [Free Dictionary API](https://dictionaryapi.dev/)

---

Feel free to fork, suggest improvements, or open issues!
