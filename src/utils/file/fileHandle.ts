import pinia from "@/stores";
import { useMusicStore } from "@/stores/music";

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
    const musicStore = useMusicStore(pinia);
    const songFiles: FileSystemFileHandle[] = [];
    try {
        const directory = await window.showDirectoryPicker();
        const files = await getFiles(directory);
        for (let i = 0; i < files.length; i++) {
            const item = files[i];
            const bool = musicStore.encode.some(v => new RegExp(v, 'ig').test(item[1].name)) && item[1].kind === 'file';
            if (bool) {
                songFiles.push(item[1]);
            }
        }
        return songFiles

    } catch (error) { return songFiles }
}

export {
    openDirectory, getFiles,
}