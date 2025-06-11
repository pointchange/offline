/// <reference types="vite/client" />
interface Window {
    showDirectoryPicker: () => Promise<FileSystemDirectoryHandle>
}

interface FileSystemDirectoryHandle {
    entries: () => Promise<
        Symbol.asyncIterator
    >
}

interface ThemeZhCN {
    'null': '白天'
    'dark': '黑夜'
    'followSystem': '跟随系统'
}

enum BtnList {
    Play = 'play',
    Next = 'next',
    Previous = 'Previous',
    Voice = 'Voice',
    Order = "Order"
}

type F = FileSystemFileHandle | File
