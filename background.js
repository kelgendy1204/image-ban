'use strict';

function addBadge(status) {
    chrome.browserAction.setBadgeText({
        text: status
    });
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get('status', function(data) {
        const currentStatus = data.status;
        addBadge(currentStatus);
    });
});

function toggleFeature() {
    chrome.storage.sync.get('status', function(data) {
        const currentStatus = data.status;
        if (currentStatus === 'ON') {
            chrome.storage.sync.set({ status: 'OFF' }, () => addBadge('OFF'));
        } else {
            chrome.storage.sync.set({ status: 'ON' }, () => addBadge('ON'));
        }

        chrome.tabs.reload();
    });
}

chrome.browserAction.onClicked.addListener(toggleFeature);
