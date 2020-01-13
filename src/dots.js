function generateDot() {
    let a = document.createElement('span');
    a.classList.add('dot');
    return a;
}

function generateFilledDot() {
    let a = generateDot();
    a.classList.add('filledDot');
    return a;
}

export {generateDot, generateFilledDot};