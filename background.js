document.querySelectorAll('*').forEach(el => {
    el.style.backgroundImage = 'none';
});

document.querySelectorAll('img, iframe').forEach(el => {
    const { width, height } = el.getBoundingClientRect();
    const newItem = document.createElement('div');
    newItem.style.width = `${width}px`;
    newItem.style.height = `${height}px`;
    newItem.style.backgroundPosition = 'center center';
    newItem.style.backgroundSize = 'contain';
    newItem.style.backgroundRepeat = 'no-repeat';
    newItem.style.backgroundImage = `url(${chrome.extension.getURL('no-image.png')})`;
    el.parentNode.replaceChild(newItem, el);
});
