async function openDirectory() {
    try {
        const directory = await window.showDirectoryPicker();
        return await directory.entries();
    } catch (error) {
        return null
    }
}
async function getFiles(directory: FileSystemDirectoryHandle
) {
    const list = [];
    const files = await directory.entries();
    for await (const item of files) {
        list.push(item);
    }
    return list;
    // const fileArr = [];
    // const directoryArr = []
    // const files = await directory.entries();
    // if (!files) return;
    // for await (const item of files) {
    //     if (item[1].kind === 'file') {
    //         const file = await item[1].getFile()
    //         fileArr.push(file);
    //     } else {
    //         directoryArr.push(item[1])
    //     }
    // }
    // return {
    //     files: fileArr,
    //     directory: directoryArr
    // };
}

export {
    openDirectory, getFiles
}