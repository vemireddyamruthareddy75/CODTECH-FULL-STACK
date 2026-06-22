let currentTab = null;
let startTime = Date.now();

async function updateTime() {
    if (!currentTab) return;

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    chrome.storage.local.get([currentTab], (result) => {
        const oldTime = result[currentTab] || 0;

        chrome.storage.local.set({
            [currentTab]: oldTime + timeSpent
        });
    });

    startTime = Date.now();
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    await updateTime();

    const tab = await chrome.tabs.get(activeInfo.tabId);

    if (tab.url) {
        currentTab = new URL(tab.url).hostname;
    }
});

chrome.windows.onFocusChanged.addListener(() => {
    updateTime();
});