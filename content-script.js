'use strict';

(function() {
    function copyNodeStyle(sourceNode, targetNode) {
        const computedStyle = window.getComputedStyle(sourceNode);
        Array.from(computedStyle).forEach(key =>
            targetNode.style.setProperty(
                key,
                computedStyle.getPropertyValue(key),
                computedStyle.getPropertyPriority(key)
            )
        );
    }

    function replaceImages() {
        document.querySelectorAll('img, iframe').forEach(el => {
            const newItem = document.createElement('div');
            copyNodeStyle(el, newItem);
            newItem.style.backgroundPosition = 'center center';
            newItem.style.backgroundSize = 'contain';
            newItem.style.backgroundRepeat = 'no-repeat';
            newItem.style.backgroundImage = `url(${chrome.extension.getURL('no-image.png')})`;
            el.parentNode.replaceChild(newItem, el);
        });
    }

    chrome.storage.sync.get('status', function(data) {
        const currentStatus = data.status;

        if (currentStatus === 'ON') {
            replaceImages();
        }
    });
})();
