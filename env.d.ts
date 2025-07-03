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

interface AudioFile {
    string: F
}
interface LRC {
    text: string, time: number
}
interface ActiveLrc {
    index: number,
    texts: string[]
}
enum MessageType {
    'success' = 'success',
    'warn' = 'warn',
    'error' = 'error',
    'info' = 'info',
}
// type Type = 'success' | 'warn' | 'error' | 'info'
type Type = keyof typeof MessageType
interface Msg {
    text?: string,
    type?: Type,
    delay?: number,
    duration?: number,
    close?: boolean,
    stop?: boolean
}