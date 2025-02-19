document.addEventListener("DOMContentLoaded", function() {
    async function typeText(element, typingSpeed) {
        return new Promise((resolve, reject) => {
            let index = 0;
            let text = element.innerHTML;
            element.innerHTML = "";

            function type() {
                if (getComputedStyle(element.parentNode).display === "none") {
                    element.innerHTML = text;
                    resolve();
                    return;
                }

                if (index < text.length) {
                    element.textContent += text[index++];
                    let randomSpeed = Math.random()*typingSpeed;
                    setTimeout(type, randomSpeed);
                } else {
                    resolve();
                }
            }
            type();
        });
    }

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
            setTimeout(() => {
                header.style.display = "block";
            }, 100);
        });
    }


    const contentButtons = document.querySelectorAll(".content-btn");
    let visibleContent = null;

    contentButtons.forEach(button => {
        const targetId = button.getAttribute("data-target");
        const targetDiv = document.getElementById(targetId);

        fetch(`./files/${targetId}`)
            .then(response => response.text())
            .then(data => {
                document.getElementById(`${targetId}-container`).innerHTML = data;
            })
            .catch(error => console.error("Error loading the file: ", error));

        button.addEventListener("click", () => {
            if (visibleContent === targetDiv) {
                targetDiv.style.display = "none";
                visibleContent = null;
            } else {
                if (visibleContent) {
                    visibleContent.style.display = "none";
                }
                targetDiv.style.display = "block";
                visibleContent = targetDiv;
                typeText(document.getElementById(`${targetId}-container`), 20);
            }
        });
    });

    async function init() {
        await typeText(document.getElementById("header-text"), 100);
        setTimeout(() => {
            document.getElementById("about-me-btn").style.display = "block";
        }, 100);
        addTreeListeners();
    }

    init();
});
