export interface IFileInfo {
    filePath?:string, 
    mimeType?:string, 
    filename?: string,
    file?: any,
};

export interface IVideo {
    id: string,
    title: string,
    description: string
    thumbnailUrl: string
    videoUrl: string
}

export interface IApiResult {
    success: boolean,
    message: string,
    value: any
}