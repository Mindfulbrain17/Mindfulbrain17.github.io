# Anant Goyal - Personal Website

A personal portfolio and blog website for Anant Goyal, built with [Jekyll](https://jekyllrb.com/) and based on the [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) / [Academic Pages](https://github.com/academicpages/academicpages.github.io) theme.

This site features a clean, responsive design with dark mode support, custom search functionality, and specialized content collections for books, philosophy, finance, and information.

## 🚀 Features

*   **Responsive Design:** Fully responsive layout that adapts to all screen sizes (desktop, tablet, mobile).
*   **Dark Mode:** Built-in dark mode toggle with persistent preference (stored in `localStorage`).
    *   *Light Mode Accent:* Black (`#000000`)
    *   *Dark Mode Background:* True Black (`#000000`)
    *   *Dark Mode Text:* White (`#ffffff`)
*   **Search:** Client-side search powered by [Lunr.js](https://lunrjs.com/), featuring a custom overlay UI.
*   **Custom Collections:** Organized content beyond standard posts:
    *   📚 `_books` - Book reviews and notes.
    *   🧠 `_philosophy` - Philosophical essays and thoughts.
    *   💰 `_finance` - Financial insights and analysis.
    *   ℹ️ `_info` - General information and updates.
*   **Typography:** Uses the **Inter** font family for a modern, clean look.
*   **Navigation:** "Greedy" navigation bar that automatically groups overflow items into a dropdown on smaller screens.

## 🛠️ Tech Stack

*   **Static Site Generator:** [Jekyll](https://jekyllrb.com/)
*   **Templating:** [Liquid](https://shopify.github.io/liquid/)
*   **Styling:** SCSS / SASS
*   **Scripting:** Vanilla JavaScript, jQuery (for specific plugins)
*   **Search:** Lunr.js
*   **Build Pipeline:** Ruby (Jekyll) + Node.js (Asset minification)

## 📦 Installation & Local Development

To run this website locally, you'll need **Ruby** (with Bundler) and **Node.js** installed on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/Mindfulbrain17/Mindfulbrain17.github.io.git
cd Mindfulbrain17.github.io
```

### 2. Install Ruby Dependencies
Install the required Gems specified in the `Gemfile`:
```bash
bundle install
```

### 3. Install Node.js Dependencies
Install JavaScript dependencies (used for minification and plugins):
```bash
npm install
```

### 4. Build Assets
Compile and minify the JavaScript assets (creates `assets/js/main.min.js`):
```bash
npm run build:js
```

### 5. Run the Dev Server
Start the Jekyll server with live reloading:
```bash
bundle exec jekyll serve
```
Access the site at `http://localhost:4000`.

## ⚙️ Configuration

The main configuration file is `_config.yml`. Here you can customize:
*   **Site Metadata:** Title, description, author info.
*   **Navigation:** Top navigation links.
*   **Social Links:** Update your social media profiles (Telegram, Twitter, GitHub, etc.).
    *   *Note:* Telegram requires a full URL (e.g., `https://t.me/username`).
*   **Theme Settings:** Default theme preferences.

### Styles & Colors
SCSS variables can be found in `_sass/theme/`.
*   `_default_light.scss`: Variables for Light Mode.
*   `_default_dark.scss`: Variables for Dark Mode.

## 📝 Content Management

Content is managed via Markdown files in their respective directories.

### Adding a New Post
Create a file in `_posts/` with the format `YYYY-MM-DD-title.md`.
```yaml
---
title: "My New Post"
date: 2024-01-01
categories:
  - blog
tags:
  - update
---
Content goes here...
```

### Adding to Collections
To add content to specific collections (Books, Philosophy, etc.), create a markdown file in the corresponding directory:
*   `_books/`
*   `_philosophy/`
*   `_finance/`
*   `_info/`

Ensure you include the necessary Front Matter (YAML header) similar to standard posts.

## 🚢 Deployment

This site is configured to be hosted on **GitHub Pages**. Pushing changes to the `master` (or `main`) branch will automatically trigger a build and deployment.

## 📄 License

This project is based on the [Academic Pages](https://github.com/academicpages/academicpages.github.io) template, which is a fork of [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/).

Copyright © 2024 Anant Goyal.

The source code is available under the [MIT License](LICENSE).
