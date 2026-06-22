document.addEventListener("DOMContentLoaded", () => {

    chrome.storage.local.get(null, (data) => {

        const stats = document.getElementById("stats");

        if (Object.keys(data).length === 0) {
            stats.innerHTML = "<p>No browsing data yet.</p>";
            return;
        }

        for (const site in data) {

            const p = document.createElement("p");

            p.textContent =
                `${site} : ${data[site]} sec`;

            stats.appendChild(p);
        }
    });

});