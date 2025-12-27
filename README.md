# 📁 GOOGLE DRIVE EXPLORER


## DESCRIPTION
- A simple web-based **Google Drive file manager** that demonstrates full **CRUD (Create, Read, Update, Delete)** operations using the **Google Drive REST API**. 


## 🚀 FEATURES

- 🔍 **Search Files** – Find files in Google Drive by name  
- ⬆️ **Upload Files** – Upload files directly to Google Drive  
- ✏️ **Rename Files** – Update file names  
- 🗑️ **Delete Files** – Permanently remove files  
- ⏳ **Loading State** – Visual feedback during API requests  
- ⚠️ **Error Handling** – User-friendly error messages  
- 📱 **Responsive UI** – Works on desktop and mobile devices  


## 🛠️ TECHNOLOGIES USED

- **HTML5** – Application structure  
- **CSS3** – Responsive and Google-inspired UI  
- **JavaScript (ES6 Modules)** – Logic and API handling  
- **Google Drive REST API v3**  
- **Fetch API** with `async/await`


## 📂 PROJECT STRUCTURE
.
├── index.html        # Main HTML file
├── style.css         # Application styles
├── script.js         # Core JavaScript logic (CRUD + DOM)
├── config.js         # API configuration (ignored in repo)
└── README.md         # Project documentation

## ▶️ HOW TO RUN
1. Open the project folder
2. Launch index.html using:
    - Live Server (VS Code recommended), or
    - Any local web server
3. Ensure you are authenticated with a valid Google access token

## 📌 FUNCTIONAL OVERVIEW
- 🔎 Search Files
    - Searches non-trashed files by name
    - Uses Google Drive query syntax
- ⬆️ Upload Files
    - Uploads media via /upload/drive/v3/files
    - Automatically renames uploaded file to original filename
- ✏️ Rename Files
    - Uses PATCH request to update file metadata
- 🗑️ Delete Files
    - Deletes selected file after user confirmation

## ⚠️ LIMITATIONS
- Access token must be manually refreshed

- No file preview (metadata only)

## Role Assignment

- To keep the project organized and running smoothly, each member was given a specific role:

- Jessalyn S. Peralta – GitHub & Documentation Manager
Manages the GitHub repository, handles commits, and keeps the README and project documentation updated.

- Janiza Dela Cruz – API & Authentication Handler
Handles API integration, data fetching, and manages API keys and authentication.

- Ernie Roble – JavaScript Logic / Data Processing
Works on the main JavaScript functions, data handling, validation, and overall app logic.

- Vanessa Jimenez – UI & CSS Designer
Designs the user interface, styles the app using CSS, and ensures a clean and user-friendly layout.
