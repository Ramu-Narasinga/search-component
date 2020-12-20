export const serverBaseUrl = "http://localhost:3002";
export const searchAPIUrl = "/search/users";

function createMarkup(string, term) {
    return {__html: string.replace(new RegExp(term, "gi"), (match) => `<mark>${match}</mark>`)}
};
  

export function matchedString(string, term) {
    return <span dangerouslySetInnerHTML={createMarkup(string, term)}></span>;
}

let i = 0;

function getActiveIndex(type, onlyActiveIndex) {
    let suggestCards = document.getElementsByClassName('suggestion');
    let foundActiveIndex = null;
    let activeFound = false;

    for(let i=0;i<suggestCards.length;i++) {
        if (document.getElementsByClassName('suggestion')[i].classList.contains('sugg-active')) {
            activeFound = true;
            foundActiveIndex = i;
        } 
        console.log(document.getElementsByClassName('suggestion')[i].classList.contains('sugg-active'));
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

function handleListNav(e) {
    // on keydown
    if (e.keyCode == 40) {
        let i = getActiveIndex('down');
        let el = document.getElementsByClassName('suggestion')[i];
        console.log("i", i, "e KEY DOWN", e, document.getElementsByClassName('suggestion'));
        if (i-1 >= 0) {
            document.getElementsByClassName('suggestion')[i-1].classList.remove('sugg-active');
        }
        el.classList.add('sugg-active');    
        el.scrollIntoView();    
    } else if (e.keyCode == 38) {
        let i = getActiveIndex('up');
        let el = document.getElementsByClassName('suggestion')[i];
        console.log("e. KEY UP", e, document.getElementsByClassName('suggestion'));
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