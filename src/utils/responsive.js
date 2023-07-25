
export function smallScreen (width) {
    let isSmall = false;

    if(window.innerWidth < width) {
        isSmall =  true;
    }

    return isSmall;
}