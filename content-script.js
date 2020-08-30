'use strict';

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

(function() {
    chrome.storage.sync.get('status', function(data) {
        const currentStatus = data.status;

        if (currentStatus === 'ON') {
            document.querySelectorAll('*').forEach(el => {
                el.style.backgroundImage = 'none';
            });

            document.querySelectorAll('img, iframe').forEach(el => {
                // const { width, height } = el.getBoundingClientRect();
                const newItem = document.createElement('div');
                copyNodeStyle(el, newItem);
                // newItem.style.width = `${width}px`;
                // newItem.style.height = `${height}px`;
                newItem.style.backgroundPosition = 'center center';
                newItem.style.backgroundSize = 'contain';
                newItem.style.backgroundRepeat = 'no-repeat';
                newItem.style.backgroundImage = `url(${chrome.extension.getURL('no-image.png')})`;
                el.parentNode.replaceChild(newItem, el);
            });
        }
    });
})();
