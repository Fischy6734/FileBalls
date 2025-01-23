const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-btn');
const filesContainer = document.getElementById('files-container');

// Load files from localStorage on page load
document.addEventListener('DOMContentLoaded', loadFiles);

uploadButton.addEventListener('click', () => {
    const files = fileInput.files;
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            saveFile(file);
        }
        fileInput.value = ''; // Clear input
    }
});

function saveFile(file) {
    const fileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        url: URL.createObjectURL(file)
    };

    // Save to localStorage
    const files = JSON.parse(localStorage.getItem('files')) || [];
    files.push(fileData);
    localStorage.setItem('files', JSON.stringify(files));

    renderFile(fileData);
}

function loadFiles() {
    const files = JSON.parse(localStorage.getItem('files')) || [];
    files.forEach(file => renderFile(file));
}

function renderFile(file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `
        <p>${file.name}</p>
        <button onclick="downloadFile('${file.url}', '${file.name}')">Download</button>
        <button onclick="copyLink('${file.url}')">Copy Link</button>
    `;
    filesContainer.appendChild(fileItem);
}

function downloadFile(url, name) {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function copyLink(url) {
    navigator.clipboard.writeText(url)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Error copying link: ', err));
}
