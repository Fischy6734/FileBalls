document.addEventListener("DOMContentLoaded", () => {
    const fileContainer = document.getElementById("fileContainer");
    const createFileBtn = document.getElementById("createFileBtn");
    const fileTemplate = document.getElementById("fileTemplate").content;

    // Load files from localStorage
    loadFiles();

    createFileBtn.addEventListener("click", createFile);

    function createFile() {
        const fileElement = fileTemplate.cloneNode(true);
        const textarea = fileElement.querySelector(".file-content");
        const downloadBtn = fileElement.querySelector(".downloadBtn");
        const copyLinkBtn = fileElement.querySelector(".copyLinkBtn");

        // Set up download button
        downloadBtn.addEventListener("click", () => {
            const blob = new Blob([textarea.value], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "file.txt";
            a.click();
            URL.revokeObjectURL(url);
        });

        // Set up copy link button
        copyLinkBtn.addEventListener("click", () => {
            const blob = new Blob([textarea.value], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            navigator.clipboard.writeText(url).then(() => {
                alert("Link copied to clipboard!");
            });
        });

        textarea.addEventListener("input", saveFiles);

        fileContainer.appendChild(fileElement);
    }

    function saveFiles() {
        const files = Array.from(fileContainer.querySelectorAll(".file-content")).map(textarea => textarea.value);
        localStorage.setItem("files", JSON.stringify(files));
    }

    function loadFiles() {
        const files = JSON.parse(localStorage.getItem("files")) || [];
        files.forEach(content => {
            const fileElement = fileTemplate.cloneNode(true);
            const textarea = fileElement.querySelector(".file-content");
            textarea.value = content;
            textarea.addEventListener("input", saveFiles);
            fileContainer.appendChild(fileElement);
        });
    }
});
