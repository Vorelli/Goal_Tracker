function grab(selector) {
    return document.querySelector(selector);
}
function grabAll(selector) {
    return document.querySelectorAll(selector);
}
function grabFrom(where, what) {
    return where.querySelector(what);
}
function grabAllFrom(where, what) {
    return where.querySelectorAll(what);
}
export {grab, grabAll, grabFrom, grabAllFrom};