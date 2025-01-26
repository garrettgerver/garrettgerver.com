document.addEventListener("DOMContentLoaded", function() {
    function toggleTree(event) {
        const content = event.target.nextElementSibling;

        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    }

    function addTreeListeners() {
        const headers = document.querySelectorAll('.tree-header');
        headers.forEach(header => {
            header.removeEventListener('click', toggleTree); // Remove previous listeners to avoid duplicates
            header.addEventListener('click', toggleTree);
        });
    }

    addTreeListeners();
});
