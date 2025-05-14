# Tinder for Devs

A desktop web application that helps developers find and connect with other developers based on programming languages and location. Built with vanilla HTML, CSS, and JavaScript.

## Features

- Language-based developer matching
- Location-based filtering
- Like/Skip functionality
- Modern, clean UI inspired by Tinder
- No external dependencies

## Project Structure

```
.
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   ├── app.js          # Main application logic
│   └── mockProfiles.js # Sample developer profiles
└── README.md          # This file
```

## Setup and Running

1. Clone the repository
2. Open `index.html` in a modern web browser
   - For the best experience, use Chrome, Firefox, or Safari
   - The app is designed for desktop use only

## Development

The project uses vanilla JavaScript modules, so you'll need to serve the files through a web server. You can use any of these methods:

1. Using Python:

   ```bash
   # Python 3
   python -m http.server

   # Python 2
   python -m SimpleHTTPServer
   ```

2. Using Node.js:

   ```bash
   npx serve
   ```

3. Using VS Code's Live Server extension

Then open `http://localhost:8000` (or the port shown in your terminal) in your browser.

## Browser Support

The application uses modern JavaScript features and CSS properties. It's recommended to use a modern browser with the following minimum versions:

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 16+

## License

MIT License
