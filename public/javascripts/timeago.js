function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}
// var aDay = 24 * 60 * 60 * 1000
// console.log(timeSince(new Date(Date.now() - aDay)));




$(document).ready(function () {
    let elementsArray = document.getElementsByClassName("post-time");
    
    for (let index = 0; index < elementsArray.length; index++) {
        let time = timeSince(elementsArray[index].innerText);
        elementsArray[index].innerText = time;

    }
});