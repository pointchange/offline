
/**
 * 
 * @param contents LRC source
 * @returns [{ time, text }]  array of objects 
 * 
 */
function parseLrc(contents: string) {
    let strArr = contents.split('\n') || [];
    let lrcArr = strArr.map(str => {
        const arr = str.split(']');
        const tArr = arr[0].replace('[', '').split(':');
        const time = +tArr[0] * 60 + +tArr[1];
        const text = arr.length > 1 ? arr[1] : '';
        return {
            time,
            text
        }
    })
    return lrcArr.filter(item => item.text !== '');
}

/**
 * 
 * @param isDark control Dark theme color
 * @returns url picture  address
 */

async function getMusicCover(isDark = false) {
    const w = 500;
    const h = 500;
    let canvas: OffscreenCanvas | null = new OffscreenCanvas(w, h);
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    ctx.fillStyle = isDark ? `rgb(50, 50, 50)` : '#eee';
    ctx.fillRect(0, 0, w, h);
    const xy = w / 2;
    const r1 = xy * 0.8;
    ctx.beginPath();
    ctx.fillStyle = isDark ? '#555' : '#ccc';
    ctx.ellipse(xy, xy, r1, r1, 0, 0, 2 * Math.PI);
    ctx.fill()

    const r2 = xy * 0.2;
    ctx.beginPath();
    ctx.fillStyle = isDark ? `rgb(50, 50, 50)` : '#eee';
    ctx.ellipse(xy, xy, r2, r2, 0, 0, 2 * Math.PI);
    ctx.fill()

    ctx.fillStyle = isDark ? `rgb(50, 50, 50)` : '#eee';
    const w2 = w * 0.05
    ctx.fillRect(xy + r2 - w2, 0, w2, xy);
    const blob = await canvas.convertToBlob()
    if (!blob) return '';
    canvas = null;
    const url = URL.createObjectURL(blob);
    return url ? url : '';
}
/**
 * 
 * @param encode some filename extension
 * @returns represents a handle to a file system entry
 */
async function openDirectory(encode: string[]) {
    const songFiles: FileSystemFileHandle[] = [];
    try {
        const directory = await window.showDirectoryPicker();
        const list = [];
        const files = await directory.entries();
        for await (const item of files) {
            list.push(item);
        }
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            const bool = encode.some(v => new RegExp(v, 'ig').test(item[1].name)) && item[1].kind === 'file';
            if (bool) {
                songFiles.push(item[1]);
            }
        }
        return songFiles

    } catch (error) {
        console.log(error);
        return songFiles
    }
}
// function randomColor(n: number) {
//     function randomNumber() {
//         return parseInt('' + Math.random() * 255)
//     }
//     function mergeRgba() {
//         return `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`
//     }
//     return Array(n).fill('').map(_ => mergeRgba());
// }
// function getSuffix(name: string) {
//     return musicStore.getFileSuffix(name).toUpperCase();
// }

/**
 * 
 * @param name filename 、 path 、address. example: xxxyyy.mp3
 * @returns no file suffix, just name. get example:  xxxyyy
 */
function deleteFileSuffix(name: string) {
    const nameArr = name.split('.');
    const len = nameArr.length - 1;
    return name.replace('.' + nameArr[len], '');
}
/**
 * 
 * @param name filename 、 path 、address. example: xxxyyy.mp3
 * @returns no filename, get file suffix. example: mp3 
 */
function getFileSuffix(name: string) {
    const nameArr = name.split('.');
    const lastIndex = nameArr.length - 1;
    return nameArr[lastIndex];
}

export {
    parseLrc, getMusicCover, openDirectory, deleteFileSuffix, getFileSuffix
}