import { TYPES } from "../music/const";

async function getFiles(directory: FileSystemDirectoryHandle
) {
    const list = [];
    const files = await directory.entries();
    for await (const item of files) {
        list.push(item);
    }
    return list;
}

async function openDirectory() {
    try {
        const directory = await window.showDirectoryPicker();
        const files = await getFiles(directory);
        const songFiles = [];
        for (let i = 0; i < files.length; i++) {
            const item = files[i];
            const bool = TYPES.some(v => new RegExp(v, 'ig').test(item[1].name)) && item[1].kind === 'file';
            if (bool) {
                songFiles.push(item[1]);
            }
        }
        if (songFiles.length > 0) {
            return songFiles
        } else {
            return []
        }
    } catch (error) { return [] }
}

export {
    openDirectory, getFiles,
}