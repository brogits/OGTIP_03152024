export interface IVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
}

export interface IApiResult {
  success: boolean,
  message: string,
  value: any
}

