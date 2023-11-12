// function to capitalize the first letter of a string and then returns the string.
export const capFirstLetter = function (string) {
    const stringToCap = string.trim();
    const stringToArr = stringToCap.split(" ");
    const newArray = stringToArr.map(word => word.charAt(0).toUpperCase().concat(word.substring(1, word.length)));
    return newArray.join(" ");
}
