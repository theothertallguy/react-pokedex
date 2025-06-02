export function capsNoHyphen(str: string) {
    var splitStr = str.toLowerCase().split('-');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        if (splitStr[i] == "Hp") {
            splitStr[i] = "HP"
        }
    }
    return splitStr.join(' ');
}
