//  Easily center any selectors and not allow the page to
//  smush multiple elements together on the same x-axis.

const CenterElement = function(idArrayToCenter) {    
    function center() {
        const width = window.innerWidth;
        idArrayToCenter.forEach(selector => {
            let elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                const elementWidth = element.offsetWidth-50;
                const neededMargins = (width-elementWidth)/2 + 'px';
                element.style.marginLeft = neededMargins;
                element.style.marginRight = neededMargins;
            })
        });
    }

    return {center};
}

export default CenterElement;