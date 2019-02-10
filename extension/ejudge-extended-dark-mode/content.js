(function() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = chrome.extension.getURL('favicon_wt_16.png');
    document.getElementsByTagName('head')[0].appendChild(link);
})();