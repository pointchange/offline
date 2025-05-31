function DeleteFileSuffix(name: string) {
    const nameArr = name.split('.');
    const len = nameArr.length - 1;
    return name.replace('.' + nameArr[len], '');
}
function getFileSuffix(name: string) {
    const nameArr = name.split('.');
    const len = nameArr.length - 1;
    return nameArr[len];
}
export { getFileSuffix, DeleteFileSuffix }