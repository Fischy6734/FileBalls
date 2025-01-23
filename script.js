document.addEventListener('DOMContentLoaded', () => {
    const fileContainer = document.getElementById('fileContainer');
    const addFileBtn = document.getElementById('addFileBtn');
    const fileInputModal = document.getElementById('fileInputModal');
    const fileInput = document.getElementById('fileInput');
    const uploadFileBtn = document.getElementById('uploadFileBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    addFileBtn.addEventListener('click', () => {
        fileInputModal.setAttribute('aria-hidden', 'false');
    });

    closeModalBtn.addEventListener('click', () => {
        fileInputModal.setAttribute('aria-hidden', 'true');
    });

    uploadFileBtn.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (file) {
            const fileDiv = document.createElement('div');
            fileDiv.classList.add('file');
            fileDiv.innerHTML = `
                <p>${file.name}</p>
                <button onclick="copyLink('${file.name}')">Copy Link</button>
                <button onclick="downloadFile('${file.name}')">Download</button>
            `;
            fileContainer.appendChild(fileDiv);
            fileInputModal.setAttribute('aria-hidden', 'true');
            fileInput.value = ''; // Clear the input
        }
    });
});

// Dummy functions for file handling
function copyLink(fileName) {
    const link = `http://example.com/files/${fileName}`; // Replace with actual link
    navigator.clipboard.writeText(link).then(() => {
        alert('Link copied to clipboard!');
    });
}

function downloadFile(fileName) {
    const link = document.createElement('a');
    link.href = `http://example.com/files/${fileName}`; // Replace with actual link
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
