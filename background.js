'use strict';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get('status', function(data) {
        const currentStatus = data.status;
        addBadge(currentStatus);
        blockRequests(currentStatus);
    });
});

chrome.browserAction.onClicked.addListener(toggleFeature);

function blockRequests(currentStatus) {
    if (currentStatus === 'ON') {
        chrome.webRequest.onBeforeRequest.addListener(
            blockRequestsCallback,
            { urls: ['http://*/*', 'https://*/*'], types: ['image', 'sub_frame'] },
            ['blocking']
        );
    } else {
        chrome.webRequest.onBeforeRequest.removeListener(
            blockRequestsCallback,
            { urls: ['http://*/*', 'https://*/*'], types: ['image', 'sub_frame'] },
            ['blocking']
        );
    }
}

function blockRequestsCallback() {
    return {
        cancel: true
    };
}

function toggleFeature() {
    chrome.storage.sync.get('status', function(data) {
        const currentStatus = data.status;
        if (currentStatus === 'ON') {
            chrome.storage.sync.set({ status: 'OFF' }, () => addBadge('OFF'));
            blockRequests('OFF');
        } else {
            chrome.storage.sync.set({ status: 'ON' }, () => addBadge('ON'));
            blockRequests('ON');
        }

        chrome.tabs.reload();
    });
}

function addBadge(status) {
    chrome.browserAction.setBadgeText({
        text: status
    });
}
