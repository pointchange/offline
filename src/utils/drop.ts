/**
 * 
 * @param ev DragEvent
 * @returns  File [ ]
 */
function dropAudio(ev: DragEvent) {
    if (!ev.dataTransfer) return;
    const files = ev.dataTransfer.items;
    const reg = new RegExp('audio', 'ig');
    const filesArr: File[] = [];
    for (let i = 0; i < files.length; i++) {
        if (files[i].kind === "file" && reg.test(files[i].type)) {
            const file = files[i].getAsFile();
            if (!file) return;
            filesArr.push(file)
        }
    }
    return filesArr;
}

export { dropAudio }