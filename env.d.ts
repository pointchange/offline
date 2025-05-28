/// <reference types="vite/client" />
interface Window {
    showDirectoryPicker: () => Promise<FileSystemDirectoryHandle>
}

interface FileSystemDirectoryHandle {
    entries: () => Promise<{
        kind: string
        name: string
        [Symbol.iterator]()
    }>
}