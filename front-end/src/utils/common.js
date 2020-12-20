export const serverBaseUrl = "http://localhost:3002";
export const searchAPIUrl = "/search/users";

function createMarkup(string, term) {
    return {__html: string.replace(new RegExp(term, "gi"), (match) => `<mark>${match}</mark>`)}
};
  

export function matchedString(string, term) {
    return <span dangerouslySetInnerHTML={createMarkup(string, term)}></span>;
}

// params - type and onlyActiveIndex
// when 'onlyActiveIndex' is true, directly found active card index is returned
// basically fetches the current active card from suggestions based on 'sugg-active' class name
// if key is down, foundActiveIndex is incremented;
// if key is up, foundActiveIndex is decremeneted;
function getActiveIndex(type, onlyActiveIndex) {
    let suggestCards = document.getElementsByClassName('suggestion');
    let foundActiveIndex = null;
    let activeFound = false;

    for(let i=0;i<suggestCards.length;i++) {
        if (document.getElementsByClassName('suggestion')[i].classList.contains('sugg-active')) {
            activeFound = true;
            foundActiveIndex = i;
        } 
        // console.log(document.getElementsByClassName('suggestion')[i].classList.contains('sugg-active'));
    }

    if(!activeFound) {
        foundActiveIndex = 0;
    } else {
        if (!onlyActiveIndex) {
            if(type == 'up') {
                foundActiveIndex = foundActiveIndex - 1 < 0 ? 0 : foundActiveIndex - 1;
            } else if (type == 'down') {
                foundActiveIndex = foundActiveIndex + 1 > suggestCards.length-1 ? suggestCards.length-1 : foundActiveIndex + 1;
            }
        }
    }

    return foundActiveIndex;
}

// sugg-active class name is used to show active effect on suggestions list
// previouslyt added 'sugg-active' class is removed using index returned from getActiveIndex
function handleListNav(e) {
    // on keydown
    // remove i-1 element's sugg-active
    // set i element's class to sugg-active
    if (e.keyCode == 40) {
        let i = getActiveIndex('down');
        let el = document.getElementsByClassName('suggestion')[i];
        // console.log("i", i, "e KEY DOWN", e, document.getElementsByClassName('suggestion'));
        if (i-1 >= 0) {
            document.getElementsByClassName('suggestion')[i-1].classList.remove('sugg-active');
        }
        el.classList.add('sugg-active');    
        el.scrollIntoView();    
    } else if (e.keyCode == 38) { 
        // on keyup
        // remove i+1 element's sugg-active
        // set i element's class to sugg-active
        let i = getActiveIndex('up');
        let el = document.getElementsByClassName('suggestion')[i];
        // console.log("e. KEY UP", e, document.getElementsByClassName('suggestion'));
        document.getElementsByClassName('suggestion')[i+1].classList.remove('sugg-active');
        el.classList.add('sugg-active');
        el.scrollIntoView();
    } else if (e.keyCode == 13) {
        let i = getActiveIndex('down', true);
        if (i > -1) {
            document.getElementsByClassName('suggestion')[i].children[0].click();
        } else {
            document.getElementById('vr').click();
        }
    }
}

// registered in search,js component
// keydown event listener is attached 
export function registerNavHandlers() {
    if(document.getElementsByClassName('suggestions-ls').length > 0) {
        document.getElementsByClassName('suggestions-ls')[0].onmouseenter = function () {
            let suggestCards = document.getElementsByClassName('suggestion');
            for(let i=0;i<suggestCards.length;i++) {
                if (document.getElementsByClassName('suggestion')[i].classList.contains('sugg-active')) {
                    document.getElementsByClassName('suggestion')[i].classList.remove('sugg-active');
                } 
            }
        }
        document.addEventListener('keydown', handleListNav);
    }
}