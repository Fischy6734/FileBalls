document.addEventListener('DOMContentLoaded', () => {
    const fileContainer = document.getElementById('fileContainer');
    const addFileBtn = document.getElementById('addFileBtn');

    // Load files from local storage
    const loadFiles = () => {
        const files = JSON.parse(localStorage.getItem('files')) || [];
        files.forEach(file => createFileElement(file.name, file.link));
    };

    // Create file element
    const createFileElement = (name, link) => {
        const fileDiv = document.createElement('div');
        fileDiv.className = 'file';
        fileDiv.innerHTML = `
            <div class="file-name">${name}</div>
            <div class="copy-link" data-link="${link}">Copy Link</div>
        `;
        fileContainer.appendChild(fileDiv);

        // Add event listener for copying link
        fileDiv.querySelector('.copy-link').addEventListener('click', () => {
            navigator.clipboard.writeText(link).then(() => {
                alert('Link copied to clipboard!');
            });
        });
    };

    // Add file button click event
    addFileBtn.addEventListener('click', () => {
        const fileName = prompt('Enter file name:');
        const shortLink = `https://short.link/${btoa(fileName)}`; // Example short link generation
        if (fileName) {
            createFileElement(fileName, shortLink);
            saveFile(fileName, shortLink);
        }
    });

    // Save file to local storage
    const saveFile = (name, link) => {
        const files = JSON.parse(localStorage.getItem('files')) || [];
        files.push({ name, link });
        localStorage.setItem('files', JSON.stringify(files));
    };

    loadFiles();
});
