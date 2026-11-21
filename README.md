# Meme Generator

A simple meme generator built with React. Type your own top and bottom text, then pull a random meme template from the Imgflip API.

## Features

- Fetches popular meme templates from the [Imgflip API](https://imgflip.com/api)
- Random meme image on every button click
- Live top and bottom text editing
- Text stays in place when the image changes
- No API key required

## Tech Stack

- React (hooks: `useState`, `useEffect`)
- JavaScript (ES6+)
- Imgflip `/get_memes` API (free endpoint)
- CSS

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node.js)

### Installation

```bash
# clone the repository
git clone https://github.com/ibala-dev/meme-generator

# go into the project folder
cd meme-generator

# install dependencies
npm install

# start the development server
npm run dev
```

Then open the local URL shown in your terminal (usually `http://localhost:5173`).

## How It Works

1. **On load**, `useEffect` fetches about 100 popular meme templates from Imgflip and stores them in the `allMemes` state.
2. **When you type**, `handleChange` updates `topText` or `bottomText` in the `meme` state. One handler serves both inputs by reading the input's `name` from `event.currentTarget`.
3. **When you click "Get a new meme image"**, a random template is picked and its `url` is saved to `meme.imgUrl`.
4. **React re-renders**, showing the new image with your text on top.

### Picking a random meme

```js
const randomIndex = Math.floor(Math.random() * allMemes.length)
const randomUrl = allMemes[randomIndex].url
```

### Fetching the templates

```js
useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
}, [])
```

## State Overview

| State | Type | Purpose |
|---|---|---|
| `meme` | object | Current `topText`, `bottomText`, and `imgUrl` |
| `allMemes` | array | All meme templates returned by the API |

## API Reference

**Endpoint:** `GET https://api.imgflip.com/get_memes`

No authentication or parameters needed. Example response shape:

```json
{
  "success": true,
  "data": {
    "memes": [
      {
        "id": "61579",
        "name": "One Does Not Simply",
        "url": "https://i.imgflip.com/1bij.jpg",
        "width": 568,
        "height": 335,
        "box_count": 2,
        "captions": 1750
      }
    ]
  }
}
```

This project uses the `url` field for the image. See the [Imgflip API docs](https://imgflip.com/api) for details.

## Project Structure

```
meme-generator/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Main.jsx      # form, fetch logic, meme display
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

Adjust this to match your own folder layout.

## Future Improvements

- Download the finished meme as an image
- Choose a specific template instead of a random one
- Avoid showing the same image twice in a row
- Add a loading state while templates are fetching
- Handle API errors with a friendly message
- Support memes with more than two text boxes (`box_count`)

## Credits

- Meme templates provided by [Imgflip](https://imgflip.com/)

## License

This project is open source and available under the [MIT License](LICENSE).
