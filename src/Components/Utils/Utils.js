// Truncates long strings to and spits out the string with max letters with ellipsis
const truncate = (words) => {
    let newWord = '';
    if(words.length > 30) {
        newWord = words.slice(0,30);
        return newWord + '...';
    }
    return words;
}

export const Utils = {
    truncate: truncate
}