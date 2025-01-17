        document.addEventListener("DOMContentLoaded", function () {
    const iframe = document.getElementById('content-frame');
    const urlParam = getQueryParam('url');
    const storedUrl = localStorage.getItem('iframeSrc');

    if (urlParam) {
        const decodedUrl = decodeURIComponent(urlParam);
        iframe.src = decodedUrl;
        localStorage.setItem('iframeSrc', decodedUrl); 
        history.replaceState(null, '', window.location.pathname); 
        console.log('Iframe URL set from query param:', decodedUrl);
    } 
    else if (storedUrl) {
        iframe.src = storedUrl;
        console.log('Iframe URL set from localStorage:', storedUrl);
    } 
    else {
        iframe.src = '/404.html'; 
        console.log('Iframe URL set to default');
    }
});

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function toggleFullscreen() {
    const iframe = document.getElementById('content-frame');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { 
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { 
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { 
        iframe.msRequestFullscreen();
    }
}

function refreshIframe() {
    const iframe = document.getElementById('content-frame');
    iframe.src = iframe.src;  
    console.log('Iframe refreshed');
}