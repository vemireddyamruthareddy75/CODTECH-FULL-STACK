document.addEventListener("DOMContentLoaded", () => {

    const productiveSites = [
        "github.com",
        "leetcode.com",
        "stackoverflow.com",
        "w3schools.com",
        "geeksforgeeks.org"
    ];

    chrome.storage.local.get(null, (data) => {

        const stats = document.getElementById("stats");

        let productiveTime = 0;
        let unproductiveTime = 0;

        if (Object.keys(data).length === 0) {
            stats.innerHTML = "<p>No browsing data available.</p>";
            return;
        }

        for (const site in data) {

            const seconds = data[site];

            const p = document.createElement("p");

            if (productiveSites.some(s => site.includes(s))) {

                productiveTime += seconds;

                p.innerHTML =
                    `✅ ${site} : ${seconds} sec`;

            } else {

                unproductiveTime += seconds;

                p.innerHTML =
                    `❌ ${site} : ${seconds} sec`;

            }

            stats.appendChild(p);
        }

        const summary = document.createElement("hr");

        stats.appendChild(summary);

        const report = document.createElement("div");

        report.innerHTML = `
        <h3>Productivity Report</h3>
        <p>✅ Productive Time: ${productiveTime} sec</p>
        <p>❌ Unproductive Time: ${unproductiveTime} sec</p>
        `;

        stats.appendChild(report);
    });
});