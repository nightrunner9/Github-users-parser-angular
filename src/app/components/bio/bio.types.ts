export interface IInfo {
  img: string,
  url: string,
}

export interface IRepo {
  name: string,
  url: string,
}

export interface IModel {
  data: {
    avatar: IInfo,
    followers: string[],
    followings: string[],
    repositories: IRepo[],
  }
}