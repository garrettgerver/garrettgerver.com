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
        const headers = document.querySelectorAll(".tree-header");
        headers.forEach(header => {
            header.removeEventListener("click", toggleTree);
            header.addEventListener("click", toggleTree);
        });
    }

    const contentButtons = document.querySelectorAll(".content-btn");
    let visibleContent = null;

    contentButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");
            const targetDiv = document.getElementById(targetId);

            if (visibleContent === targetDiv) {
                targetDiv.style.display = "none";
                visibleContent = null;
            } else {
                if (visibleContent) {
                    visibleContent.style.display = "none";
                }
                fetch(`./files/${targetId}`)
                    .then(response => response.text())
                    .then(data => {
                        document.getElementById(`${targetId}-container`).innerHTML = data;
                    })
                    .catch(error => console.error('Error loading the file:', error));
                targetDiv.style.display = "block";
                visibleContent = targetDiv;
            }
        });
    });

    addTreeListeners();
});
