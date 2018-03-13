window.onload = function(){

};

function resizeIframe(obj) {
    console.log(obj.contentWindow.document.body.scrollHeight);
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
}
