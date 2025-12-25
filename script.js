/**
 * GOOGLE DRIVE API - FULL CRUD PROJECT
 * Functionality: Search (View), Upload (Create), Rename (Update), and Delete files.
 * Requirement Compliance: Async/Await, Input Validation, Error Handling, DOM Manipulation.
 */

import CONFIG from './config.js';

// --- DOM ELEMENTS (Requirement #15) ---
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const resultsGrid = document.getElementById('resultsGrid');
const errorBox = document.getElementById('errorBox');
const loader = document.getElementById('loader');

/**
 * 1. API FUNCTIONS 
 * Handles all RESTful communication using fetch()
 */

// READ: Fetch files based on search term
async function apiSearchFiles(searchTerm) {
    const query = encodeURIComponent(`name contains '${searchTerm}' and trashed = false`);
    const url = `${CONFIG.BASE_URL}?q=${query}&fields=files(id,name,mimeType)`;

    const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${CONFIG.ACCESS_TOKEN}` }
    });
    if (!response.ok) throw new Error('Failed to fetch files.');
    return await response.json();
}

// CREATE: Upload a simple file 
async function apiUploadFile(file) {
    // Note: Uploads use the /upload/ endpoint
    const url = `https://www.googleapis.com/upload/drive/v3/files?uploadType=media`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${CONFIG.ACCESS_TOKEN}`,
            'Content-Type': file.type
        },
        body: file
    });
    if (!response.ok) throw new Error('Upload failed.');
    return await response.json();
}

// UPDATE: Rename a file 
async function apiUpdateFile(fileId, newName) {
    const url = `${CONFIG.BASE_URL}/${fileId}`;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${CONFIG.ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName })
    });
    if (!response.ok) throw new Error('Update failed.');
}

// DELETE: Remove a file 
async function apiDeleteFile(fileId) {
    const url = `${CONFIG.BASE_URL}/${fileId}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${CONFIG.ACCESS_TOKEN}` }
    });
    if (!response.ok) throw new Error('Delete failed.');
}

/**
 * 2. DOM MANIPULATION FUNCTIONS 
 */

function displayFiles(files) {
    resultsGrid.innerHTML = '';
    if (files.length === 0) {
        showError('No results found.');
        return;
    }

    files.forEach(file => {
        const card = document.createElement('div');
        card.className = 'file-card';
        card.innerHTML = `
            <h3>📄 ${file.name}</h3>
            <p>ID: ${file.id}</p>
            <div class="card-actions">
                <button class="edit-btn" data-id="${file.id}" data-name="${file.name}">Rename</button>
                <button class="delete-btn" data-id="${file.id}">Delete</button>
            </div>
        `;
        resultsGrid.appendChild(card);
    });

    // Attach listeners to dynamic buttons
    setupCardListeners();
}

function toggleLoading(isLoading) {
    loader.classList.toggle('hidden', !isLoading);
    searchBtn.disabled = isLoading;
    uploadBtn.disabled = isLoading;
}

function showError(message) {
    errorBox.innerText = message;
    errorBox.classList.remove('hidden');
    setTimeout(() => errorBox.classList.add('hidden'), 5000);
}

/**
 * 3. CONTROLLER FUNCTIONS & LOGIC 
 */

// Handle Search
async function handleSearch() {
    const term = searchInput.value.trim(); // Auto-trim (Req #9)
    if (!term) return showError('Please enter a search term.');

    toggleLoading(true);
    try {
        const data = await apiSearchFiles(term);
        displayFiles(data.files);
    } catch (err) {
        showError(err.message);
    } finally {
        toggleLoading(false);
    }
}

// Handle Upload
async function handleUpload() {
    const file = fileInput.files[0];
    if (!file) return showError('Select a file first.');

    toggleLoading(true);
    try {
        const uploadedFile = await apiUploadFile(file);
        // Step 2: Set the filename (Drive media upload defaults to 'Untitled')
        await apiUpdateFile(uploadedFile.id, file.name);
        showError('File uploaded successfully!');
        fileInput.value = ''; // Clear input
    } catch (err) {
        showError(err.message);
    } finally {
        toggleLoading(false);
    }
}

// Setup Card Listeners for Update/Delete
function setupCardListeners() {
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.onclick = async () => {
            if (confirm('Delete this file?')) {
                toggleLoading(true);
                try {
                    await apiDeleteFile(btn.dataset.id);
                    handleSearch();
                } catch (err) { showError(err.message); }
                finally { toggleLoading(false); }
            }
        };
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.onclick = async () => {
            const newName = prompt('Enter new name:', btn.dataset.name);
            if (newName && newName.trim() !== "") {
                toggleLoading(true);
                try {
                    await apiUpdateFile(btn.dataset.id, newName.trim());
                    handleSearch();
                } catch (err) { showError(err.message); }
                finally { toggleLoading(false); }
            }
        };
    });
}

// --- EVENT LISTENERS ---
searchBtn.addEventListener('click', handleSearch);
uploadBtn.addEventListener('click', handleUpload);