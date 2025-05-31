/// <reference types="vite/client" />
interface Window {
    showDirectoryPicker: () => Promise<FileSystemDirectoryHandle>
}

interface FileSystemDirectoryHandle {
    entries: () => Promise<
        Symbol.asyncIterator
    >
}

enum BtnList {
    Play = 'play',
    Next = 'next',
    Previous = 'Previous',
    Voice = 'Voice'
}