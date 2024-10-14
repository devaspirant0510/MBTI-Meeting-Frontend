export enum ImageType{
    DM,PROFILE,ARTICLE
}
export interface ImageFile{
    id:number,
    profileUrl:string,
    imageType:ImageType,
    createdAt:string
}